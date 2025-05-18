import swaggerAutogen from "swagger-autogen";

//output, endpointfile, doc
const outputFile = "./swagger.output.json";
const endPointFile = ["../router/api.ts"]

const doc = {
    info: {
        version: '1.0',
        title: 'Doc API MERN Acara',
        description: 'API MERN Acara'
    },
    servers: [
    {
        url: 'http://localhost:3000/api',
        description: 'Local Host'
    },
    {
        url: 'https://mern-api-kappa.vercel.app/api',
        description: 'Vercel'
    }],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            }
        },

        schemas: {
            RegisterRequest: {
              fullName: 'TOMAT',
              username: "Tomat-Admin",
              email: 'tomat-admin@yopmail.com',
              password: 'Tomat123123',
              confirmPassword: 'Tomat123123'
            },
            LoginRequest: {
                identifier: "Tomat-Admin",
                password: "Tomat123123"
            },
            ActivationRequest: {
                code: 'abc'
            }
        }
    }
    
}

swaggerAutogen({ openapi: "3.0.0"})(outputFile, endPointFile, doc)