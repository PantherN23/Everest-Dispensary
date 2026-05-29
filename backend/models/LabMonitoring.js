const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LabMonitoring = sequelize.define('LabMonitoring', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  monitoringType: {
    type: DataTypes.ENUM('temperature', 'humidity', 'cleanliness', 'equipment-calibration', 'personnel-training'),
    allowNull: false
  },
  parameter: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  monitoringDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  monitoringTime: {
    type: DataTypes.TIME,
    allowNull: true
  },
  recordedValue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  acceptableRange: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('compliant', 'out-of-range', 'warning'),
    defaultValue: 'compliant'
  },
  recordedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  correctionAction: {
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

module.exports = LabMonitoring;
