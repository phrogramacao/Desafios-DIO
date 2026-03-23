/**
 * index.js
 * Ponto de entrada do simulador Mario Kart.
 * Responsável pela interação com o jogador e orquestração da corrida.
 */

const readline = require("readline");

const { characters } = require("./characters");
const { playRaceEngine, declareWinner } = require("./race");
const { c, printHeader, printCharacterTable, sleep } = require("./ui");

// ─── Input helper ─────────────────────────────────────────────────────────────

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pickRandomCpu(excludeId) {
  const pool = characters.filter((ch) => ch.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}

function cloneRacer(character) {
  return { ...character, pontos: 0, item: null, debuff: null };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async function main() {
  printHeader();
  printCharacterTable(characters);

  // ── Character selection ─────────────────────────────────────────────────
  let playerChar = null;
  while (!playerChar) {
    const input = await prompt(c("\n🎮 Escolha seu personagem [1-6]: ", "cyan"));
    const id = parseInt(input, 10);
    playerChar = characters.find((ch) => ch.id === id) ?? null;
    if (!playerChar) {
      console.log(c("  ❌ Opção inválida. Digite um número entre 1 e 6.", "red"));
    }
  }

  // ── Round count ─────────────────────────────────────────────────────────
  const roundInput = await prompt(
    c("🔢 Quantas rodadas? (pressione Enter para o padrão: 5): ", "cyan")
  );
  const rounds = parseInt(roundInput, 10);
  const totalRounds = rounds >= 1 && rounds <= 20 ? rounds : 5;

  rl.close();

  // ── Setup ───────────────────────────────────────────────────────────────
  const cpuChar = pickRandomCpu(playerChar.id);
  const player = cloneRacer(playerChar);
  const cpu = cloneRacer(cpuChar);

  console.log(
    `\n  Você escolheu : ${player.emoji} ${c(player.nome, "green")}` +
      `  (⚡${player.velocidade} 🎯${player.manobrabilidade} 💪${player.poder})`
  );
  console.log(
    `  CPU escolheu  : ${cpu.emoji} ${c(cpu.nome, "red")}` +
      `  (⚡${cpu.velocidade} 🎯${cpu.manobrabilidade} 💪${cpu.poder})`
  );

  await sleep(400);

  console.log(
    c(
      `\n🏎️  Corrida de ${totalRounds} rodadas entre ${player.nome} e ${cpu.nome} começando...\n`,
      "yellow"
    )
  );

  await sleep(800);

  // ── Race ────────────────────────────────────────────────────────────────
  await playRaceEngine(player, cpu, totalRounds);
  await declareWinner(player, cpu);
})();
