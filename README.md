# Everest Dispensary - Hospital Management System

A comprehensive full-stack Hospital Management System built with Node.js/Express backend, React frontend, and MySQL database.

## System Overview

This system manages multiple healthcare departments with specialized workflows:

- **Reception** - Patient registration, appointments, payment confirmation
- **Pharmacy** - Stock inventory, medicine dispensing, historical records
- **Laboratory** - Sample management, test requests, quality management system (ISO compliant)
- **Doctors** - Patient consultations, test requests, results management

## Technology Stack

- **Backend**: Node.js, Express.js, Sequelize ORM
- **Frontend**: React, Redux, Material-UI
- **Database**: MySQL
- **Authentication**: JWT
- **API**: RESTful Architecture

## Project Structure

```
everest-dispensary/
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── migrations/
│   ├── seeders/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── database/
│   └── schemas/
└── docs/
```

## Installation

See backend and frontend README files for detailed setup instructions.
