import bodyParser from "body-parser";
import express from "express"
import env from "./utils/env";
import router from "./router/api";
import connect from "./utils/database";
import docs from "./docs/route";
import cors from 'cors'


async function init() {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json())

    app.use('/api', router)

    app.get('/', (req, res)=> {
        res.status(200).json({
            massage: 'Server is running'
        })
    })

    docs(app)

    const db = await connect()

    app.listen(env.PORT, () => {
        console.log(db);
        console.log('Server is Running')
    })
}

init()