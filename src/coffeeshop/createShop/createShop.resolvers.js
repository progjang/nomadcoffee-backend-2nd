import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { createWriteStream } from "fs";

const handlePhotos = (photos, id) =>  {
    let urlList = [];
    photos.map(async (photo) => {
        const {filename, createReadStream} = await photo;
        const newFilename = `${id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
        readStream.pipe(writeStream);
        const url = `http://localhost:4000/static/${newFilename}`;
        urlList.push(url);
    });
    return urlList;
}

const createShopResolverFn = async (_, 
    {name, latitude, longitude, categories, photos}, 
    {loggedInUser}) => {
    
    let photosObj = [];
    if(photos){
        const listPhotoURL = await handlePhotos(photos, loggedInUser.id)
        console.log(listPhotoURL);
        photosObj = listPhotoURL.map((url) => ({
            where: {url}, create:{url}
        }));
    }

    let categoriesObj = [];
    if (categories) {
        const listCategory = categories.split(",").map(item => item.trim());
        categoriesObj = listCategory.map(category => ({
            where: { name: category },
            create: { name: category }
        }));
    }

    console.log(photosObj);
    console.log(categoriesObj);

    return client.coffeeShop.create({
        data: {
            name,
            latitude,
            longitude,
            user: {
                connect: {
                    id: loggedInUser.id,
                },
            },
            ...(photosObj.length > 0 && {
                photos: {
                    connectOrCreate: photosObj,
                }
            }),
            ...(categoriesObj.length > 0 && {
                categories: {
                    connectOrCreate: categoriesObj,
                },
            }),
        },
    });

}

export default {
    Mutation:{
        createShop: protectedResolver(createShopResolverFn)
    }
}