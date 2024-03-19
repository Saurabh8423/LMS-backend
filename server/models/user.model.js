import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new Schema({
    fullName: {
        type: 'String',
        required: [true, 'Name  is required'],
        minLength:[5, 'Name must be at least 5 character'],
        macxLength:[50, 'Name must be less than 50 character'],
        lowercase: true,
        trim: true,

    },
    email: {
        type: 'String',
        required: [true, 'Email  is required'],
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: 'String',
        required: [true, 'Password  is required'],
        minLength:[8, 'Password must be at least 8 character'],
    },
    avtar: {
        public_id : {
            type: 'String'
        },
        secure_url:{
            type:'String'
        }
    },
    role: {
        type: 'String',
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },

     forgotPasswordToken: String,
     forgotPasswordExpiry: Date,
     subscription:{
        id: String,
        status: String
    }

}, {
    timestamps: true
 
});

userSchema.pre('save', async function(next){
    if (!this.isDirectModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.generateJWTToken= function(){
    return jwt.sign (
    {
        id: this._id, 
        email: this.email, 
        subscription: this.subscription, 
        role: this.role,
    },    
    process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXPIRY,
    }

   )}
    
userSchema.methods.comparePassword = async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword, this.password);
 }

userSchema.methods.generatePasswordResetToken = async function(){
    const resetToken = crypto.randomBytes(20).ToString('hex');
    this.forgotPasswordToken =crypto.createhash('sha256').update(resetToken).digest('hex')
    this.forgotPasswordExpiry = Date.m=now() + 15*60*1000; // 15min from now
    return resetToken;

}



const User = model ('User' , userSchema);

export default User;
