var  swaggerJsdoc = require('swagger-jsdoc');
var  swaggerUi = require('swagger-ui-express');
var path=require('path')
const glob = require('glob');



const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Click Survey',
      description: "API endpoints para Aplicación de encuestas",
      contact: {
        name: "Yandry Villagomez Montero",
        email: "yandry75@gmail.com",
        url: "https://github.com/RafaelVillagomezDev"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:3445/",
        description: "Local server"
      },
      {
        url: "<your live url here>",
        description: "Live server"
      },
    ],
    components: {
      schemas: {
        ErrorResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 500
            },
            message: {
              type: 'string',
              example: 'Error interno del servidor'
            }
          }
        },
        ValidationErrorResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 422
            },
            errors: {
              type: 'array',
              items: {
                type: 'string'
              },
              example: ['El campo email es obligatorio', 'La contraseña debe tener al menos 8 caracteres']
            }
          }
        }
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    }
  },
  // looks for configuration in specified directories
  apis: [ path.resolve(__dirname, '../controllers/*.js') ],
}
const swaggerSpec = swaggerJsdoc(options)

console.log(swaggerSpec)
module.exports = { swaggerUi, swaggerSpec };
