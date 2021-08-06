import { createWriteStream } from "fs";
import bcrypt from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

const resolverFn = async(_, {username, email, name, location, avatar, githubUsername, password:newPassword}, {loggedInUser}) => {
    console.log(loggedInUser);
    let avatarUrl = null;
    if(avatar){
        const {filename, createReadStream} = await avatar;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFilename}`;
    }

    let uglyPassword = null;
    if(newPassword){
        uglyPassword = await bcrypt.hash(newPassword, 10);
    }
    const updatedUser = await client.user.update({
        where: {
            id: loggedInUser.id,
        },
        data: {
            username,
            email,
            name,
            location,
            githubUsername,
            ...(uglyPassword && {password : uglyPassword}),
            ...(avatarUrl && {avatarURL: avatarUrl})
        },
    });
    if(updatedUser.id){
        return{
            ok: true,
        }
    }
}
export default {
    Mutation: {
        editProfile: protectedResolver(resolverFn),
    }
}