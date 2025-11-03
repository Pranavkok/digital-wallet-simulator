import jwt from "jsonwebtoken";

const auth = (req,res,next)=>{
    const authHeader = req.headers.authorization ;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)

        if(decode.userId){
            req.userId = decode.userId
        }

        next()
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}

export default auth