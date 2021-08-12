import client from "../client";

export default {
    Query:{
        seeProfile: (_, {username}) => client.user.findUnique({
            where: {
                username
            }
        })
    },

    User:{
        followings: ({id}, {lastId}) => client.user
        .findUnique({ where: {id}}).followings({
            take: 5,
            skip: lastId? 1: 0,
            ...(lastId && {cursor: {id: lastId}}),
        }),

        followers: ({id}, {lastId}) => client.user
        .findUnique({ where: {id}}).followers({
            take: 5,
            skip: lastId? 1: 0,
            ...(lastId && {cursor: {id: lastId}}),
        }),
    },

}