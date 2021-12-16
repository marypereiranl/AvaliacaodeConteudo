var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.render('index', { title: 'Lista de logins', docs });
  } catch (err) {
    next(err);
  }
});

router.get('/listar-todos', async (req, res, next) => {
  try {
    const docs = await global.db.findAll();
    res.send(docs);
  } catch (err) {
    next(err);
  }
});

router.post('/novo-login', async (req, res, next) => {
  var login = req.body.login;
  var senha = req.body.senha;

  try {
    if (login && senha) {
      const result = await global.db.insert(req.body);
      console.log(result);
      res.redirect('/');
    } else {
      res.status(400).send("Deve ser informado o usuário e senha.");
    }

  } catch (err) {
    next(err);
  }
});

router.post('/editar/:login', async (req, res) => {
  const login = req.params.login;

  try {
    const result = await global.db.update(login, req.body);
    console.log(result);
    if (result.modifiedCount > 0) res.send(req.body)
    else res.status(404).send(`Não foi encontrado o usuário com o login ${login}.`)
  } catch (err) {
    next(err);
  }
});

router.delete('/deletar/:login', async (req, res) => {
  const login = req.params.login;
  console.log(login)

  try {
    const result = await global.db.deleteOne(login);
    console.log(result);
    if (result.deletedCount > 0) res.send('Login excluído com sucesso.');
    else res.status(404).send("Usuário não encontrado ou já foi excluído.");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
