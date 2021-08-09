import jwt from "jsonwebtoken";
import client from "../client"

export const checkUser = async (username) => {
    return await client.user.findUnique({
        where: {
            username,
        },
        select: {
            id: true,
        },
    });
}

export const getUser = async(token) => {
    try {
        if(!token){
            return null;
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        const verifiedUser = await client.user.findFirst({
            where: {
                id: decoded.id,
            }
        });
        if(!verifiedUser){
            return null;
        } else{
            return verifiedUser;
        }
    } catch(err) {
        console.log(err);
        return null;
    }

};

export const protectedResolver = (ourResolver) => (
    root,
    args,
    context,
    info
) => {
    if (!context.loggedInUser) {
        const query = info.operation.operation === "query";
        if(query){
            return null;
        } else{
            return {
                ok:false,
                error: "please log in to perform this acton",
            };
        }

    }
    return ourResolver(root, args, context, info);
}