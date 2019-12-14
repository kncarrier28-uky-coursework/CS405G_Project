# CS405G Project
Alex Reel, Alex Tanner, Michaela Williams, Kenton Carrier

## Setup
To run the website, you first have to install mysql server to your machine. The latest community version of mysql server can be found [here](https://dev.mysql.com/downloads/mysql/). Then, add a default user to your mysql server and update the login information in the server files that use mysql (This will be moved to a configuration file in the future).

Once mysql server is running, you can run `npm install` from the root directory to install dependencies.

To setup the mysql database, run `npm run setup_db`.
To add some default items to the database, run `npm run seed_db`.

## Build
To run a development version of the website, run `npm start`. This will concurrently run the client and server on localhost ports 3000 and 3010 respectively.

To run a production version, update the api url file in the server directory to the location of your production server address and run `npm run build`.
