import client from "../client";

export default {
    CoffeeShop: {
        photos: ({id}) => client.coffeeShop.findUnique({
            where: {id},
        }).photos(),
    }
}