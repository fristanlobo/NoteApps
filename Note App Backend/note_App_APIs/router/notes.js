const router = require("express").Router();
const Note = require("../models/Notes");
const User = require("../models/User");

router.post("/addNote", async (req, res) => {
    try {
        const note = new Note({
            title: req.body.title,
            description: req.body.description,
            postedBy: req.body.postedBy,
        })
        const data = await note.save();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json(e);
    }
})

router.delete("/deleteNotes/:id", async (req, res) => {
    try {
        const noteId = await Note.findOne({
            _id: req.params.id,
        })
        !noteId && res.status(400).json({
            message: "Note not found",
            status: false
        })
        const note = await Note.deleteOne({
            _id: req.params.id
        })
        res.status(200).json({
            message: "Note deleted Succesfully",
            status: true,
        })
    }
    catch (e) {
        res.status(500).json(e);
    }

})

router.put("/updateNotes/:id", async (req, res) => {
    try {
        const noteId = await Note.findOne({
            _id: req.params.id,
        })
        !noteId && res.status(400).json({
            message: "Note not found",
            status: false
        })
        const note = await Note.updateOne({
            title: req.body.title,
            description: req.body.description,
            postedBy: req.body.postedBy,
        })
        res.status(200).json({
            message: "Note updated Succesfully",
            status: true,
        })
    } catch (e) {
        res.status(500).json(e);
    }
})

router.get("/getNotes/:userId", async (req, res) => {
    try {
        const currentuser = await User.findById(req.params.userId)
        !currentuser && res.status(400).json({
            message: "User not found",
            status: false
        })
        const notes = await Note.find({
            postedBy: req.params.userId
        })
        res.status(200).json(notes);
    } catch (e) {
        res.status(500).json(e);
    }
})


module.exports = router;