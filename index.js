const jsonServer = require("json-server"); // importing json-server library
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/auth/register', (req, res) => {
  const db = router.db;
  const users = db.get('users').value();
  const userExists = users.find(user => user.email === req.body.email);
  if (userExists) {
    res.status(400).send({ error: 'Email already exists' });
  } else {
    db.get('users').push(req.body).write();
    res.status(201).send({ message: 'User created successfully' });
  }
});

server.post('/auth/login', (req, res) => {
  const db = router.db;
  const users = db.get('users').value();
  const userExists = users.find(user => user.email === req.body.email && user.password === req.body.password);
  if (userExists) {
    res.status(200).send({ message: 'Login successfully' });
  } else {
    res.status(400).send({ error: 'Login failed' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});