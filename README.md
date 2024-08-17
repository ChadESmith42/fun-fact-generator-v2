# Express API with Angular Frontend

This is a template repo for an Express API, using Typescript and PostgreSQL, with an Angular v17 frontend.

## Express API

The Express API has a file structure which is intended to allow for customization and separation of concerns.

The `client` folder contains the Angular application. The `db` folder is intended to hold the PostgreSQL database connection, pool, and query. The `modules` folder is intended to handle business logic, such as converting DB objects to DTOs or managing request logic flow. The `utilities` folder is intended to hold reusable methods needed elsewhere in the application, such as validation methods for `req` data and middleware. The `routes` folder is intended to hold route handlers for each endpoint.

## Angular UI

The Angular UI included with this repo has no additional dependencies added. The app is the direct result of generating a new app via the CLI.

## Secrets, Keys, and Other Private Bits

The `.env` file has been omitted from this repo. Place all of the PostgreSQL variables in the `.env` file for local development. You may also add the variable in the docker-compose.yml file.

The essential variables needed are:

- PGUSER - default is 'postgres'
- PGPASSWORD
- PGDATABASE - project dependent
- PGPORT - default is 5432
- PGHOST - localhost for development

## Issues and PRs

Please submit any issues you find. Provide as much context as needed for the issue to be reproduced.

PRs are welcome for dependency security issues and version upgrades. Only libraries in LTS status or stable will be considered for upgrades.