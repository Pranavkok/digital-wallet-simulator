import AccountModel from "../Models/Account.js";
import LotteryModel from "../Models/Lottery.js";
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

        alreadyBuyed.map((u)=>{
            if(u.date === date){
                return res.status(400).json({
                    message : "You have already purchashed Ticket for Today :)",
                    success : false ,
                    error : true 
                })
            }
        })

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

    users.map((u)=>{
        if(u.date ==date){
            return res.status(200).json({
                message : "You have already Buyed Todays Ticket !",
                success : true ,
                error : false ,
                isBuy : true 
            })
        }
    })

    return res.status(200).json({
        message : "Not Buyed Ticket for today yet ",
        success : true ,
        error : false ,
        isBuy : false 
    })
}

