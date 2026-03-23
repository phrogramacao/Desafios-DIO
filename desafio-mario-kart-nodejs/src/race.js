/**
 * race.js
 * Motor principal da corrida: lógica de rodadas, blocos de pista,
 * sistema de itens e declaração do vencedor.
 *
 * Regras:
 *   RETA      → dado + VELOCIDADE; quem somar mais, marca 1 ponto
 *   CURVA     → dado + MANOBRABILIDADE; quem somar mais, marca 1 ponto
 *   CONFRONTO → dado + PODER; quem perder, perde 1 ponto (mín. 0)
 *
 * Itens (novidade):
 *   Boost   → aplicado automaticamente quando o bloco corresponde
 *   Defense → Estrela absorve a próxima perda de ponto em CONFRONTO
 *   Attack  → lançado imediatamente ao adversário como debuff
 */

const { c, bold, sleep } = require("./ui");
const { getRandomItem } = require("./items");

// ─── Helpers ────────────────────────────────────────────────────────────────

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function randomBlock() {
  const r = Math.random();
  if (r < 0.33) return "RETA";
  if (r < 0.66) return "CURVA";
  return "CONFRONTO";
}

const BLOCK_EMOJI = { RETA: "🛣️ ", CURVA: "🔄", CONFRONTO: "🥊" };

// ─── Item logic ─────────────────────────────────────────────────────────────

/**
 * Checks if the racer's held boost item applies to this block,
 * returns the dice bonus and consumes the item.
 */
function consumeBoostItem(racer, blockType) {
  if (!racer.item) return 0;
  const { item } = racer;

  if (item.id === "COGUMELO" && blockType === "RETA") {
    console.log(
      `    ${racer.emoji} ${bold(racer.nome)} usou ${item.emoji} ${c(item.nome, "cyan")}! ${c("+2 na velocidade!", "green")}`
    );
    racer.item = null;
    return 2;
  }

  if (item.id === "CARAPACA_VERMELHA" && blockType === "CONFRONTO") {
    console.log(
      `    ${racer.emoji} ${bold(racer.nome)} usou ${item.emoji} ${c(item.nome, "cyan")}! ${c("+3 no poder!", "green")}`
    );
    racer.item = null;
    return 3;
  }

  return 0;
}

/**
 * Checks if the racer has a pending debuff that applies this round.
 * Returns a negative modifier and removes the debuff when triggered.
 */
function consumeDebuff(racer, blockType) {
  if (!racer.debuff) return 0;
  const { debuff } = racer;

  // Green shell hits on any block
  if (debuff.id === "CARAPACA_VERDE") {
    console.log(
      `    ${racer.emoji} ${bold(racer.nome)} foi atingido por ${debuff.emoji} ${c(debuff.nome, "red")}! ${c("-1 no dado!", "red")}`
    );
    racer.debuff = null;
    return -1;
  }

  // Banana only triggers on CURVA
  if (debuff.id === "BANANA") {
    if (blockType === "CURVA") {
      console.log(
        `    ${racer.emoji} ${bold(racer.nome)} escorregou na ${debuff.emoji} ${c(debuff.nome, "red")}! ${c("-1 na manobrabilidade!", "red")}`
      );
      racer.debuff = null;
      return -1;
    }
    // Banana stays until a CURVA block is drawn
    return 0;
  }

  return 0;
}

/**
 * After each round, each racer has a 30% chance to receive a random item.
 * Attack and trap items are immediately launched at the opponent.
 */
function distributeItems(racer, opponent) {
  if (!racer.item && Math.random() < 0.3) {
    const item = getRandomItem();

    if (item.tipo === "attack") {
      // Throw immediately at opponent
      opponent.debuff = item;
      console.log(
        `    🎁 ${racer.emoji} ${bold(racer.nome)} obteve e lançou ${item.emoji} ${c(item.nome, "magenta")} em ${bold(opponent.nome)}!`
      );
    } else {
      // Keep boost or defense item for use during the race
      racer.item = item;
      console.log(
        `    🎁 ${racer.emoji} ${bold(racer.nome)} obteve um item: ${item.emoji} ${c(item.nome, "cyan")}  — ${c(item.descricao, "dim")}`
      );
    }
  }
}

// ─── Round logic ─────────────────────────────────────────────────────────────

