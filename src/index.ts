import cors from 'cors';
import express from 'express';
import {configDotenv} from 'dotenv';
import {router as booksRouter} from "./routes/books";
import {Postgres} from "./config/datasource.config";

// ------------------------------
// Init Express App
// ------------------------------
const app = express();
configDotenv();  // Load .env

// Connecting to PostgreSQL
const dataSource = Postgres.init();
dataSource.initialize().then(() => {
  console.log('PostgreSQL connected');

  app.use(express.json()); // For parsing application/json
  app.use(cors());

  // ------------------------------
  // routes
  // ------------------------------
  app.get('/', (_, res) => {
    res.send(`Books API Server v0.0.1 is Running...`);
  });

  app.use('/books', booksRouter)

  // ------------------------------
  // Listen at port in .env file or 8080
  // ------------------------------
  const port = +(process.env.PORT ?? 8080);
  app.listen(port, '0.0.0.0', () => {
    console.log(`Books API listening on port ${port}`);
  });
})
  .catch((error) => {
    console.error('Error connecting to PostgreSQL:', error);
    process.exit(1); // Exit the application on database connection failure
  });