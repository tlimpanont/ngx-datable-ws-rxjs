const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const WebSocket = require('ws');
const axios = require('axios');
const faker = require('faker');

const addUser = (ws) => {
  axios({
    method: "POST",
    url: 'http://localhost:4200/users',
    data: {
      id: faker.random.uuid(),
      name: faker.name.firstName() + ' ' + faker.name.lastName(),
      about: faker.lorem.sentence(),
      company: faker.company.companyName(),
      phone: faker.phone.phoneNumber()
    },
    responseType: 'json'
  })
    .then(res => {
      console.log("RESPONSE BODY: ", res.data);
      ws.send(
        JSON.stringify(
          Object.assign({type: 'USER_ADDED'}, res.data),
          null,
          4
        )
      );
    })
};

const wss = new WebSocket.Server({port: 8080});
wss.on('connection', (ws) => {
  console.log("WS CONNECTED!");
  setInterval(() => {
    console.log("ADD USER");
    addUser(ws)
  }, 2000)
});

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)


// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(8000, () => {
  console.log('JSON Server is running')
})
