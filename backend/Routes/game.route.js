import {Router} from 'express';
import auth from "../Utils/auth.js";
import { BuyLottery, Flip50, fetchTodaysWinners, findWinners, isBuyedTodayTicket } from '../Controllers/Game.control.js';

const gameRouter = Router();

gameRouter.post('/flip',auth,Flip50);
gameRouter.post('/lottery',auth,BuyLottery);
gameRouter.post('/isLotteryBuyed',auth,isBuyedTodayTicket);
gameRouter.get('/findWinners',findWinners);
gameRouter.get('/fetch-today-winners',fetchTodaysWinners);

export default gameRouter ;