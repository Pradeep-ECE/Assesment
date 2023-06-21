var swagger = require('swagger-ui-express');
var swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        "securityDefinitions": {
            "basicAuth": {
                "description": '',
                "type": 'basic',
                "name": 'Authorization',
                "in": 'header',
            },
            "Bearer Authorization": {
                "description": 'Enter JWT Bearer token **_only_**',
                "type": 'apiKey',
                "name": 'Authorization',
                "in": 'header',
            }
        },
        "info": {
            "title": "Zenbasket API",
            "description": "This is a sample Zenbasket API.The Zenbasket API is organized around REST. Our API has predictable resource-oriented URLs, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.",
            "contact": {
                "email": "admin@centizen.com"
            },
        
            "consumes": [
                "application/json"
            ],
            "produces": [
                "application/json"
            ],
            "version": "1.0.0",

        },
    },
    apis: ['./swaggerDoc/shippingController.yaml'],
}
const swaggerDoc = swaggerJSDoc(swaggerOptions);
app.use('/phase2/swagger', swagger.serve, swagger.setup(swaggerDoc));


