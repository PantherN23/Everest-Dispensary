const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LabTestRequest = sequelize.define('LabTestRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  requestNumber: {
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
  testId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'LabTests',
      key: 'id'
    }
  },
  sampleId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'LabSamples',
      key: 'id'
    }
  },
  doctorId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  clinicalIndication: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  requestDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('requested', 'pending', 'in-progress', 'completed', 'released', 'cancelled'),
    defaultValue: 'requested'
  },
  resultValue: {
    type: DataTypes.STRING,
    allowNull: true
  },
  resultInterpretation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  referenceRange: {
    type: DataTypes.STRING,
    allowNull: true
  },
  testDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  testedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  reviewedBy: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  qcFlag: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  qcComments: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = LabTestRequest;
