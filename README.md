# TP1 - Engenharia de Software I - 2022/1
## Escopo do sistema
O objetivo principal do sistema desenvolvido para este trabalho prático é permitir o cadastro e a avaliação de álbuns musicais, de forma semelhante a sites como o [Rate Your Music](https://rateyourmusic.com).

Como features essenciais do sistema, podemos destacar:
- CRUD de álbuns e artistas
- Postagem de avaliações e comentários em álbuns
- Visualização de estatísticas de avaliações de diferentes álbuns e artistas

Pensamos em algumas features interessantes caso houvesse tempo extra no fim do desenvolvimento:
- Funcionalidade de login simples, para que mais de uma pessoa possa avaliar um mesmo álbum, com a exibição da média das avaliações recebidas ao fim
## Membros da equipe
| Nome    | Matrícula  | Papel    |
|---------|------------|----------|
| Ana Flávia de Matos Souza | 2020006353 | Frontend dev |
| Isis Ferreira Carvalho | 2020006663 | Frontend dev |
| Rodrigo Ferreira Araújo  | 2020006990 | Backend dev |
| Rafael Fontes Sumitani  | 2020006957 | Fullstack dev |
## Tecnologias
- **Backend**: [Node.js](https://nodejs.org/en/) e [Express](https://expressjs.com)
- **Frontend**: [EJS](https://github.com/mde/ejs) e [Bootstrap](https://getbootstrap.com)
- **Banco de dados**: [SQLite](https://www.sqlite.org/index.html)
## Backlog do sprint
### Tarefas técnicas
  - Discutir e criar esquema do banco de dados [Ana, Isis, Rafael, Rodrigo]
  - Preparar ambiente de desenvolvimento (dependências NPM, instalar tecnologias necessárias, etc.) [Ana, Isis, Rafael, Rodrigo]
  - Planejar identidade visual da interface web [Ana, Isis]
  - Estudar tecnologias a serem usadas [Ana, Isis, Rafael, Rodrigo]
### História 1
- Como usuário típico, quero cadastrar artistas
- **Tarefas**:
  - Planejar design da interface web [Ana]
  - Implementar e testar interface web [Isis]
  - Criar e testar rota de criar artista [Rodrigo]
  - Criar e testar rota de deletar artista [Rodrigo]
  - Criar e testar rota de editar artista [Rodrigo]

### História 2
- Como usuário típico, quero cadastrar álbuns
- **Tarefas**:
  - Planejar design da interface web [Ana]
  - Implementar e testar interface web [Isis]
  - Criar e testar rota de criar álbum [Rafael]
  - Criar e testar rota de deletar álbum [Rafael]
  - Criar e testar rota de editar álbum [Rafael]

### História 3
- Como usuário típico, quero avaliar álbuns
- **Tarefas**:
  - Planejar design da interface web [Isis]
  - Implementar e testar interface web [Ana]
  - Criar e testar rota de avaliar álbum [Rodrigo]

### História 4
- Como usuário típico, quero comentar álbuns
- **Tarefas**:
  - Planejar design da interface web [Isis]
  - Implementar e testar interface web [Ana]
  - Criar e testar rota de comentar álbum [Rafael]

## Backlog do produto
- **História**: Como usuário típico, quero fazer login no sistema
- **História**: Como usuário típico, quero cadastrar e avaliar músicas
- **História**: Como usuário típico, quero visualizar a nota de avaliação de artistas com base na média de avaliação de seus álbuns
- **História**: Como usuário típico, quero destacar minha música favorita em um álbum
