import { model, Schema } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    isDone: {
        type: Boolean,
        require: true
    }
});

export default model("Todo", todoSchema);
