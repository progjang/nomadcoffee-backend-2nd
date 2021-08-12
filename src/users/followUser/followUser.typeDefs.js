import { gql } from "apollo-server-express";

export default gql`
    type Mutation{
        followUser(username: String!): ResolverResult!
        unfollowUser(username: String!): ResolverResult!
    }
`;