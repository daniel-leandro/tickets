# Exercício Prático Blueticket
### Daniel Anselmo Leandro
Implementação de um sistema WEB para a gestão de eventos e inscrições, servindo como exercício prático para a vaga de Desenvolvedor Fullstack na Blueticket,  eleita pela Great Place to Work Brasil como uma das 25 melhores empresas para se trabalhar em Santa Catarina.

### Tecnologias e Técnicas Utilizadas
Decidi por utilizar a MEAN Stack (http://meanjs.org), um conjunto de componentes e tecnologias para desenvolvimento de aplicações na plataforma Javascript:
- **M**ongoDB (Banco de Dados NoSQL)
- **E**xpress (Framework de desenvolvimento web para Node.js)
- **A**ngularJS (Framework JS que roda no client side)
- **N**ode.js (Servidor Web e engine JS que roda no servidor)

Além das tecnologias relacionadas acima, o projeto utiliza Grunt, TDD, Git, jQuery, CSS 3 e HTML 5.
### Instalação
```sh
$ git clone git://github.com/daniel-leandro/tickets.git tickets
$ cd tickets
$ npm install
$ bower install --allow-root
$ mongod --dbpath data/db (executar em terminal paralelo)
$ grunt
```

### Acessando ao sistema
Após executar o comando **grunt**, a aplicação estará rodando na porta 3000. Basta acessar em seu browser a URL [http://localhost:3000](http://localhost:3000)

### Módulos
- Eventos (Responsável pelo CRUD de eventos e a listagem dos próximos eventos)
- Tickets (Registro de inscrições nos eventos)

### Testes Unitários

Os arquivos contendo os testes unitários de rotas, controller e model estão presentes no diretório 'tests' dentro de cada módulo

- \modules\eventos\tests
- \modules\tickets\tests

```sh
$ grunt test
```  
 