import request from 'supertest';
import {configDotenv} from "dotenv";

configDotenv();

describe('Book API Integration Tests', () => {
  const api = request("http://localhost:" + process.env.PORT);

  let createdBooks: string[] = [];

  afterAll(async () => {
    // Clean up created books after all tests are done
    for (const isbn of createdBooks) {
      // Implement a delete request to remove the created books
      // Example: await api.delete(`/${isbn}`);
      await api.delete("/books/" + isbn);
    }
  });

  it('should make a GET request to the base URL', async () => {
    const response = await api.get('/');
    expect(response.status).toBe(200);
  });

  // Test creating a book
  it('should create a new book', async () => {
    const response = await api
      .post('/books')
      .send({isbn: '978-1-60309-502-0', title: 'Test Book 1'});
    expect(response.statusCode).toBe(201);
    createdBooks.push('978-1-60309-502-0'); // Store the created book's ISBN
  });

  // Test getting a single book
  it('should get a single book', async () => {
    const response = await api.get('/books/978-1-60309-502-0');
    expect(response.statusCode).toBe(200);
    expect(response.body.isbn).toBe('978-1-60309-502-0');
  });

  // Test updating a book
  it('should update a book', async () => {
    const response = await api
      .put('/books/978-1-60309-502-0')
      .send({title: 'Updated Book Title'});
    expect(response.statusCode).toBe(200);
    expect(response.body.book.title).toBe('Updated Book Title');
  });

  // Test listing all books
  it('should list all books', async () => {
    const response = await api.get('/books');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(createdBooks.length);
  });

  // Test deleting a book
  it('should delete a book', async () => {
    const response = await api.delete('/books/978-1-60309-502-0');
    expect(response.statusCode).toBe(200);
    // Remove the deleted book from the createdBooks array
    const index = createdBooks.indexOf('978-1-60309-502-0');
    if (index !== -1) {
      createdBooks.splice(index, 1);
    }
  });

  // Test scenario: Creating two books and checking the listing
  it('should list two books after creating two books', async () => {
    // Create the first book
    const response1 = await api
      .post('/books')
      .send({isbn: '978-1-60309-517-4', title: 'Test Book 2'});
    expect(response1.statusCode).toBe(201);
    createdBooks.push('978-1-60309-517-4');

    // Create the second book
    const response2 = await api
      .post('/books')
      .send({isbn: '978-0735211292', title: 'Test Book 3'});
    expect(response2.statusCode).toBe(201);
    createdBooks.push('978-0735211292');

    // List all books
    const response3 = await api.get('/books');
    expect(response3.statusCode).toBe(200);
    expect(Array.isArray(response3.body)).toBe(true);
    expect(response3.body.length).toBe(createdBooks.length);
  });

  // Test scenario: Deleting one book and checking the listing
  it('should list one book after deleting one book', async () => {
    // Delete one of the created books
    const response = await api.delete('/books/978-1-60309-517-4');
    expect(response.statusCode).toBe(200);
    // Remove the deleted book from the createdBooks array
    const index = createdBooks.indexOf('978-1-60309-517-4');
    if (index !== -1) {
      createdBooks.splice(index, 1);
    }

    // List all books
    const response2 = await api.get('/books');
    expect(response2.statusCode).toBe(200);
    expect(Array.isArray(response2.body)).toBe(true);
    expect(response2.body.length).toBe(createdBooks.length);
  });
});
