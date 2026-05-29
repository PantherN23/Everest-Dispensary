const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LabSample = sequelize.define('LabSample', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sampleCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Patients',
      key: 'id'
    }
  },
  sampleType: {
    type: DataTypes.ENUM('blood', 'urine', 'stool', 'sputum', 'cerebrospinal fluid', 'tissue', 'other'),
    allowNull: false
  },
  collectionDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  collectionTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  collectedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('collected', 'in-processing', 'processed', 'rejected'),
    defaultValue: 'collected'
  },
  storageLocation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  temperature: {
    type: DataTypes.STRING,
    allowNull: true
  },
  qualityFlag: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  rejectionReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = LabSample;
