import { model, Schema } from "mongoose";

const courseSchema = new Schema({
    title:{
        type:String, 
        required: [true, 'Title is required'],
        minLength:[8, 'Title is required'],
        maxLength:[59, 'Title should be less than 60 characters'],
        trim: true,
    },

    Description: {
        type:String,
        required: [true, 'Description is required'],
        minLength:[8, 'Description is required'],
        maxLength:[200, 'Description should be less than 200 characters'],
    },
    category:{
        type:String,
        required: [true, 'Category is required'],
    },

    thumbnail:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String,

        }
    },
    lectures:[
        {
            title: String,
            Description: String,
            lectures:{
                public_id:{
                    type:String,
                    required: true
                },
                secure_url:{
                    type:String,
                    required: true
                }
            }
        }
    ],
    numberOfLecture:{
        type:Number,
        default: 0,
    },
    createdBy:{
        type:String,
        required: true
    }
}, {
    timestamps:true
});

const Course = model('Course', courseSchema);

export default Course;


