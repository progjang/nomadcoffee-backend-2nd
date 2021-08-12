import client from "../../client";

export default {
    Query: {
        seeCoffeeshop: (_, {id}) => client.coffeeShop.findUnique({
            where: {id}
        }),
    },
}