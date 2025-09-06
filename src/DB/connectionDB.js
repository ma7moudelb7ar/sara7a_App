
import mongoose from "mongoose";
import chalk from "chalk";

const checkConnectionDB =async ()=> {
    await mongoose.connect(process.env.DB_URL).then(() => {
        console.log(chalk.italic.greenBright("success to connect db.................✌❤ "));
    }).catch((error) => {
        console.log(chalk.redBright("fail to connect DB ...........🤦‍♂️😒") ,error);
    })
}


export default checkConnectionDB