const Payment = require('../models/Payment');
const Patient = require('../models/Patient');

// Create Payment
exports.createPayment = async (req, res) => {
  try {
    const { patientId, amount, description, paymentMethod, transactionReference, receivedBy } = req.body;

    const paymentNumber = `PAY-${Date.now()}`;
    const payment = await Payment.create({
      paymentNumber,
      patientId,
      amount,
      description,
      paymentMethod,
      transactionReference,
      receivedBy,
      status: 'completed'
    });

    res.status(201).json({
      message: 'Payment recorded successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Patient, attributes: ['firstName', 'lastName', 'registrationNumber'] }]
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Payments by Status
exports.getPaymentsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const payments = await Payment.findAll({
      where: { status },
      include: [{ model: Patient, attributes: ['firstName', 'lastName', 'registrationNumber'] }]
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Patient Payment History
exports.getPatientPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { patientId: req.params.patientId },
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Payment Status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByPk(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    await payment.update({ status });

    res.status(200).json({
      message: 'Payment status updated',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Daily Collection Report
exports.getDailyCollectionReport = async (req, res) => {
  try {
    const { date } = req.query;
    const { Op } = require('sequelize');
    const { sequelize } = require('sequelize');

    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const payments = await Payment.findAll({
      where: {
        paymentDate: {
          [Op.between]: [startDate, endDate]
        },
        status: 'completed'
      },
      attributes: [
        'paymentMethod',
        [sequelize.fn('SUM', sequelize.col('amount')), 'total']
      ],
      group: ['paymentMethod']
    });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
