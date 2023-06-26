const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require('axios');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger/swagger-options')
const morgan = require('morgan');

// Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// Middleware
// app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', postRoutes);

module.exports = app
