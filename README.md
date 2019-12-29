# What's for Dinner?

May be renamed to 'Your Dinner Helper' or something else entirely

## Getting started
Here are some basic instructions to get a local environment set up to work on this app.

### Prerequisites
* The latest version of [Node.js](https://nodejs.org/en/download/package-manager/) should be installed on your system.

### API
First you'll need to have MongoDB installed on your system.
Open a command prompt (Windows) or terminal (MacOS/Linux) and run the command `mongod` to start the MongoDB daemon. If this command fails, you'll need to install MongoDB.
- [How to Install MongoDB on Windows](http://treehouse.github.io/installation-guides/windows/mongo-windows.html)
- [How to Install MongoDB on a Mac](http://treehouse.github.io/installation-guides/mac/mongo-mac.html)

Once MongoDB is installed, try running the `mongod` command again. 

Next, install dependencies and seed the database.
```bash
cd api
npm install
npm run seed
```

Before you start the app, you'll need to create a `config.json` file in the api directory that contains the following information (this will expand in the future as we need to add environments and authentication).
Example for current config requirements:
```json
{
  "dbHost": "mongodb://localhost:27017",
  "dbName": "whats-for-dinner"
}
```

Then you should be able to start the app
```bash
npm start
```

### Web Client
Go to the client directory, then install dependencies and start the app.
```bash
cd client/web
npm install
npm start
```
Now you can browse to `http://localhost:3000` in your preferred web browser.