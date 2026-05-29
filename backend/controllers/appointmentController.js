const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const User = require('../models/User');

// Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate, timeSlot, reason } = req.body;

    const appointmentNumber = `APT-${Date.now()}`;
    const appointment = await Appointment.create({
      appointmentNumber,
      patientId,
      doctorId,
      appointmentDate,
      timeSlot,
      reason
    });

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        { model: Patient, attributes: ['firstName', 'lastName', 'registrationNumber'] },
        { model: User, attributes: ['firstName', 'lastName', 'email'] }
      ]
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointments by Status
exports.getAppointmentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const appointments = await Appointment.findAll({
      where: { status },
      include: [
        { model: Patient, attributes: ['firstName', 'lastName', 'registrationNumber'] },
        { model: User, attributes: ['firstName', 'lastName'] }
      ]
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment Status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const appointment = await Appointment.findByPk(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    await appointment.update({ status, notes });

    res.status(200).json({
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Upcoming Appointments
exports.getUpcomingAppointments = async (req, res) => {
  try {
    const { Op } = require('sequelize');
    const appointments = await Appointment.findAll({
      where: {
        appointmentDate: { [Op.gte]: new Date() },
        status: { [Op.ne]: 'cancelled' }
      },
      order: [['appointmentDate', 'ASC']]
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
