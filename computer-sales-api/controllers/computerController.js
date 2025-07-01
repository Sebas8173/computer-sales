const Computer = require("../models/computer");

// CREAR: Agregar una nueva computadora
exports.createComputer = async (req, res) => {
  const computer = new Computer(req.body);
  try {
    const newComputer = await computer.save();
    res.status(201).json(newComputer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LEER: Obtener todas las computadoras
exports.getAllComputers = async (req, res) => {
  try {
    const computers = await Computer.find();
    res.json(computers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LEER: Obtener una computadora por id
exports.getComputerById = async (req, res) => {
  try {
    const computer = await Computer.findOne({ id: req.params.id });
    if (!computer) {
      return res.status(404).json({ message: "Computadora no encontrada" });
    }
    res.json(computer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ACTUALIZAR: Actualizar una computadora por id
exports.updateComputer = async (req, res) => {
  try {
    const computer = await Computer.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!computer) {
      return res.status(404).json({ message: "Computadora no encontrada" });
    }
    res.json(computer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ELIMINAR: Eliminar una computadora por id
exports.deleteComputer = async (req, res) => {
  try {
    const computer = await Computer.findOneAndDelete({ id: req.params.id });
    if (!computer) {
      return res.status(404).json({ message: "Computadora no encontrada" });
    }
    res.json({ message: "Computadora eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CALCULAR: Precio total de todas las computadoras
exports.getTotalPrice = async (req, res) => {
  try {
    const computers = await Computer.find();
    if (computers.length === 0) {
      return res.status(200).json({ precioTotal: 0, message: "No hay computadoras en la base de datos" });
    }
    const precioTotal = computers.reduce((sum, computer) => {
      const precio = Number(computer.precio);
      if (isNaN(precio)) {
        throw new Error(`Precio inválido en la computadora con id ${computer.id}`);
      }
      return sum + precio;
    }, 0);
    res.json({ precioTotal });
  } catch (err) {
    res.status(500).json({ message: `Error al calcular el precio total: ${err.message}` });
  }
};