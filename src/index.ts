import bodyParser from "body-parser";
import express from "express"
import env from "./utils/env";
import router from "./router/api";
import connect from "./utils/database";

async function init() {
    const app = express();

    app.use(bodyParser.json())

    app.use('/api', router)

    const db = await connect()

    app.listen(env.PORT, () => {
        console.log(db);
        console.log('Server is Running')
    })
}

init()