import express, { Application } from "express"
import dotenv from "dotenv";
import { mainApp } from "./mainApp";

const readPort = process.env.MY_PORT;
const port: number = parseInt(readPort!);

const app: Application = express()

mainApp(app);

const server = app.listen(process.env.PORT || port, ()=> {
    db();
})
