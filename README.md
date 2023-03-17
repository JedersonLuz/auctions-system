<h1 align="center">
Sistema de Leilões Eletrônicos (Auctions-System)
</h1>

<h2 align="center">
  Sistema de Leilões Eletrônicos para desafio técnico da Youtan
</h2>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/JedersonLuz/auctions-system">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/JedersonLuz/auctions-system">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/JedersonLuz/auctions-system">
  <img alt="License" src="https://img.shields.io/github/license/JedersonLuz/auctions-system">
</p>

<p align="center">
  <a href="#projeto">Projeto</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#aplicações-no-ar">Aplicações no Ar</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#tecnologias">Tecnologias</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#como-executar">Como executar</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#como-contribuir">Como contribuir</a>
  &nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#licença">Licença</a>
</p>

# Projeto

Este projeto foi desenvolvido como um teste técnico para uma vaga de Fullstack Developer na Youtan.

Este projeto consitiu no desenvolvimento de um backend escrito com django rest framework, 
um frontend desenvolvido em react em conjunto com um banco de dados postgres.

A aplicação foi colocada no ar utilizando railway para o backend e banco e o netlify para o front.

Além disso foi utilizado docker no desenvolvimento local bem como o uso de docker-compose para subir os serviços.

# Aplicações no Ar

Para testar a aplicação é possível realizar login como administrador do sistema pela URL https://auctions-system.up.railway.app/admin/

Nela entre com as credenciais `adm` e `12345`. Lá você pode criar novos usuários, leilões e cadastrar itens nos leilões.

Para acessar a visão do usuário a URL é https://main--leaoleiloes.netlify.app/

As credenciais são `cliente` e `SJfps8PavjumneU`.

# Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Django Rest Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

# Como executar

### Requisitos

- [Django Rest Framework](https://www.django-rest-framework.org/)
- [React](https://reactjs.org)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

Você pode executar tudo apenas executando `docker-compose up` ou se preferir executar cada aplicação diretamente em sua máquina.
Para isso basta comentar a parte que cria as aplicações no docker-compose e executar apenas com o banco via docker.

## Backend

- Estando na pasta raíz do projeto, navegue para o diretório do servidor com `cd backend`.
- De preferência crie um ambiente virtual com `python3 -m venv env`
- E ative o mesmo com `source env/bin/activate`
- Instale as dependências usando `pip install -r requirements.txt`.
- Realize as migrações do banco de dados com o comando `python manage.py migrate`
- Execute o servidor usando `python manage.py runserver`.

## Frontend

- Estando na pasta raíz do projeto, navegue para o diretório do frontend com `cd frontend/app`.
- Instale as dependências usando `npm install`.
- Execute o dev server usando `npm start`.

# Como contribuir

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

# Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
