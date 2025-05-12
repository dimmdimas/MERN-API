import { Express } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger.output.json';
import fs from 'fs'
import path from 'path';

export default function docs(app: Express) {
    const css = fs.readFileSync(path.resolve(__dirname, "../../node_modules/swagger-ui-dist/swagger-ui.css"), 'utf-8');
    const cssOnline = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput, {
        customCss: cssOnline
    }))
}