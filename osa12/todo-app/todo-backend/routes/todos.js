const express = require('express');
const { Todo } = require('../mongo');
const { update } = require('../mongo/models/Todo');
const router = express.Router();
const { getAsync, setAsync } = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const addedTodos = await getAsync('added_todos')
  if (addedTodos) {
    await setAsync('added_todos', Number(addedTodos) + 1)
  } else {
    await setAsync('added_todos', 1)
    // console.log("jee")
  }
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
  // res.sendStatus(200); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  console.log(req.body, req.todo)
  // if(!req.todo) {
  //   return res.sendStatus(404)
  // }
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo.id, req.body, {
    new: true
  })
  
  res.send(updatedTodo);
  // res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
