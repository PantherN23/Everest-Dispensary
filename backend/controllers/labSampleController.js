const LabSample = require('../models/LabSample');
const Patient = require('../models/Patient');
const { Op } = require('sequelize');

// Create Lab Sample
exports.createSample = async (req, res) => {
  try {
    const { patientId, sampleType, collectedBy, storageLocation, temperature } = req.body;

    const sampleCode = `SAM-${Date.now()}`;
    const sample = await LabSample.create({
      sampleCode,
      patientId,
      sampleType,
      collectedBy,
      storageLocation,
      temperature,
      status: 'collected'
    });

    res.status(201).json({
      message: 'Sample collected successfully',
      sample
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Samples
exports.getAllSamples = async (req, res) => {
  try {
    const samples = await LabSample.findAll({
      include: [{ model: Patient, attributes: ['firstName', 'lastName', 'registrationNumber'] }]
    });
    res.status(200).json(samples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Samples by Status
exports.getSamplesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const samples = await LabSample.findAll({
      where: { status },
      include: [{ model: Patient, attributes: ['firstName', 'lastName', 'registrationNumber'] }]
    });
    res.status(200).json(samples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Sample Status
exports.updateSampleStatus = async (req, res) => {
  try {
    const { status, qualityFlag, rejectionReason, notes } = req.body;
    const sample = await LabSample.findByPk(req.params.id);

    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    await sample.update({
      status,
      qualityFlag,
      rejectionReason,
      notes
    });

    res.status(200).json({
      message: 'Sample status updated',
      sample
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Patient Samples
exports.getPatientSamples = async (req, res) => {
  try {
    const samples = await LabSample.findAll({
      where: { patientId: req.params.patientId }
    });
    res.status(200).json(samples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Quality Flag Samples
exports.getQualityFlaggedSamples = async (req, res) => {
  try {
    const samples = await LabSample.findAll({
      where: { qualityFlag: true },
      include: [{ model: Patient, attributes: ['firstName', 'lastName', 'registrationNumber'] }]
    });
    res.status(200).json(samples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
