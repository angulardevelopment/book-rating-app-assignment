import mongoose, { isValidObjectId } from "mongoose";
import Books from "../models/books.model.js";

export const addBook = async (req, res) => {
    try {
        const userId = req.user;
        const { title, author } = req.body;
        const checkBook = Books.findOne({ title: title, author: author, createdBy: userId });
        if (!checkBook) {
            return res.status(400).json({
                message: "Book already exists"
            })
        }
        const book = new Books({
            title,
            author,
            createdBy: userId
        })
        await book.save();
        return res.status(201).json({
            book,
            message: "Book added successfully"
        })

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = Books.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }
        await Books.findByIdAndDelete(bookId);
        res.status(200).json({
            message: "Book deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const rateBook = async (req, res) => {
    try {
        const { bookId, userId } = req.params;
        const { rating } = req.body;
        if (!isValidObjectId(bookId) || !isValidObjectId(userId)) {
            return res.status(400).json({
                message: "Invalid Id"
            })
        }
        const book = await Books.findById(bookId);
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            })
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                message: "Rating should be between 1 and 5"
            })
        }
        const ratedBook = await Books.findByIdAndUpdate(
            bookId,
            {
                $set: {
                    _id: bookId,
                    rating: rating,
                    ratedBy: userId
                }
            },
            {
                new: true
            }
        )
        
        res.status(200).json({
            ratedBook,
            message: "Book rated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getBooksByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const books = await Books.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy"
                }
            },
            {
                $unwind: "$createdBy"
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    author: 1,
                    rating: 1,
                    createdAt: 1,
                    createdBy: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        userName: 1
                    },
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
        ])
        res.status(200).json({books,
            message: "Books retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const filterBooksByRating = async (req, res) => {
    try {
        const { rating } = req.body;
        const books = await Books.aggregate([
            {
                $match: {
                    rating: parseInt(rating)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "ratedBy",
                    foreignField: "_id",
                    as: "ratedBy"
                }
            },
            {
                $unwind: "$createdBy"
            },
            {
                $unwind: '$ratedBy'
            },
            {
                $project: {
                    title: 1,
                    author: 1,
                    rating: 1,
                    createdAt: 1,
                    createdBy: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        userName: 1,
                    },
                    ratedBy: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        userName: 1,
                    }
                }
            },
            {
                $sort: {
                    createdAt: -1
                }
            }
        ])     
        res.status(200).json({books,
            message: "Books filtered successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}