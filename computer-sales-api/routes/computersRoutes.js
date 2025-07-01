const express = require("express");
const router = express.Router();
const computerController = require("../controllers/computerController");

// GET: Obtener todas las computadoras
router.get("/computers", computerController.getAllComputers);

// GET: Obtener una computadora por id
router.get("/computers/:id", computerController.getComputerById);

// POST: Crear una nueva computadora
router.post("/computers", computerController.createComputer);

// PUT: Actualizar una computadora por id
router.put("/computers/:id", computerController.updateComputer);

// DELETE: Eliminar una computadora por id
router.delete("/computers/:id", computerController.deleteComputer);

// GET: Calcular el precio total de todas las computadoras
router.get("/computers-total-price", computerController.getTotalPrice);

module.exports = router;