// app.js

require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const authJwt = require("./helper/jwt");

// Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const errorHandler = require("./helper/error-hanlder");


const PORT = process.env.PORT || 5000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Middlewares
app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use(morgan("combined"));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads',express.static(__dirname+'/public/uploads'));

const api = process.env.API_URL;
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Database
mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => console.log("Error database connection", error));

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
