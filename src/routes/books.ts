import express from 'express'
import {createBook, deleteBook, getBooks, getSingleBooks, updateBook} from "../controllers/bookController";

export const router = express.Router()

router.route('/')
  .get(getBooks)
router.route('/:isbn')
  .get(getSingleBooks)
router.route('/')
  .post(createBook)
router.route('/:isbn')
  .put(updateBook)
router.route('/:isbn')
  .delete(deleteBook)