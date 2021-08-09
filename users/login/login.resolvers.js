import client from "../../client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async(_, {username, password}) => {
            const user = await client.user.findUnique({
                where: {
                    username,
                },
            });
            console.log("user.id: " + user.id);
            if(!user.id){
                return {
                    ok: false,
                    error: "User not found."
                };
            }
            const passwordOk = await bcrypt.compare(password, user.password);
            if(!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password",
                }
            }
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            console.log("generated:" + token);
            return {
                ok: true,
                token,
            }
        },
    },
};