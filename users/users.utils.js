import jwt from "jsonwebtoken";
import client from "../client"


export const getUser = async(token) => {
    try {
        if(!token){
            return null;
        }
        const {id} = await jwt.verify(token, process.env.SECRET_KEY);
        console.log("getUser id is " + id);

        const verifiedUser = await client.user.findFirst({
            where: {
                id
            }
        });
        if(!verifiedUser){
            return null;
        } else{
            console.log("444");
            return verifiedUser;
        }
    } catch {
        console.log("555");
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