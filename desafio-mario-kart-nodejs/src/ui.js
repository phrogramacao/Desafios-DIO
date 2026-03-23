/**
 * ui.js
 * Utilitários para exibição no terminal: cores ANSI, cabeçalho,
 * tabela de personagens e funções auxiliares.
 */

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

function c(text, color) {
  return `${colors[color] ?? ""}${text}${colors.reset}`;
}

function bold(text) {
  return `${colors.bold}${text}${colors.reset}`;
}

function printHeader() {
  console.log(
    c(
      `
╔══════════════════════════════════════════════════════════════╗
║          🏎️   MARIO KART SIMULATOR  —  Node.js Edition  🏎️  ║
║             Simulador de Corridas no Terminal                ║
╚══════════════════════════════════════════════════════════════╝`,
      "yellow"
    )
  );
}

function printCharacterTable(characters) {
  const header =
    c("  ID  ", "dim") +
    "| " +
    c("Personagem     ", "bold") +
    "| " +
    c("⚡ Vel", "cyan") +
    " | " +
    c("🎯 Man", "magenta") +
    " | " +
    c("💪 Pod", "red");

  const separator = "------+------------------+-------+-------+------";

  console.log(c("\n🎮 Personagens disponíveis:\n", "cyan"));
  console.log(header);
  console.log(c(separator, "dim"));

  for (const ch of characters) {
    const id = `  [${ch.id}]  `.padEnd(6);
    const name = `${ch.emoji} ${ch.nome}`.padEnd(16);
    const vel = String(ch.velocidade).padStart(5);
    const man = String(ch.manobrabilidade).padStart(5);
    const pod = String(ch.poder).padStart(4);
    console.log(
      c(id, "yellow") +
        "| " +
        bold(name) +
        " | " +
        c(vel, "cyan") +
        "  | " +
        c(man, "magenta") +
        "  | " +
        c(pod, "red")
    );
  }
  console.log(c(separator, "dim"));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = { c, bold, colors, printHeader, printCharacterTable, sleep };
