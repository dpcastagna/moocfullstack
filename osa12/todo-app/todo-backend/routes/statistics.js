const express = require('express');
// const { Todo } = require('../mongo');
// const { update } = require('../mongo/models/Todo');
const router = express.Router();
const { getAsync } = require('../redis')

router.get('/', async (_, res) => {
  const addedTodos = await getAsync('added_todos')
  if (addedTodos) {
    res.send({added_todos: Number(addedTodos)})
  } else {
    res.send({added_todos: Number(0)})
  }
  // res.send("ok");
});

module.exports = router;