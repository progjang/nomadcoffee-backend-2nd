import client from "../../client";
import { checkUser } from "../users.utils";

export default {
    Query: {
        seeUser: async (_, {username}) => {
            const ok = await checkUser(username);
            if(!ok) {
                return null;
            }
            return await client.user.findUnique({
                where: {
                    username,
                },
            });
        },
    },
}