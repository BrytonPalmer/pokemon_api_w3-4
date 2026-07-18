const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const router = express.Router();

const doc = {
    info: {
        title: 'Pokemon Platinum API',
        description: 'Sinnoh Cards + National Dex API'
    },
    host: process.env.RENDER_EXTERNAL_URL || 'localhost:3030',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index.js'
];

// Generate swagger.json if it doesn't exist
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    // Load the generated file
    const swaggerDocument = require('./swagger.json');

    // Serve Swagger UI
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});

module.exports = router;