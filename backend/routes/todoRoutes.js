const express = require('express')
const router = express.Router()
const Todo = require('../models/todoItems')

//get all
router.get('/', (req,res) =>{
    Todo.find()
    .then((todo) => res.json(todo))
    .catch((err)=>res.status(400).json(err))
})

//get one
router.get('/:id', async(req,res)=>{
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
})

//add one
router.post('/add', async(req,res)=>{
    try{
        const newItem = new Todo({
            item:req.body.item
        })
        await newItem.save()
        .then(()=>res.json('new item added!'))
        .catch((err)=>res.status(400).json(err))
    }catch(err){
        res.json(err)
    }
})

//update
router.put('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.json('Item updated!');
    } catch (err) {
        res.status(400).json(err);
    }
});

//delete one
router.delete("/:id", (req, res) => {
    
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json("Todo deleted!"))
        .catch((err) => res.status(400).json(err));
});

module.exports = router;