const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LabQualityManagement = sequelize.define('LabQualityManagement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  qcName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qcType: {
    type: DataTypes.ENUM('internal', 'external', 'proficiency-testing'),
    allowNull: false
  },
  testId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'LabTests',
      key: 'id'
    }
  },
  frequency: {
    type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'quarterly', 'annually'),
    allowNull: false
  },
  isoStandard: {
    type: DataTypes.STRING,
    defaultValue: 'ISO 15189:2022'
  },
  acceptanceCriteria: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  lastTestDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  nextTestDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  result: {
    type: DataTypes.ENUM('pass', 'fail', 'pending'),
    defaultValue: 'pending'
  },
  resultValue: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  correctionActions: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reviewedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

module.exports = LabQualityManagement;
