/**
 * items.js
 * Sistema de itens estilo Mario Kart.
 * Cada item tem um tipo que define como é aplicado durante a corrida:
 *   - "boost"   → bônus no próximo dado do próprio corredor
 *   - "attack"  → penalidade imediata aplicada como debuff no adversário
 *   - "defense" → escudo que absorve a próxima perda de ponto
 */

const items = [
  {
    id: "COGUMELO",
    nome: "Cogumelo",
    emoji: "🍄",
    tipo: "boost",
    descricao: "+2 no próximo dado de RETA (velocidade)",
  },
  {
    id: "CARAPACA_VERMELHA",
    nome: "Carapaça Vermelha",
    emoji: "🔴",
    tipo: "boost",
    descricao: "+3 no próximo dado de CONFRONTO (poder)",
  },
  {
    id: "ESTRELA",
    nome: "Estrela",
    emoji: "⭐",
    tipo: "defense",
    descricao: "Imunidade à próxima perda de ponto em CONFRONTO",
  },
  {
    id: "CARAPACA_VERDE",
    nome: "Carapaça Verde",
    emoji: "🐢",
    tipo: "attack",
    descricao: "Lança no adversário: -1 no próximo dado rolado",
  },
  {
    id: "BANANA",
    nome: "Banana",
    emoji: "🍌",
    tipo: "attack",
    descricao: "Lança no adversário: -1 no próximo dado de CURVA",
  },
];

function getRandomItem() {
  const index = Math.floor(Math.random() * items.length);
  return { ...items[index] };
}

module.exports = { items, getRandomItem };
