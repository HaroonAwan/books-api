# Books NodeJS Express API with PostgreSQL

This project provides a simple RESTful API for managing books using NodeJS, Express, and PostgreSQL.

## Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

**Environment Variables**

The following environment variables are required to set up and run the application:
Create an .env file

```
PORT=3000

POSTGRES_USER=admin
POSTGRES_PASSWORD=7gvl3A0
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=books

POSTGRES_HOST_LOCAL=localhost
```

1. **Installation**:
   Install all the dependencies:
   ```bash
   npm install
   ```

2. **Docker**:
   Run the PostgreSQL database using Docker Compose:
   ```bash
   docker-compose up
   ```


3. **Database Migrations**:
   Apply database migrations:
   ```bash
   npm run migration:up
   ```

4. **Testing**:
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
