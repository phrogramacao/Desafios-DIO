# RELATÓRIO DE IMPLEMENTAÇÃO DE SERVIÇOS AWS

**Data:** 06/03/2026  
**Empresa:** Abstergo Industries  
**Responsável:** Paulo Oliveira  

---

## Introdução

Este relatório apresenta o processo de implementação de ferramentas na empresa **Abstergo Industries**, realizado por **Paulo Oliveira**. O objetivo do projeto foi elencar 3 serviços AWS com a finalidade de realizar diminuição de custos imediatos.

---

## Descrição do Projeto

O projeto de implementação de ferramentas foi dividido em 3 etapas, cada uma com seus objetivos específicos. A seguir, serão descritas as etapas do projeto:

---

### Etapa 1: Amazon EC2 Auto Scaling

- **Nome da ferramenta:** Amazon EC2 com Auto Scaling
- **Foco da ferramenta:** Otimização e elasticidade da infraestrutura computacional
- **Descrição de caso de uso:**  
  A Abstergo Industries mantinha servidores físicos e instâncias EC2 de tamanho fixo rodando 24/7, mesmo em períodos de baixa demanda. Com a implementação do **Auto Scaling**, o ambiente passou a provisionar e encerrar instâncias automaticamente conforme a demanda real de processamento. Isso eliminou o desperdício de capacidade ociosa, reduzindo em até **40%** os custos com computação em nuvem. Além disso, foram migradas instâncias On-Demand para **Instâncias Reservadas** (1 ano), gerando economia adicional de até **72%** em relação ao modelo sob demanda para cargas de trabalho previsíveis.

---

### Etapa 2: Amazon S3 com Intelligent-Tiering

- **Nome da ferramenta:** Amazon S3 — Intelligent-Tiering
- **Foco da ferramenta:** Gestão inteligente e automática de armazenamento de dados
- **Descrição de caso de uso:**  
  A empresa acumulava grandes volumes de dados históricos (logs, backups e arquivos de relatórios) armazenados na classe **S3 Standard**, pagando o preço máximo por objetos raramente acessados. Com a migração para a classe **S3 Intelligent-Tiering**, a AWS passou a mover automaticamente os objetos entre camadas de acesso (frequente, infrequente e glacial) sem impacto operacional. Para dados arquivados com mais de 90 dias, foi configurado o **S3 Glacier Instant Retrieval**, reduzindo o custo de armazenamento em até **68%** para arquivos históricos, sem abrir mão de SLA de recuperação imediata.

---

### Etapa 3: Amazon RDS com Reserved Instances e Multi-AZ Controlado

- **Nome da ferramenta:** Amazon RDS (Relational Database Service)
- **Foco da ferramenta:** Redução de custos em banco de dados gerenciado com alta disponibilidade
- **Descrição de caso de uso:**  
  Os bancos de dados relacionais da Abstergo Industries estavam em instâncias RDS On-Demand com Multi-AZ ativo em todos os ambientes, inclusive em ambientes de desenvolvimento e homologação. A estratégia adotada foi:  
  1. **Ambientes de produção:** Migração de On-Demand para **RDS Reserved Instances** (1 ano, pagamento parcial antecipado), com redução de até **42%** no custo mensal.  
  2. **Ambientes de dev/homologação:** Desativação do Multi-AZ e uso de instâncias menores com agendamento de **start/stop automático** via AWS Lambda fora do horário comercial, reduzindo o tempo de cobrança em até **65%** nesses ambientes.  
  3. Implementação do **Amazon RDS Proxy** para gerenciar o pool de conexões, reduzindo o tamanho necessário das instâncias em produção.

---

## Conclusão

A implementação de ferramentas na empresa **Abstergo Industries** tem como esperado:

- **Redução de custos imediatos** com computação (EC2 Auto Scaling), armazenamento (S3 Intelligent-Tiering) e banco de dados (RDS Reserved Instances);
- **Aumento da eficiência operacional**, eliminando provisionamento manual e gestão de capacidade ociosa;
- **Escalabilidade automática**, garantindo performance em picos de demanda sem pagamento por capacidade ociosa;
- **Maior produtividade das equipes**, que deixam de gerenciar infraestrutura e focam em entregas de valor.

Recomenda-se a continuidade da utilização das ferramentas implementadas e a busca por novas tecnologias que possam melhorar ainda mais os processos da empresa, como a adoção do **AWS Cost Explorer** e do **AWS Budgets** para monitoramento contínuo dos custos.

---

## Anexos

| # | Documento | Descrição |
|---|-----------|-----------|
| 1 | [AWS Pricing Calculator](https://calculator.aws/pricing/2/home) | Estimativa de custos dos serviços implementados |
| 2 | [Amazon EC2 Auto Scaling – Documentação Oficial](https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html) | Guia de configuração do Auto Scaling |
| 3 | [Amazon S3 Intelligent-Tiering – Documentação Oficial](https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html) | Guia de configuração do Intelligent-Tiering |
| 4 | [Amazon RDS Reserved Instances – Documentação Oficial](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithReservedDBInstances.html) | Guia de Reserved Instances para RDS |

---

**Assinatura do Responsável pelo Projeto:**

Paulo Oliveira  
*Engenheiro de Dados / Cloud Specialist*  
Abstergo Industries — 06/03/2026
