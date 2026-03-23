# 🏎️ Mario Kart Simulator — Node.js Edition

Simulador de corridas inspirado em **Mario Kart**, executado inteiramente no terminal com **Node.js**. O projeto foi desenvolvido como desafio prático da [DIO](https://www.dio.me/), com base no repositório original do expert **Felipe Aguiar**, e evoluído com novas mecânicas de jogo.

> **Repositório de referência:** [digitalinnovationone/formacao-nodejs – 03-projeto-mario-kart](https://github.com/digitalinnovationone/formacao-nodejs/tree/main/03-projeto-mario-kart)

---

## 🎮 Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| Seleção de personagem | Jogador escolhe entre 6 personagens com atributos únicos |
| Adversário CPU | CPU seleciona aleatoriamente um personagem diferente do jogador |
| Rodadas configuráveis | Defina de 1 a 20 rodadas antes de iniciar |
| 3 tipos de bloco de pista | RETA, CURVA e CONFRONTO com regras específicas |
| Sistema de itens | 5 itens com mecânicas de boost, defesa e ataque |
| Saída colorida | Output estilizado com cores ANSI no terminal |

---

## 🧑‍🤝‍🧑 Personagens

| # | Personagem | ⚡ Velocidade | 🎯 Manobrabilidade | 💪 Poder |
|---|---|:---:|:---:|:---:|
| 1 | 🔴 Mario | 4 | 3 | 3 |
| 2 | 🟢 Luigi | 3 | 4 | 4 |
| 3 | 🩷 Peach | 3 | 4 | 2 |
| 4 | 🦕 Yoshi | 2 | 4 | 3 |
| 5 | 👾 Bowser | 5 | 2 | 5 |
| 6 | 🦍 Donkey Kong | 2 | 2 | 5 |

---

## 🏁 Regras e Mecânicas

### Blocos de Pista
A cada rodada, um bloco é sorteado aleatoriamente:

- **🛣️ RETA** — Ambos rolam 1d6 + **Velocidade**. Maior resultado marca **+1 ponto**.
- **🔄 CURVA** — Ambos rolam 1d6 + **Manobrabilidade**. Maior resultado marca **+1 ponto**.
- **🥊 CONFRONTO** — Ambos rolam 1d6 + **Poder**. Quem **perder** perde **1 ponto** (mínimo 0).

### Condição de Vitória
Ao final das rodadas, vence quem tiver acumulado mais pontos.

---

## 🎁 Sistema de Itens (novidade!)

A cada rodada, cada corredor tem 30% de chance de receber um item aleatório.

| Item | Tipo | Efeito |
|---|---|---|
| 🍄 Cogumelo | Boost | +2 no próximo dado de **RETA** |
| 🔴 Carapaça Vermelha | Boost | +3 no próximo dado de **CONFRONTO** |
| ⭐ Estrela | Defesa | Imunidade à próxima **perda de ponto** em CONFRONTO |
| 🐢 Carapaça Verde | Ataque | Lançada no adversário: **-1 no próximo dado** |
| 🍌 Banana | Ataque | Armadilha no adversário: **-1 no próximo dado de CURVA** |

- Itens de **boost/defesa** ficam guardados e são usados automaticamente quando a condição é atendida.
- Itens de **ataque** são lançados imediatamente no adversário como debuff.

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior

### Instalação e execução

```bash
# Clone o repositório
git clone <url-do-seu-repositorio>

# Acesse a pasta do projeto
cd desafio-mario-kart-nodejs

# Inicie o simulador
npm start
# ou
node src/index.js
```

### Fluxo do jogo

```
1. Abre a tela de seleção de personagens
2. Digite o número do personagem desejado [1-6]
3. Informe o número de rodadas (padrão: 5)
4. A corrida começa! Acompanhe o placar rodada a rodada
5. O resultado final é exibido com o vencedor
```

---

## 📁 Estrutura do Projeto

```
desafio-mario-kart-nodejs/
├── src/
│   ├── index.js        # Ponto de entrada — menu e orquestração
│   ├── characters.js   # Dados dos personagens
│   ├── items.js        # Definição e sorteio dos itens
│   ├── race.js         # Motor da corrida (rodadas, blocos, pontuação)
│   └── ui.js           # Utilitários de terminal (cores ANSI, tabela)
├── package.json
└── README.md
```

---

## 🛠️ Tecnologias

- **Node.js** — Runtime JavaScript no backend
- **readline** (built-in) — Leitura de input do terminal
- **ANSI Escape Codes** — Formatação colorida sem dependências externas

> O projeto usa **zero dependências externas** — apenas módulos nativos do Node.js.

---

## 📌 Melhorias em relação ao projeto original

| Original | Esta versão |
|---|---|
| Mario vs Luigi (fixo) | Seleção de personagem pelo jogador |
| 5 rodadas fixas | Rodadas configuráveis (1–20) |
| Sem itens | Sistema de 5 itens com boost, defesa e ataque |
| Output simples | Output colorido com tabela de stats |
| Sem placar intermediário | Placar mostrado ao final de cada rodada |

---

## 🔗 Links Úteis

- [Repositório de referência — DIO](https://github.com/digitalinnovationone/formacao-nodejs/tree/main/03-projeto-mario-kart)
- [Formação Node.js — DIO](https://www.dio.me/)
- [Documentação Node.js — readline](https://nodejs.org/api/readline.html)
