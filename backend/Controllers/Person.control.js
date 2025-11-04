import PersonModel from "../Models/Person.js";
import jwt from "jsonwebtoken";
import zod from "zod"
import AccountModel from "../Models/Account.js";
import mongoose from "mongoose";

const signupSchema = zod.object({
    userName : zod.string(),
    firstName : zod.string(),
    lastName : zod.string(),
    password : zod.string()
})

const signinSchema = zod.object({
    userName : zod.string() ,
    password : zod.string() 
})

const UpdateSchema = zod.object({
    firstName : zod.string().optional(),
    lastName : zod.string().optional(),
    password : zod.string().optional()
})

export async function SignUpController(req,res){
    const {userName , firstName , lastName , password} = req.body;

    const {success} = signupSchema.safeParse(req.body)

    if(!success){
        return res.json({
            message : "try different username "
        })
    }

    if(!userName || !firstName || !lastName || !password){
        return res.json({
            message : "Provide the field first ",
            success : false 
        })
    }

    const existingUser = await PersonModel.findOne({
        userName : userName
    })

    if(existingUser){
        return res.json({
            message : "user already exist !",
            error : true ,
            success : false 
        })
    }

    const newUser = new PersonModel({
        userName : userName,
        firstName : firstName,
        lastName : lastName ,
        password : password
    })

    await newUser.save()
    const userId = newUser._id ;

    await AccountModel.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const jwtToken = jwt.sign({
        userId : newUser._id
    },process.env.JWT_SECRET)

    return res.json({
        message : "User registered Successfulyy !",
        success : true ,
        error : false ,
        token : jwtToken 
    })
}

export async function SignInController(req,res){
    const {userName,password} = req.body 

    const {success} = signinSchema.safeParse(req.body)

    if(!success){
        return res.json({
            message : "Invalid Inputs "
        })
    }

    const user = await PersonModel.findOne({
        userName : userName
    })

    if(!user){
        return res.json({
            message : "user doesnot exist",
            success : false ,
            error : true
        })
    }

    const storedPassword = user.password ;
    
    if(password !== storedPassword){
        return res.json({
            message : "Wrong Password !",
            success : false ,
            error : true 
        })
    }

    const jwtToken = jwt.sign({
        userId : user._id
    },process.env.JWT_SECRET)

    return res.status(200).json({
        message : "Sign in Succeed ",
        success : true ,
        error : false,
        token : jwtToken
    })

}

export async function UpdateProfile(req,res){
    // const {success} = UpdateSchema.safeParse(req.body)
    // if(success){
    //     return res.json({
    //         message : "Invalid Inputs ",
    //         success : false ,
    //         error : true 
    //     })
    // }

    const {firstName ,lastName , password} = req.body

    if(password.length < 6){
        return res.status(414).json({
            message : "Password is too short",
            success : true ,
            error : false 
        })
    }

    const user = await PersonModel.updateOne({
        _id : req.userId
    },req.body)

    return res.status(200).json({
        message : "Profile Updated ",
        success : true ,
        error : false 
    })

}

// export async function GetProfile(req,res){
//     const userid = req.userId ;

//     const user = await PersonModel.findById(userid);

//     if(!user){
//         return res.status(404).json({
//             message : "User NOt Found ",
//             success : false ,
//             error : true 
//         })
//     }

//     return res.status.json({
//         message : "user profile fetched successfully",
//         succes : true ,
//         error : false ,
//         data : user 
//     })
// }

export async function bulkProfile(req,res){
    const filter = req.query.filter || ""

    const users = await PersonModel.find(
        {
            $or: [{
                firstName : {
                    "$regex" : filter
                }
            },{
                lastName : {
                    "$regex" : filter 
                }
            }]
        }
    )

    return res.json({
        success :true ,
        user : users.map((u)=>({
            userName : u.userName,
            firstName : u.firstName,
            lastName : u.lastName,
            _id : u._id
        }))
    })
}

export async function getBalance(req,res){
    const userId = req.userId ;

    const account = await AccountModel.findOne({ userId });
    const user = await PersonModel.findById(userId)
    const balance = account ? account.balance : 0

    return res.status(200).json({
        message : "Balance Fetched Successfully !",
        success : true ,
        error : false ,
        balance : balance,
        userName :  user.userName
    })
}

export async function Transfer(req,res){
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        const {to , amount} = req.body ;

        const senderAccount = await AccountModel.findOne({
            userId: req.userId
        }).session(session);

        if(!senderAccount){
            await session.abortTransaction();
            return res.status(404).json({
                message : "Sender account not found",
                success : false ,
                error : true
            })
        }

        if(!senderAccount.balance || senderAccount.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message : "Insufficient Balance",
                success : false ,
                error : true
            })
        }

        const receiverAccount = await AccountModel.findOne({
            userId: to
        }).session(session);

        if(!receiverAccount){
            await session.abortTransaction();
            return res.status(404).json({
                message : "Receiver account not found",
                success : false ,
                error : true
            })
        }

        await AccountModel.updateOne({ userId: req.userId },{
            $inc : { balance : -amount }
        }).session(session)

        await AccountModel.updateOne({ userId: to },{
            $inc : { balance : amount }
        }).session(session)

        await session.commitTransaction();
        session.endSession();

        return res.json({
            message : "Transfer success" ,
            success : true ,
            error : false 
        })
    } catch (error) {
        if(session){
            try { await session.abortTransaction(); } catch {}
            try { session.endSession(); } catch {}
        }
        return res.status(500).json({
            message: error.message || "Transfer failed",
            success: false,
            error: true
        })
    }
}