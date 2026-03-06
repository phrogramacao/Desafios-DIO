# Desafio ETL - Santander Dev Week 2023

## Sobre o Projeto

Este projeto foi desenvolvido como parte do desafio da **DIO (Digital Innovation One)** e replica o pipeline ETL apresentado durante o bootcamp **Santander Dev Week 2023**.

O foco principal é aprender o fluxo **ETL (Extração, Transformação e Carregamento)** aplicado a um contexto de dados de clientes bancários, utilizando **Python** e **Ciência de Dados**.

> **Observação:** Como a API pública da Santander Dev Week pode estar indisponível, este projeto utiliza a **Alternativa 2**: um arquivo CSV completo com as colunas Nome, Conta e Cartão, gerando mensagens personalizadas com Python puro.

---

## Estrutura do Projeto

```
DIO/
├── SDW2023.csv          # Dados de entrada (clientes fictícios)
├── SDW2023_output.csv   # Dados de saída gerados pelo pipeline
├── etl_sdw2023.ipynb    # Notebook com o pipeline ETL completo
└── README.md
```

---

## Pipeline ETL

### 1. Extração (Extract)
Leitura do arquivo `SDW2023.csv` contendo dados fictícios de clientes com Nome, Número de Conta e Tipo de Cartão.

### 2. Transformação (Transform)
Geração de mensagens de marketing personalizadas para cada cliente com base no tipo de cartão:

| Cartão     | Mensagem Personalizada                                          |
|------------|-----------------------------------------------------------------|
| PLATINUM   | Investimento exclusivo e cashback premium                      |
| GOLD       | Benefícios ampliados e milhas aéreas                           |
| STANDARD   | Oferta de upgrade e novas vantagens                            |

### 3. Carregamento (Load)
Salvamento do resultado enriquecido em `SDW2023_output.csv`.

---

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/phrogramacao/Desafios-DIO.git
   cd Desafios-DIO
   ```

2. **Instale as dependências:**
   ```bash
   pip install pandas
   ```

3. **Execute o Notebook:**
   Abra `etl_sdw2023.ipynb` no Jupyter Lab/Notebook ou VS Code e execute todas as células.

---

## Tecnologias Utilizadas

- Python 3.x
- Pandas
- Jupyter Notebook

---

## Autor

Desenvolvido com 💙 durante o bootcamp Santander Dev Week 2023 na [DIO](https://www.dio.me/).
