const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const router = express.Router();
 
const doc = {
    info: {
        title: 'Pokemon Platinum API',
        description: 'Sinnoh Cards + National Dex API'
    },
    host: process.env.NODE_ENV === 'production'
        ? 'pokemon-api-w3-4.onrender.com'
        : 'localhost:3030',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']
};
 
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];
 
// Regenerates swagger.json every time the server starts
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    // Load the generated file
    const swaggerDocument = require('./swagger.json');
 
    // Serve Swagger UI
    router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});
 
module.exports = router;