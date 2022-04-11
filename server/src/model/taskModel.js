const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    taskName: {type: String, required : true},
    projectName: {type: String, required: true},
    isBillable: {type: Boolean, required: true, default : false},
    userId: {type : Number}
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task; 