async function playRound(round, player, cpu) {
  console.log(c(`\n🏁 ══════════ Rodada ${round} ══════════`, "yellow"));

  const block = randomBlock();
  console.log(
    `  Bloco sorteado: ${BLOCK_EMOJI[block]} ${c(block, "magenta")}`
  );
  await sleep(250);

  const dicePlayer = rollDice();
  const diceCpu = rollDice();

  const playerBonus = consumeBoostItem(player, block);
  const playerDebuff = consumeDebuff(player, block);
  const cpuBonus = consumeBoostItem(cpu, block);
  const cpuDebuff = consumeDebuff(cpu, block);

  // ── Straight / Curve ────────────────────────────────────────────────────
  if (block === "RETA" || block === "CURVA") {
    const isSpeed = block === "RETA";
    const attrName = isSpeed ? "vel." : "man.";
    const playerAttr = isSpeed ? player.velocidade : player.manobrabilidade;
    const cpuAttr = isSpeed ? cpu.velocidade : cpu.manobrabilidade;

    const totalPlayer = Math.max(0, dicePlayer + playerAttr + playerBonus + playerDebuff);
    const totalCpu = Math.max(0, diceCpu + cpuAttr + cpuBonus + cpuDebuff);

    console.log(
      `  ${player.emoji} ${bold(player.nome.padEnd(12))} 🎲 ${dicePlayer} + ${playerAttr} (${attrName})` +
        (playerBonus !== 0 ? ` ${playerBonus > 0 ? "+" : ""}${playerBonus} (item)` : "") +
        (playerDebuff !== 0 ? ` ${playerDebuff} (debuff)` : "") +
        ` = ${c(totalPlayer, "cyan")}`
    );
    console.log(
      `  ${cpu.emoji} ${bold(cpu.nome.padEnd(12))} 🎲 ${diceCpu} + ${cpuAttr} (${attrName})` +
        (cpuBonus !== 0 ? ` ${cpuBonus > 0 ? "+" : ""}${cpuBonus} (item)` : "") +
        (cpuDebuff !== 0 ? ` ${cpuDebuff} (debuff)` : "") +
        ` = ${c(totalCpu, "cyan")}`
    );

    if (totalPlayer > totalCpu) {
      console.log(c(`  ✅ ${player.nome} venceu a rodada! +1 ponto 🎉`, "green"));
      player.pontos++;
    } else if (totalCpu > totalPlayer) {
      console.log(c(`  ✅ ${cpu.nome} venceu a rodada! +1 ponto`, "red"));
      cpu.pontos++;
    } else {
      console.log(c("  ⚖️  Empate! Nenhum ponto foi marcado.", "dim"));
    }
  }

  // ── Confrontation ────────────────────────────────────────────────────────
  if (block === "CONFRONTO") {
    const totalPlayer = Math.max(0, dicePlayer + player.poder + playerBonus + playerDebuff);
    const totalCpu = Math.max(0, diceCpu + cpu.poder + cpuBonus + cpuDebuff);

    console.log(c(`  💥 ${player.nome} vs ${cpu.nome}! CONFRONTO DIRETO!`, "magenta"));
    console.log(
      `  ${player.emoji} ${bold(player.nome.padEnd(12))} 🎲 ${dicePlayer} + ${player.poder} (pod.)` +
        (playerBonus !== 0 ? ` +${playerBonus} (item)` : "") +
        (playerDebuff !== 0 ? ` ${playerDebuff} (debuff)` : "") +
        ` = ${c(totalPlayer, "cyan")}`
    );
    console.log(
      `  ${cpu.emoji} ${bold(cpu.nome.padEnd(12))} 🎲 ${diceCpu} + ${cpu.poder} (pod.)` +
        (cpuBonus !== 0 ? ` +${cpuBonus} (item)` : "") +
        (cpuDebuff !== 0 ? ` ${cpuDebuff} (debuff)` : "") +
        ` = ${c(totalCpu, "cyan")}`
    );

    if (totalPlayer > totalCpu) {
      if (cpu.item?.id === "ESTRELA") {
        console.log(c(`  ⭐ ${cpu.nome} usou a Estrela! Imune à perda de ponto!`, "yellow"));
        cpu.item = null;
      } else if (cpu.pontos > 0) {
        console.log(c(`  💥 ${player.nome} venceu o confronto! ${cpu.nome} perdeu 1 ponto 🐢`, "green"));
        cpu.pontos--;
      } else {
        console.log(c(`  💥 ${player.nome} venceu o confronto! ${cpu.nome} já está em 0 pontos.`, "green"));
      }
    } else if (totalCpu > totalPlayer) {
      if (player.item?.id === "ESTRELA") {
        console.log(c(`  ⭐ ${player.nome} usou a Estrela! Imune à perda de ponto!`, "yellow"));
        player.item = null;
      } else if (player.pontos > 0) {
        console.log(c(`  💥 ${cpu.nome} venceu o confronto! ${player.nome} perdeu 1 ponto 🐢`, "red"));
        player.pontos--;
      } else {
        console.log(c(`  💥 ${cpu.nome} venceu o confronto! ${player.nome} já está em 0 pontos.`, "red"));
      }
    } else {
      console.log(c("  ⚖️  Confronto empatado! Nenhum ponto perdido.", "dim"));
    }
  }

  // ── Item distribution ────────────────────────────────────────────────────
  await sleep(200);
  distributeItems(player, cpu);
  distributeItems(cpu, player);

  // ── Scoreboard ───────────────────────────────────────────────────────────
  console.log(
    c(
      `\n  Placar → ${player.emoji} ${player.nome}: ${player.pontos}  |  ${cpu.emoji} ${cpu.nome}: ${cpu.pontos}`,
      "bold"
    )
  );
}

// ─── Public API ──────────────────────────────────────────────────────────────

async function playRaceEngine(player, cpu, rounds = 5) {
  for (let round = 1; round <= rounds; round++) {
    await playRound(round, player, cpu);
    await sleep(350);
  }
}

async function declareWinner(player, cpu) {
  console.log(
    c(
      "\n🏆 ══════════════════ RESULTADO FINAL ══════════════════ 🏆",
      "yellow"
    )
  );
  console.log(`\n  ${player.emoji} ${bold(player.nome.padEnd(14))} → ${c(player.pontos + " ponto(s)", "cyan")}`);
  console.log(`  ${cpu.emoji} ${bold(cpu.nome.padEnd(14))} → ${c(cpu.pontos + " ponto(s)", "cyan")}`);
  console.log("");

  if (player.pontos > cpu.pontos) {
    console.log(c(`  🏆  ${player.nome} VENCEU A CORRIDA! PARABÉNS! 🎉🎊`, "green"));
  } else if (cpu.pontos > player.pontos) {
    console.log(c(`  🏆  ${cpu.nome} (CPU) VENCEU A CORRIDA! Melhor sorte na próxima! 😅`, "red"));
  } else {
    console.log(c("  🤝  EMPATE! Foi uma corrida incrível! Que disputa acirrada! 🏁", "yellow"));
  }

  console.log(
    c(
      "\n══════════════════════════════════════════════════════════\n",
      "dim"
    )
  );
}

module.exports = { playRaceEngine, declareWinner };
