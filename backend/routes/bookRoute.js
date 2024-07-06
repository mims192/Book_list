import express from 'express';
import { Book } from '../models/bookModel.js';

const router =express.Router();
//Route for save a new book
router.post('/',async(req,res)=>{
    try{
        if(!req.body.title||!req.body.author||!req.body.publishYear){
            return res.status(400).send({message:'send all required fields :title author publishyear'})
        }
        const newBook={
            title:req.body.title,
            author:req.body.author,
            publishYear:req.body.publishYear
        }
        const book=await Book.create(newBook);
        res.status(201).send(book);

    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});
    }
})
//Route for get all books from database
router.get('/',async(req,res)=>{
    try{
        const books=await Book.find({});
        return res.status(200).json({
            count:books.length,
            data:books
        });


    }catch(error){
         console.log(error.message);
        res.status(500).send({message:error.message});
    }

})
//Route to get one book from database by id
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id); // Use the ID to find the specific book
  
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      return res.status(200).json(book); // Return the book details directly
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
//Route to Update a book
router.put('/:id', async (req, res) => {
    try {
      const { title, author, publishYear } = req.body;
  
      if (!title || !author || !publishYear) {
        return res.status(400).send({ message: 'Please send all required fields: title, author, publishYear' });
      }
  
      const { id } = req.params;
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      return res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  //delete a book
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      return res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });

export default router;
  