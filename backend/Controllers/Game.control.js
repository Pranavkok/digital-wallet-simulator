import AccountModel from "../Models/Account.js";
import LotteryModel from "../Models/Lottery.js";
import PrizeModel from "../Models/Prize.js";
import PersonModel from "../Models/Person.js";
import mongoose from "mongoose";

export async function Flip50(req,res){ 
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const {amount} = req.body ;
        // const userId = req.userId ;

        if(!amount){
            await session.abortTransaction();
            return res.status(404).json({
                message : "Add a amount !",
                success : false ,
                error : true
            })
        }

        const user = await AccountModel.findOne({
            userId: req.userId
        }).session(session);

        if(!user.balance || user.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message : "Insufficient Balance",
                success : false ,
                error : true
            })
        }

        const randomNumber = Math.floor(Math.random()*101);

        if(randomNumber < 50){
            await AccountModel.updateOne({userId: req.userId},{
                $inc : { balance : -amount }
            }).session(session);
        }
        else{
            await AccountModel.updateOne({userId: req.userId},{
                $inc : { balance : amount }
            }).session(session);
        }

        const result = randomNumber > 50 ? 'win' : 'loss' ;

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            message : "Result Declared !" ,
            success : true ,
            error : false ,
            randomNumber : randomNumber ,
            result : result
        })
    } catch (error) {
        if(session){
            try { await session.abortTransaction(); } catch {}
            try { session.endSession(); } catch {}
        }
        return res.status(500).json({
            message : "server error" ,
            success : false ,
            error : true 
        })
    }
}

export async function BuyLottery(req,res){
    try {
        const userId = req.userId ;

        const user = await AccountModel.findOne({userId : userId});

        if(user.balance < 500){
            return res.status(400).json({
                message : "You Dont have enough balance in your account !",
                success : false ,
                error : true 
            })
        }

        const alreadyBuyed = await LotteryModel.find({userId : userId})

        const d = new Date();
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();

        const date = `${day}-${month}-${year}`;

        let alreadyBuyFlag = false ;

        alreadyBuyed.map((u)=>{
            if(u.date === date){
                alreadyBuyFlag = true ;
            }
        })

        if(alreadyBuyFlag){
            return res.status(400).json({
                message : "You have already purchashed Ticket for Today :)",
                success : false ,
                error : true 
            })
        }

        const pushUserLottery = new LotteryModel({
            userId : userId ,
            date : date
        })

        await pushUserLottery.save()

        await AccountModel.updateOne({userId : userId},{
            $inc : { balance : -500 }
        })

        return res.status(200).json({
            message : "Ticket Buyed Success :)",
            success : true ,
            error : false 
        })

    } catch (error) {
        console.log(error);
    }
}

export async function isBuyedTodayTicket(req,res){
    const userId = req.userId ;

    const d = new Date();
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const date = `${day}-${month}-${year}`;

    const users = await LotteryModel.find({userId : userId});

    let alreadyBuyFlag = false ;

    users.map((u)=>{
        if(u.date == date){
            alreadyBuyFlag = true ;
        }
    })

    if(alreadyBuyFlag){
        return res.status(200).json({
            message : "You have already Buyed Todays Ticket !",
            success : true ,
            error : false ,
            isBuy : true 
        })
    }

    return res.status(200).json({
        message : "Not Buyed Ticket for today yet ",
        success : true ,
        error : false ,
        isBuy : false 
    })
}

export async function findWinners(req,res){
    const d = new Date();
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const date = `${day}-${month}-${year}`;

    const alreadyDone = await PrizeModel.find({date : date});

    if(alreadyDone){
        return res.status(400).json({
            message : "Prize already distributed",
            success : false ,
            error : true 
        })
    }

    const users = await LotteryModel.find({date : date});

    const n = users.length ;

    if(n <= 0){
        return res.json({
            message : "No Participant",
            success : true ,
            error : false 
        })
    }

    const TotalPool = 500 * n ;
    const firstPrize = TotalPool/2 ;
    const remainingPool = TotalPool/2 ;
    const thirdPrize = remainingPool/3 ;
    const secondPrize = remainingPool - thirdPrize ;


    const first = Math.floor(Math.random() * n);
    const second = Math.floor(Math.random() * n);
    const third = Math.floor(Math.random() * n);

    const firstWinnerUserId = users[first].userId ;
    const secondWinnerUserId = users[second].userId ;
    const thirdWinnerUserId = users[third].userId ;

    await AccountModel.updateOne({userId : firstWinnerUserId},{
        $inc : { balance : firstPrize }
    })
    await AccountModel.updateOne({userId : secondWinnerUserId},{
        $inc : { balance : secondPrize }
    })
    await AccountModel.updateOne({userId : thirdWinnerUserId},{
        $inc : { balance : thirdPrize }
    })

    const pushWinners = await PrizeModel.create({
        date : date ,
        winners : {
            first : firstWinnerUserId,
            second : secondWinnerUserId ,
            third : thirdWinnerUserId
        }
    })

    return res.status(200).json({
        message : "reward distributed success" ,
        success : true ,
        error : false ,
        firstWinner : firstWinnerUserId ,
        secondWinner : secondWinnerUserId ,
        thirdWinner : thirdWinnerUserId
    })

}

export async function fetchTodaysWinners(req,res){
    const d = new Date();
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const date = `${day}-${month}-${year}`;

    const prize = await PrizeModel.findOne({date : date});

    if(!prize){
        return res.status(400).json({
            message : "Lottery Not happend yet !",
            success : false ,
            error : true 
        })
    }

    const firstUserid = prize.winners.first ;
    const secondUserid = prize.winners.second ;
    const thirdUserid = prize.winners.third ;

    const firstUser = await PersonModel.findById(firstUserid);
    const secondUser = await PersonModel.findById(secondUserid);
    const thirdUser = await PersonModel.findById(thirdUserid);

    return res.status(200).json({
        message : "Fetch success !",
        success : true ,
        error : false ,
        firstWinner : firstUser ,
        secondWinner : secondUser ,
        thirdWinner : thirdUser
    })
}