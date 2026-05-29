const Patient = require('../models/Patient');

// Register Patient
exports.registerPatient = async (req, res) => {
  try {
    const { firstName, lastName, dateOfBirth, gender, email, phone, address, bloodGroup, emergencyContact, emergencyPhone } = req.body;

    const registrationNumber = `PAT-${Date.now()}`;
    const patient = await Patient.create({
      registrationNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      phone,
      address,
      bloodGroup,
      emergencyContact,
      emergencyPhone
    });

    res.status(201).json({
      message: 'Patient registered successfully',
      patient
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Patient
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const { firstName, lastName, phone, address, bloodGroup, emergencyContact, emergencyPhone, status } = req.body;
    await patient.update({ firstName, lastName, phone, address, bloodGroup, emergencyContact, emergencyPhone, status });

    res.status(200).json({
      message: 'Patient updated successfully',
      patient
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Patients
exports.searchPatients = async (req, res) => {
  try {
    const { query } = req.query;
    const { Op } = require('sequelize');

    const patients = await Patient.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${query}%` } },
          { lastName: { [Op.like]: `%${query}%` } },
          { registrationNumber: { [Op.like]: `%${query}%` } },
          { phone: { [Op.like]: `%${query}%` } }
        ]
      }
    });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
