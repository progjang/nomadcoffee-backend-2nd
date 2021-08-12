import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation:{
        createAccount: async(_,{username,
            email,
            name,
            password,
            location,
            avatarURL,
            githubUsername}) => {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {username},{email}
                        ],
                    },
                });
                console.log(existingUser);
                if(existingUser){
                    return {
                        ok: false,
                        error: "username/email already taken."
                    }
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                console.log(uglyPassword);
                await client.user.create({
                    data:{
                        username,
                        email,
                        name,
                        password:uglyPassword,
                        location,
                        avatarURL,
                        githubUsername
                    }
                });
                return {
                    ok: true
                }
            }
    },
}
