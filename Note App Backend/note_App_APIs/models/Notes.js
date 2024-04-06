const mongoose = require("mongoose");
const Notes = new mongoose.Schema({
    title: {
        type: String,
        min: 5,
        max: 25,
        requried: true
    },
    description: {
        type: String,
        min: 5,
        max: 30,
        required: true,
    },
    postedBy: {
        type: String,
        min: 5,
        max: 30,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("notes", Notes);