const bookRouter = require("express").Router();
const { addBook, getAllBooks, getByISBN } = require("../controllers/book");
const upload = require("../middlewares/uploadFile");
//post book
bookRouter.post("/book/add", upload.single("bookCover"), addBook);

//get book by category
bookRouter.get("/books", getAllBooks);

// get by isbn
// bookRouter.get("/book/:isbn", getByISBN);

//remove

//get by categorie

//update

module.exports = bookRouter;