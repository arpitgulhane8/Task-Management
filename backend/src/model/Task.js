const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checklistItemSchema = new Schema({
  text: { 
    type: String,
    required: true 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
});

const taskSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ["HIGH PRIORITY", "MODERATE PRIORITY", "LOW PRIORITY"], 
    default: "HIGH PRIORITY" 
  },
  assignTo: { 
    type: String, 
    required: false 
  },
  checklist: [checklistItemSchema],
  dueDate: { 
    type: Date, 
    required: false 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",                         
    required: true,
  },
  status: {
    type: String,
    enum: ["Backlog", "Todo", "Inprogress", "Done"], 
    required: true,
    default: "Todo"
  }
}, 
{ timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
