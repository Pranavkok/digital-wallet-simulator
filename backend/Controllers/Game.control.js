import AccountModel from "../Models/Account.js";
import mongoose from "mongoose";

export async function Flip50(req,res) { 
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

        const result = randomNumber ? 'win' : 'loose' ;

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
