const port = process.env.PORT || 3001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("System connected to MongoDB Database"));

app.use(express.json());

// Ruta raíz para que no dé el error "Cannot GET /"
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la tienda de computadoras!");
});

// Ruta para el endpoint /computerstore
const computerRouter = require("./routes/computersRoutes");
app.use("/computerstore", computerRouter);

app.listen(port, () => console.log(`MY Computer Store Server is running on port --> ${port}`));
