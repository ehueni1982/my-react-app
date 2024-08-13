import { Video } from "../models/Video";
import { db } from "./database";

//Add video
export const addvideo = async (video: Video) => {

    try {
        await  db.addData('videos', video)
         return{
            isSuccess: true,
            message: 'video added successfuly !'
         };

    } catch (error) {
        console.log({error});
        return {
            isSuccess: false,
            error
        };
    }
   

};

//Update
export const updatevideo = async (video: Video) => {

    try {
        await  db.updateData('videos', video)
         return{
            isSuccess: true,
            message: 'video updated successfuly !'
         };

    } catch (error) {
        console.log({error});
        return {
            isSuccess: false,
            error
        };
    }
   

};

//get
export const getvideo = async (_id: number) => {

    try {
        const video = await  db.getData('videos', _id);
         return{
            isSuccess: true,
            result: video,
         };

    } catch (error) {
        console.log({error});
        return {
            isSuccess: false,
            error
        };
    }
   

};

//Get all

export const getAllvideo = async () => {

    try {
        const videos = await  db.getAllData('videos');
         return{
            isSuccess: true,
            results: videos,
         };

    } catch (error) {
        console.log({error});
        return {
            isSuccess: false,
            error
        };
    }
   

};

//Delete

export const deletevideo = async (_id: number) => {

    try {
        await  db.deleteData('videos', _id);
         return{
            isSuccess: true,
            message: 'video deleted successfuly !'
         };

    } catch (error) {
        console.log({error});
        return {
            isSuccess: false,
            error
        };
    }
   

};



