var  swaggerJsdoc = require('swagger-jsdoc');
var  swaggerUi = require('swagger-ui-express');
var path=require('path')

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
    ]
  },
  // looks for configuration in specified directories
  apis: [`${path.join(__dirname,"./controllers*.js")}`],
}
const swaggerSpec = swaggerJsdoc(options)


module.exports = { swaggerUi, swaggerSpec };
