import dotenv from "dotenv"

dotenv.config();


export default {
    PORT: process.env.PORT || "",
    DATABASE: process.env.DATABASE || "",
    SECRET: process.env.SECRET || ""
}