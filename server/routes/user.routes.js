import { Router } from "express";
// import multer from "multer";
import { changedPassword, forgotPassword, getProfile, login, logout, register, resetPassword, updateUser } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

// Configure multer for file uploads
// const storage = multer.memoryStorage(); // You can configure this according to your needs
// const upload = multer({ storage: storage });

router.post('/register', upload.single("avatar"), register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', isLoggedIn, getProfile);
router.post('/reset', forgotPassword);
router.post('/reset/:resetToken', resetPassword);
router.post('/change-password', isLoggedIn, changedPassword);
router.put('/update', isLoggedIn, upload.single("avatar"), updateUser)

export default router;
