import {Router} from 'express';
import auth from "../Utils/auth.js";
import { Flip50 } from '../Controllers/Game.control.js';

const gameRouter = Router();

gameRouter.post('/flip',auth,Flip50);

export default gameRouter ;