# 🧩 Challenge Magalu (NestJS)

Este projeto implementa um **processador de arquivos** em **NestJS**.

O sistema recebe um arquivo via **API REST**, faz o **parse linha a linha** conforme um formato fixo, e retorna os dados estruturados (pedidos e itens) em formato **JSON**.

## 🧱 Arquitetura e Padrões

O projeto segue **DDD (Domain-Driven Design)** e está dividido em **três camadas principais**:

- **Domain** → Entidades, Serviços de Domínio e Repositórios (contratos)
- **Application** → Casos de uso e DTOs
- **Infrastructure** → Controladores HTTP, Repositórios concretos, Configuração NestJS

Cada módulo é independente e isolado, seguindo o conceito de **bounded context**.

## 📁 Estrutura de Pastas
```
src/
 ├── modules/
 │    └── orders/
 │         ├── application/
 │         │     ├── use-cases/
 │         │     │     └── process-file.usecase.ts
 │         │     └── dto/
 │         │           └── processed-order.dto.ts
 │         │
 │         ├── domain/
 │         │     ├── entities/
 │         │     │     ├── order.entity.ts
 │         │     │     └── order-item.entity.ts
 │         │     ├── services/
 │         │     │     └── order-file-parser.service.ts
 │         │     └── repositories/
 │         │           └── order.repository.ts
 │         │
 │         ├── infrastructure/
 │         │     ├── repositories/
 │         │     │     └── in-memory-order.repository.ts
 │         │     └── controllers/
 │         │           └── orders.controller.ts
 │         │
 │         └── orders.module.ts
 │
 ├── shared/
 │     ├── errors/
 │     │     └── domain-error.ts
 │     └── utils/
 │           └── date.utils.ts
 │
 └── main.ts
 ```

## 🚀 Executando o projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/challenge-magalu.git
cd challenge-magalu
```

### 2️⃣ Instalar dependências
```bash
npm install
```

### 3️⃣ Rodar o servidor
```bash
npm run start:dev
```
### 4️⃣ Rota Swagger
`http://localhost:3000/api-docs`

### 📦 Endpoint Upload de Arquico
`POST /orders/process-file`

Descrição:

Recebe um arquivo .txt no formato legado e retorna os pedidos processados em JSON.

Formato do request:

- **Método:** POST

- **Tipo:** multipart/form-data

- **Campo do arquivo:** file

**Exemplo via** ```curl```:

```bash
curl -X POST http://localhost:3000/orders/process-file \
  -F "file=@./samples/orders.txt"
```


## 🧩 Componentes principais
| Camada             | Responsável                   | Arquivo                                                 |
| ------------------ | ----------------------------- | ------------------------------------------------------- |
| **Domain**         | Parser do arquivo fixo        | `order-file-parser.service.ts`                          |
| **Application**    | Caso de uso de processamento  | `process-file.usecase.ts`                               |
| **Infrastructure** | Controller REST + repositório | `orders.controller.ts`, `in-memory-order.repository.ts` |


## 🧰 Tecnologias
- NestJS
- TypeScript
- Multer – upload de arquivos
- Node.js

## 🧭 Conceitos de DDD aplicados
- **Entidades (Entities):** ```Order```, ```OrderItem```
- **Serviços de Domínio (Domain Service):** ```OrderFileParserService```
- **Repositórios (Repositories):** abstração + implementação em memória
- **Casos de Uso (Application Layer):** ```ProcessFileUseCase```
- **Interface (Infra Layer):** OrdersController (API REST)

### 🧑‍💻 Autor
**Mateus Pilo Dias**

💼 Projeto de referência DDD com NestJS

📧 Contato: pilo.mateus@gmail.com