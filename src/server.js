require("dotenv").config();
import express from "express";
import {GraphQLUpload} from "graphql-upload";
import { ApolloServer } from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import { getUser } from "./users/users.utils";
import {graphqlUploadExpress} from "graphql-upload";

const PORT = process.env.PORT;


async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({
        resolvers,
        typeDefs,
        playground: true,
        introspection: true,
        context: async({req}) => {
            return {
                    loggedInUser: await getUser(req.headers.token),
            };
        }
    });
    
    const app = express();
    app.use("/static", express.static("uploads"));
    await server.start();
      // This middleware should be added before calling `applyMiddleware`.
    app.use(graphqlUploadExpress());
    server.applyMiddleware({app});
    
    app.listen({port : PORT}, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startApolloServer(typeDefs, resolvers);

// server
//     .listen(PORT)
//     .then(() => console.log(`Server is running on http://localhost:${PORT}/`));