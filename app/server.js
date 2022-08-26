const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");

//---------------------------------------------------------------- app configuration
module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URI;
  constructor(PORT, DB_URI) {
    this.#DB_URI = DB_URI;
    this.#PORT = PORT;
    this.configApplication();
    this.connectToMongoDB();
    this.createServer();
    this.createRotes();
    this.errorHandler();
  }
  configApplication() {
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(3000, () => {
      console.log(`Server Listening on port http://localhost:${this.#PORT}`);
    });
  }
  connectToMongoDB() {
    mongoose.connect(this.#DB_URI, (error) => {
      if (!error) return console.log("connected to mongodb");
      return console.log("failed to connect to mongodb");
    });
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.json({ statusCode: 404, message: "Page Not Found" });
    });
    this.#app.use((err, req, res, next) => {
      const statusCode = err.status || 500;
      const message = err.status || "internal server error";
      return res.status(statusCode).json({ statusCode, message });
    });
  }
  createRotes() {
    this.#app.use(AllRoutes);
  }
};
