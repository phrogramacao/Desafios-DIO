/**
 * characters.js
 * Definição dos personagens jogáveis com seus atributos base.
 * Atributos: velocidade (RETA), manobrabilidade (CURVA), poder (CONFRONTO)
 */

const characters = [
  {
    id: 1,
    nome: "Mario",
    emoji: "🔴",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
  },
  {
    id: 2,
    nome: "Luigi",
    emoji: "🟢",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
  },
  {
    id: 3,
    nome: "Peach",
    emoji: "🩷",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
  },
  {
    id: 4,
    nome: "Yoshi",
    emoji: "🦕",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
  },
  {
    id: 5,
    nome: "Bowser",
    emoji: "👾",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
  },
  {
    id: 6,
    nome: "Donkey Kong",
    emoji: "🦍",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
  },
];

module.exports = { characters };
