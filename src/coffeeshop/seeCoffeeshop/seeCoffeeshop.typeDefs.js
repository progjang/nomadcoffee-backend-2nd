import { gql } from "apollo-server-express";

export default gql`
    type Query {
        seeCoffeeshop(id: Int!): CoffeeShop,
        seeCoffeeshops(lastId: Int): [CoffeeShop]
    }
`;