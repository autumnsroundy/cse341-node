const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
            url: 'https://cse341-node-3tie.onrender.com/contact',
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

function setupSwagger(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;