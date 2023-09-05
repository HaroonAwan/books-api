import {Book} from "../entity/book";

export async function getAllBooks() {
  return await Book.find()
}

export async function getABook(isbn: string) {
  return await Book.findOneBy({isbn: isbn});
}

export async function createABook(isbn: string, title: string) {
  const book = new Book();
  book.isbn = isbn;
  book.title = title

  return await book.save();
}

export async function updateABook(isbn: string, title: string) {
  const book = await Book.findOneBy({
    isbn: isbn
  })

  if (book != null) {
    book.title = title
    return await book.save()
  } else {
    return null
  }
}

export async function deleteABook(isbn: string) {
  const book = await Book.findOneBy({
    isbn: isbn
  })
  if (book != null) {
    return await book.remove();
  } else {
    return null
  }
}