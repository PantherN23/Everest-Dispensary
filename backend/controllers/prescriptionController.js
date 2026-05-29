const Prescription = require('../models/Prescription');
const PharmacyInventory = require('../models/PharmacyInventory');
const Patient = require('../models/Patient');
const { Op } = require('sequelize');

// Create Prescription
exports.createPrescription = async (req, res) => {
  try {
    const { patientId, doctorId, medicineId, dosage, frequency, duration, quantity, instructions } = req.body;

    const prescriptionNumber = `PRE-${Date.now()}`;
    const prescription = await Prescription.create({
      prescriptionNumber,
      patientId,
      doctorId,
      medicineId,
      dosage,
      frequency,
      duration,
      quantity,
      instructions,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Prescription created successfully',
      prescription
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Pending Prescriptions
exports.getPendingPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({
      where: { status: 'pending' },
      include: [
        { model: Patient, attributes: ['firstName', 'lastName', 'registrationNumber'] },
        { model: PharmacyInventory, attributes: ['medicineName', 'strength'] }
      ]
    });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Dispense Prescription
exports.dispensePrescription = async (req, res) => {
  try {
    const { dispensedBy } = req.body;
    const prescription = await Prescription.findByPk(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    // Update medicine stock
    const medicine = await PharmacyInventory.findByPk(prescription.medicineId);
    if (medicine.quantity < prescription.quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    await medicine.decrement('quantity', { by: prescription.quantity });

    // Update prescription status
    await prescription.update({
      status: 'dispensed',
      dispensedDate: new Date(),
      dispensedBy
    });

    res.status(200).json({
      message: 'Prescription dispensed successfully',
      prescription
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Patient Prescription History
exports.getPatientPrescriptionHistory = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({
      where: { patientId: req.params.patientId },
      include: [
        { model: PharmacyInventory, attributes: ['medicineName', 'strength', 'unitType'] }
      ],
      order: [['prescriptionDate', 'DESC']]
    });
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Dispensing Report
exports.getDispensingReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const { sequelize } = require('sequelize');

    const report = await Prescription.findAll({
      where: {
        status: 'dispensed',
        dispensedDate: {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        }
      },
      attributes: [
        'medicineName',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']
      ],
      group: ['medicineId']
    });

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
