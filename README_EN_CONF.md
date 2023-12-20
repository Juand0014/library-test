# How to configure?
## In case you don't have Docker:

The application requires a environment variable to work (DB_URI), which is the database "connection", it may be configured through a ".env" file in the project root or in the operative system.

Once you have done the above; execute the "npm i(nstall)" command (it's assumed that the system has Node.js LTS) to install dependencies and "npm start".

## In case you have Docker:

From the project's root: `docker-compose up -d --build`.