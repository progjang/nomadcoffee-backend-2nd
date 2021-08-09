import client from "../../client";
import { checkUser, protectedResolver } from "../users.utils";

const followResolverFn = async (_, {username}, {loggedInUser}) => {
    const ok = await checkUser(username);
    if(!ok) {
        return {
            ok: false,
            error: "That user does not exists.",
        }
    }

    await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            followings: {
                connect:{
                    username,
                }
            }
        }
    });
    return {
        ok: true,
    };
}

const unfollowResolverFn = async (_, {username}, {loggedInUser}) => {
    const ok = await checkUser(username);
    if(!ok) {
        return {
            ok: false,
            error: "That user does not exists.",
        }
    }
    await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            followings: {
                disconnect:{
                    username,
                }
            }
        }
    });
    return {
        ok: true,
    };
}

export default {
    Mutation:{
        followUser: protectedResolver(followResolverFn),
        unfollowUser: protectedResolver(unfollowResolverFn),
    }
}