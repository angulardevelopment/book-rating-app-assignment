import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min:0,
        max:5,
        default:0
    },
    ratedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

const Books = mongoose.model("Book", booksSchema);

export default Books;