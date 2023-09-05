import {Request, Response} from 'express';
import {createABook, deleteABook, getABook, getAllBooks, updateABook} from '../services/bookService'

export const getBooks = async (req: Request, res: Response) => {
  try {
    res.status(200).json(await getAllBooks());
  } catch (error) {
    res.status(500).json({error: 'Internal server error'});
  }
}

export const getSingleBooks = async (req: Request, res: Response) => {
  const {isbn} = req.params;

  try {
    const result = await getABook(isbn)
    if (result == null) {
      res.status(404).json({error: 'Book not found'});
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
}

export const createBook = async (req: Request, res: Response) => {
  const {title, isbn} = req.body;

  if (!validateISBN(isbn)) {
    return res.status(400).json({error: 'Validation failed', details: ["Invalid isbn number provided"]});
  }

  try {
    const result = await createABook(isbn, title)
    res.status(201).json({
      message: 'Book created successfully',
      book: result,
    });
  } catch (error: any) {
    res.status(400).json({error: 'Validation failed', details: [error.message]});
  }
}

export const updateBook = async (req: Request, res: Response) => {
  const {isbn} = req.params;
  const {title} = req.body;

  try {
    const result = await updateABook(isbn, title)
    if (result == null) {
      res.status(404).json({error: 'Book not found'});
    } else {
      res.json({
        message: 'Book updated successfully',
        book: result,
      });
    }
  } catch (error: any) {
    res.status(400).json({error: 'Validation failed', details: [error.message]});
  }
}

export const deleteBook = async (req: Request, res: Response) => {
  const {isbn} = req.params;

  try {
    const result = await deleteABook(isbn);
    if (result == null) {
      res.status(404).json({error: 'Book not found'});
    } else {
      res.json({message: 'Book deleted successfully'});
    }
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
}

function validateISBN(isbn: string) {
  // Remove any hyphens or spaces from the input
  isbn = isbn.replace(/[-\s]/g, '');

  // Check if the input is either ISBN-10 or ISBN-13
  if (isbn.length === 10) {
    // Validate ISBN-10
    if (/^\d{9}[\dXx]$/.test(isbn)) {
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(isbn.charAt(i)) * (10 - i);
      }
      const lastChar = isbn.charAt(9).toUpperCase();
      if (lastChar === 'X') {
        return sum % 11 === 0;
      } else {
        return (sum + parseInt(lastChar)) % 11 === 0;
      }
    }
  } else if (isbn.length === 13) {
    // Validate ISBN-13
    if (/^\d{13}$/.test(isbn)) {
      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += parseInt(isbn.charAt(i)) * (i % 2 === 0 ? 1 : 3);
      }
      const checkDigit = (10 - (sum % 10)) % 10;
      return parseInt(isbn.charAt(12)) === checkDigit;
    }
  }

  // If the input does not match either ISBN-10 or ISBN-13 format, return false
  return false;
}