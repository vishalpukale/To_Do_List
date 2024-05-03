const router = require('express').Router();
const mongoose = require('mongoose')


const User = require("../models/user");
const List = require("../models/list");


// Create
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if(existingUser){
            const list = new List({title, body, user: existingUser}) 
            await list.save().then(() => res.status(200).json({list}))
            existingUser.list.push(list);
            existingUser.save();
        }
    } catch (error) {
        console.error(error);
    }
});


// Update
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { title, body } = req.body;
        const list = await List.findByIdAndUpdate(req.params.id, {title, body});
        list.save().then(()=>{res.status(200).json({ message: "Task Updated" })})
    } catch (error) {
        console.error(error);
    }
});


// Delete 
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.body;
        const existingUser = await User.findByIdAndUpdate(
            id , 
            {$pull: {list: req.params.id}
        });
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(()=>{res.status(200).json({ message: "Task Deleted Successfully" })})
        }
    } catch (error) {
        console.error(error);
    }
});


// Get Task
router.get('/getTasks/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const list = await List.find({ user: userId }).sort({ createdAt: -1 });
        if (list.length !== 0) {
            res.status(200).json({ list: list });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            res.status(404).json({ message: 'Task not found' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});



module.exports = router