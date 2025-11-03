import {Router} from "express"
import {Transfer, getBalance } from "../Controllers/Person.control.js";
import auth from "../Utils/auth.js";

const accrouter = Router();

accrouter.get("/balance",auth,getBalance)
accrouter.post("/transfer",auth,Transfer)

export default accrouter