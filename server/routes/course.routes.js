import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourse, getLecturesByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";
import { authorizeSubscriber, authorizedRoles, isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

router.route('/')
    .get(getAllCourse)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse
    );
    

router.route('/:id') 
    .get(isLoggedIn, authorizeSubscriber, getLecturesByCourseId)
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        updateCourse
        )
    .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        removeCourse
        )
        .post(
            isLoggedIn,
            authorizedRoles('ADMIN'),
            upload.single('lecture'),
            addLectureToCourseById
    
        );

export default router;