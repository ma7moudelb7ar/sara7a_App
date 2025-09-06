import path from "path"
import dotenv from "dotenv"
dotenv.config({path : path.resolve("./src/config/.env")})
import express from 'express'
import bootstrap from './src/app.controller.js'
import chalk from "chalk";
import "./src/jobs/cleanupJob.js"





const app = express()
const port = process.env.PORT

bootstrap(app,express)



app.listen(port, () => console.log(chalk.italic.blueBright(`Example app listening on port ${port}!`)))



