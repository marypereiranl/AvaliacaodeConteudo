var express = require('express');
var router = express.Router();

router.post('/realizarlogin', async (req, res, next) => {
  try {
    const result = await global.db.findByLoginPassword(req.body);
    console.log(result);
    if (result) res.send('Login realizado com sucesso.');
    else res.status(404).send('Login ou senha inválidos.');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
