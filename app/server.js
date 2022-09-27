const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const { AllRoutes } = require("./router/router");
const createError = require("http-errors"); // for error handling
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();
const swaggerJsDoc = require("swagger-jsdoc");
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
    this.initRedis();
    this.createServer();
    this.createRotes();
    this.errorHandler();
  }
  configApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "NodeJs Store",
              version: "1.0.0",
              description:
                "This Store Developed By Node.Js , Express.Js , GraphQL , Swagger and ...",
              contact: {
                name: "ali rakhshanipour",
                email: "ali.rakhshanipour.sru@gmail.com",
              },
            },
            servers: [
              {
                url: "http://localhost:3000/",
                description: "local server",
              },
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [{ BearerAuth: [] }],
          },
          apis: ["./app/router/**/*.js"],
        }),
        {
          explorer: true,
        }
      )
    );
  }
  initRedis() {
    require("./utils/redis-init");
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
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to db");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose disconnected");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("Page Not Found"));
    });
    this.#app.use((err, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = err.status || serverError.status;
      const message = err.message || serverError.message;
      return res.status(statusCode).json({ errors: { statusCode, message } });
    });
  }
  createRotes() {
    this.#app.use(AllRoutes);
  }
};
