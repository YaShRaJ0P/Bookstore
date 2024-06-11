import Book from "../models/bookModel.js";
export const AddBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please fill all the fields");
    }

    const regex = /^(?!.*[-e])\d{0,4}$/;

    if (req.body.publishYear.length !== 4 && regex.test(req.body.publishYear))
      return res.status(400).send("Please enter vaid Year.");

    const book = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const savedBook = await Book.create(book);
    return res.status(201).send(savedBook);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: "Server Error." });
  }
};

export const GetBooks = async (req, res) => {
  await Book.find()
    .then((books) => {
      res.status(200).send({ count: books.length, data: books });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server Error." });
    });
};

export const GetBookById = async (req, res) => {
  await Book.findById(req.params.id)
    .then((book) => {
      res.status(200).send(book);
    })
    .catch((err) => {
      res.status(500).send({ message: "Book not found." });
    });
};

export const UpdateBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please fill all the fields");
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedBook)
      return res.status(404).send({ message: "Book not found." });
    return res.status(200).send({ message: "Book Updated Successfully." });
  } catch (err) {
    res.status(500).send({ message: "Book Not Found." });
  }
};

export const DeleteBook = async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Book not found." });
    return res.status(200).json({ message: "Book Deleted Successfully." });
  } catch (error) {
    res.status(500).send({ message: "Server Error." });
  }
};
