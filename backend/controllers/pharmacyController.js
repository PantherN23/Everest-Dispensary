const PharmacyInventory = require('../models/PharmacyInventory');
const { Op } = require('sequelize');

// Add Medicine to Inventory
exports.addMedicine = async (req, res) => {
  try {
    const { medicineName, genericName, manufacturer, strength, unitType, quantity, minimumStock, unitPrice, expiryDate, batchNumber, storageLocation } = req.body;

    const medicineCode = `MED-${Date.now()}`;
    const medicine = await PharmacyInventory.create({
      medicineCode,
      medicineName,
      genericName,
      manufacturer,
      strength,
      unitType,
      quantity,
      minimumStock,
      unitPrice,
      expiryDate,
      batchNumber,
      storageLocation
    });

    res.status(201).json({
      message: 'Medicine added to inventory',
      medicine
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const medicines = await PharmacyInventory.findAll();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Low Stock Medicines
exports.getLowStockMedicines = async (req, res) => {
  try {
    const medicines = await PharmacyInventory.findAll({
      where: {
        [Op.and]: [
          { quantity: { [Op.lte]: require('sequelize').where(require('sequelize').col('minimumStock'), Op.gte, 0) } },
          { status: 'active' }
        ]
      }
    });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Expired Medicines
exports.getExpiredMedicines = async (req, res) => {
  try {
    const medicines = await PharmacyInventory.findAll({
      where: {
        expiryDate: { [Op.lte]: new Date() }
      }
    });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Medicine Stock
exports.updateMedicineStock = async (req, res) => {
  try {
    const { quantity } = req.body;
    const medicine = await PharmacyInventory.findByPk(req.params.id);

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    await medicine.update({ quantity });

    res.status(200).json({
      message: 'Medicine stock updated',
      medicine
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Medicines
exports.searchMedicines = async (req, res) => {
  try {
    const { query } = req.query;
    const medicines = await PharmacyInventory.findAll({
      where: {
        [Op.or]: [
          { medicineName: { [Op.like]: `%${query}%` } },
          { genericName: { [Op.like]: `%${query}%` } },
          { medicineCode: { [Op.like]: `%${query}%` } }
        ]
      }
    });
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Stock Report
exports.getStockReport = async (req, res) => {
  try {
    const { sequelize } = require('sequelize');
    const report = await PharmacyInventory.findAll({
      attributes: [
        'medicineName',
        'quantity',
        'minimumStock',
        [sequelize.literal('quantity - minimumStock'), 'buffer'],
        'unitPrice',
        [sequelize.literal('quantity * unitPrice'), 'totalValue']
      ]
    });
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
