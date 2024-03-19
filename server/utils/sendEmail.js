import nodemailer from "nodemailer";


// async... await is not allowed in global scope , must use a weapper
const sendEmail = async function (email, subject, message){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP.HOST,
        pass: process.env.SMTP_PORT,
        secure:false, // true for 465, false for other ports
        auth:{
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },

    });

    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL, // SENDER ADDRESS
        to: email,// user email
        subject: subject,// subject line
        html:message, // html body

    });  
};
export default sendEmail;