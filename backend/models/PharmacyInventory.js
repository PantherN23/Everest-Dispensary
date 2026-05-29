const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PharmacyInventory = sequelize.define('PharmacyInventory', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  medicineCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  medicineName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genericName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  manufacturer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  strength: {
    type: DataTypes.STRING,
    allowNull: true
  },
  unitType: {
    type: DataTypes.ENUM('tablet', 'capsule', 'liquid', 'injection', 'ointment', 'powder', 'suspension'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  minimumStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  batchNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  storageLocation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'discontinued'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

module.exports = PharmacyInventory;
