import Course from "../models/course.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from 'fs/promises';

const getAllCourse = async function (req, res, next){
try{
    const getAllCourse = await Course.find({}). select('-lecture');
    
    res.status(200).json({
        success:true,
        message: 'All course',
        courses,
    });
}catch(e) {
    return next(
        new AppError(e.message, 500)
    )
}

}

const getLecturesByCourseId= async function(req, res, next){
    try{
        const {id} = req.params;
        console.log('Course Id>',  id);

        const course = await course.findById(id);
        console.log('Course Details>',  course);

        if (!course){
            return next(
                new AppError('Invalid Course id', 400)
            )
        }

        res.status(200).json({
            success:true,
            message:'Course lecture fetched successfully',
            lectures: course.lectures
        })

    }catch(e) {
    return next(
        new AppError(e.message, 500)
    )
}
}

const createCourse = async(req,res, next) =>{
    const {title, Description, category, createdBy} = req.body;
    console.log("title and all:", title, Description, category,createdBy);

    if (!title|| !Description|| !category|| !createdBy){
        return next(
            new AppError('All fields are required', 400)
        )
    }  
    
    const course = await Course.create({
        title, 
        Description, 
        category, 
        createdBy,
        thumbnail:{
            public_id:"dummy",
            secure_url:"dummy"
        }
    })
    console.log("course created. ", course);

    if (!course){
        return  next(
            new AppError ('Course could not created, please try again', 500)
        )
    }

    if (req.file){
        try{
           const result = await cloudinary.v2.uploader.upload(req.file.path, {
               folder: 'lms'

            });

            if (result){
                course.thumbnail.public_id = result.public_id;
                course.thumbnail.secure_url = result.secure_url;
            } 

            fs.rm(`uploads/${req.file.filename}`);
        } catch(e){
            return next (
                new AppError(e.message,500)
            )
        }    
    }
    await course.save();

    res.status(200).json({
        success: true,
        message: 'Course created successfully',
        course,
    });

}

const updateCourse= async(req, res, next) =>{
    try {
        const { id } = req.params;
        const course = await Course.findByIdAndUpdate(
            id,
            {
                $set: req.body 
            },
            {
                runValidators: true 
            }
        );

        if (!course) {
            return next (
                new AppError('Course with given id does not exist', 500)
            )
        }

        res.status(200).json ({
            success: true,
            message: 'Course update succesfully!',
            course
        })

    }catch(e) {
        return next (
            new AppError(e.message, 500)
        )
    }
}

const removeCourse = async(req, res, next) =>{
    try{
        const { id } = req.params;
        const course = await Course.findById(id);

        if (!course){
            return next (
                new AppError('Course with given id does not exit', 500)
            )
        }

        await Course.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message: 'Course deleted successfully'
        })

    }catch(e){
        return next (
            new AppError(e.message, 500)
        )
    }
}

const addLectureToCourseById = async (req, res, next) =>{
    try {
        const {title, description} = req.body;
    const {id} = req.params;

    if (!title|| !description){
        return next(
            new AppError('All fields are required', 400)
        )
    }

    const course=await Course.findById(id);

    if (!course){
        
        return next (
            new AppError('Course with given id does not exist', 500)
        )
        
    }
    const lectureData = {
        title,
        description,
        lecture: {}
    };   

    if (rq.file){
        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms'
 
            });
 
            if (result){
                lectureData.lecture.public_id = result.public_id;
                lectureData.lecture.secure_url = result.secure_url;
            } 
 
             fs.rm(`uploads/${req.file.filename}`);
        } catch(e){
            return next (
                new AppError(e.message,500)
            )
        }    
    }

    course.lectures.push(lectureData);

    course.numberOfLecture = course.lectures.length;

    await course.save();

    res.status(200).json({
        success:true,
        message:'Lecture successfully added to the course',
        course
    })
    
    } catch (e) {
        return next (
            new AppError(e.message, 500)
        )
        
    }

}   
export{
    getAllCourse,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById
}