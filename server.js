require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import {getUser} from "./users/users.utils";

const PORT = process.env.PORT;

async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({
        resolvers,
        typeDefs,
        context: async({req}) =>{
            return {
                loggedInUser: await getUser(req.headers.token),
            };
        },
    });
    
    const app = express();
    app.use("/static", express.static("uploads"));
    await server.start();
    server.applyMiddleware({app});
    
    app.listen({port : PORT}, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startApolloServer(typeDefs, resolvers);

// server
//     .listen(PORT)
//     .then(() => console.log(`Server is running on http://localhost:${PORT}/`));