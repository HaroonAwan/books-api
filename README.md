# Books NodeJS Express API with PostgreSQL

This project provides a simple RESTful API for managing books using NodeJS, Express, and PostgreSQL.

## Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

1. **Docker**:
   Run the PostgreSQL database using Docker Compose:
   ```bash
   docker-compose up
   ```


2. **Database Migrations**:
   Apply database migrations: (You'll need to create database "books" manually)
   ```bash
   npm run migration:up
   ```

3. **Testing**:
   Run the test suite:
   ```bash
   npm run test
   ```

# Other commands

4. **To stop the containers and remove them**:
   ```bash
   docker-compose down
   ```


5. **Rollback the last batch of migrations**:
   ```bash
   npm run migration:down
   ```

4. **Installation**:
   Install all the dependencies:
   ```bash
   npm install
   ```

3. **Building**:
   Compile the TypeScript code:
   ```bash
   npm run build
   ```

4. **Running the API**:
   Start the Express server:
   ```bash
   npm run start
   ```

## API Endpoints

The main endpoint for managing books is `/books`. You can use methods like `GET`, `POST`, `PUT`, and `DELETE` to interact with the database.

*Note: Always ensure the PostgreSQL and API container is up and running before running migrations.*
