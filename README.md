# 🎯 In.Orbit Back-End

API para gerenciamento de metas e objetivos pessoais, construída com Node.js, Fastify e Drizzle ORM.

## 🚀 Tecnologias

- [Fastify](https://fastify.dev/) - Framework web rápido e ade baixa sobrecarga
- [Drizzle ORM](https://orm.drizzle.team/) - ORM moderno para TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional
- [TypeScript](https://www.typescriptlang.org/) - Adiciona tipagem estática ao JavaScript

## ⚙️ Funcionalidades

- Criação e gerenciamento de metas
- Registro de conclusões de metas
- Acompanhamento semanal de progresso
- Relatórios de desempenho

## 🛠️ Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/in-orbit-backend.git
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```env
PORT=3333
DATABASE_URL=postgresql://seu-usuario:senha@host/database
```

4. Execute as migrações
```bash
npx drizzle-kit generate
npx drizzle-kit migrate
```

5. Inicie o servidor
```bash
npm run dev
```

## 📦 Estrutura do Projeto

```
src/
  ├── db/               # Configurações do banco de dados
  ├── functions/        # Regras de negócio
  ├── http/            # Rotas e controllers
  └── env.ts           # Variáveis de ambiente
```

## 🔌 Endpoints

### Metas
- `POST /goals` - Criar nova meta
- `DELETE /goals` - Remover meta
- `GET /pending-goals` - Listar metas pendentes
- `GET /summary` - Resumo semanal

### Conclusões
- `POST /completions` - Registrar conclusão
- `DELETE /completion` - Remover conclusão

## 🧪 Testes e Desenvolvimento

Para testar as rotas, recomendamos usar:
- [Insomnia](https://insomnia.rest/)
- [Postman](https://www.postman.com/)

## 👥 Autores

- [@Victor-Lis](https://www.linkedin.com/in/victor-lis-bronzo/) - Desenvolvimento
- [@Diego Fernandes](https://www.linkedin.com/in/diego-schell-fernandes/) - Mentoria

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
