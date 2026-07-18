const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Pokemon Platinum API',
        description: 'Sinnoh Cards + National Dex API'
    },
    host: 'localhost:3030',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = [
    './routes/index.js',
    './routes/sinnohRoutes.js',
    './routes/nationalDexRoutes.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);
