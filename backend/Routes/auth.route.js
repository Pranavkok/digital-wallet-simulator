import {Router} from "express"
import { SignInController, SignUpController, UpdateProfile, bulkProfile, getBalance } from "../Controllers/Person.control.js";
import auth from "../Utils/auth.js";

const authrouter = Router();

authrouter.post("/signup",SignUpController);
authrouter.post("/signin",SignInController);
authrouter.put("/update",auth , UpdateProfile);
authrouter.get("/bulk",bulkProfile);

export default authrouter