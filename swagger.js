const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');

//swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Contacts API',
        version: '1.0.0',
        description: 'API documentation for Contacts project',
    },
    servers: [
        {
            url: 'https://cse341-node-3tie.onrender.com',
            description: 'production server',
        },
    ],
};

// options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: ['./routes/contact.js'],
};

//initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Write swagger.json to project root
fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2), 'utf-8');

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;