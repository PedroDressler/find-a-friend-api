## Requisitos funcionais

- [x] Deve ser possível cadastrar um pet (POST /pets)
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade (GET /pets)
- [ ] Deve ser possível filtrar pets por suas características (GET /pets/details)
- [ ] Deve ser possível visualizar detalhes de um pet para adoção (GET /pets/:petId/details)
- [x] Deve ser possível se cadastrar como uma ORG (POST /users)
- [x] Deve ser possível realizar login como uma ORG (POST /session)

## Regras de negócio

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## Requisitos não funcionais

- [ ] A autenticação deve ser validada por JWT
- [ ] Os dados da aplicação devem persistir em um banco Postgresql

