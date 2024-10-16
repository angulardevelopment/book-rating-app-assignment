import { Router } from "express";
import { isAuth } from "../middlewares/authentication.middleware.js";
import { addBook,deleteBook,rateBook,filterBooksByRating,getBooksByUserId } from "../controllers/books.controller.js";

const router = Router();


router.post("/rateBook/:bookId/:userId", rateBook).get("/rating", filterBooksByRating).get("/getBooks/:userId", getBooksByUserId);


router.post("/addBook",isAuth, addBook);
router.delete("/deleteBook/:bookId",isAuth, deleteBook);






export default router;