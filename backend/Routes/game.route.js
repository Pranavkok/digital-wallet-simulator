import {Router} from 'express';
import auth from "../Utils/auth.js";
import { BuyLottery, Flip50 } from '../Controllers/Game.control.js';

const gameRouter = Router();

gameRouter.post('/flip',auth,Flip50);
gameRouter.post('/lottery',auth,BuyLottery);

export default gameRouter ;