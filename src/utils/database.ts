import mongoose from "mongoose";
import env from "./env";

export default function connect() {
    mongoose.connect(env.DATABASE, {
        dbName: "Alone"
    });

    return Promise.resolve("Database Connect")
}