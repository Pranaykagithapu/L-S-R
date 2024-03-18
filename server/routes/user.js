import express from 'express'
import bcrypt from 'bcrypt'

const router = express.Router();
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import otpGenerator from 'otp-generator'

// function generateNumericOTP(length) {
//     const chars = '0123456789';
//     return otpGenerator.generate(length, { chars });
// }

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    const user =  await User.findOne({email})
    if(user) {
        return res.json({status: true, message: "user alredy existed"})
    }

    const hashpasssword = await bcrypt.hash(password, 10)
    const newUser = new  User({
        username,
        email,
        password: hashpasssword,
        
    })

    await newUser.save()
    return res.json({status: true, message: "record register"})

})

router.post('/login',async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        return res.json({message: "user is not register"})
    }
    const otp = generateNumericOTP(6);

    // Save the OTP to the user document in the database (optional)
    user.otp = otp;
    await user.save();
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pranayjava05@gmail.com', // Your Gmail email address
            pass: 'blgh pwxa hcrv jqnq' // Your Gmail password or app password if 2-step verification is enabled
        }
    });

    // Compose the email
    const mailOptions = {
        from: 'pranayjava05@gmail.com',
        to: email,
        subject: 'OTP for password reset',
        text: `Your OTP for password reset is: ${otp}`
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.json({ message: "Error sending OTP email" });
        } else {
            // console.log('OTP email sent: ' + info.response);
            return res.json({ status: true, message: "OTP email sent" });
        }
    });
    

    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
        return res.json({message : "password is incorrect"})
    }

    

    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1hr'})
    res.cookie('token', token, {httpOnly: true, maxAge: 360000}) 
    return res.json({status: true, message: "Login sucessfully"})
})

router.post('/otp', async(req, res) => {

    // const {otp} = req.body;
    // const user = await User.findOne({otp})
    
    // if(!user) {
    //     return res.json({message: "user is not register"})
    // }

    // const valid = await bcrypt.compare(password, user.password)
    // if(!validPassword) {
    //     return res.json({message : "password is incorrect"})
    // }

    

    // const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '1hr'})
    // res.cookie('token', token, {httpOnly: true, maxAge: 360000}) 
    // return res.json({status: true, message: "Login sucessfully"})
})

// router.post('/forgot-password', async (req, res) => {
//     const {email} = req.body;
//     try {
//         const user = await User.findOne({email})
//         if(!user) {
//             return res.json({message: "user not registered"})
//         }


//         var transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//               user: 'pranayjava05@gmail.com',
//               pass: 'blgh pwxa hcrv jqnq'
//             }
//           });
          
//           var mailOptions = {
//             from: 'pranayjava05@gmail.com',
//             to: 'pranaykagithapu@gmail.com',
//             subject: 'reset password',
//             text: 'http://localhost:5173/resetPassword/${token}'
//           };
          
//           transporter.sendMail(mailOptions, function(error, info){
//             if (error) {
//             //   console.log(error);
//             return res.json({message: "error sending email"})
//             } else {
//             //   console.log('Email sent: ' + info.response);
//             return res.json({status: true, message: "email sent"})
//             }
//           });



//     }catch(err) {
//         console.log(err)

//     }
// })
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not registered" });
        }

        // Generate a 6-digit OTP
        // const otp = otpGenerator.generate(6, { alphabets: false, specialChars: false });

        const otp = generateNumericOTP(6);

        // Save the OTP to the user document in the database (optional)
        user.otp = otp;
        await user.save();
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'pranayjava05@gmail.com', // Your Gmail email address
                pass: 'blgh pwxa hcrv jqnq' // Your Gmail password or app password if 2-step verification is enabled
            }
        });

        // Compose the email
        const mailOptions = {
            from: 'pranayjava05@gmail.com',
            to: email,
            subject: 'OTP for password reset',
            text: `Your OTP for password reset is: ${otp}`
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return res.json({ message: "Error sending OTP email" });
            } else {
                // console.log('OTP email sent: ' + info.response);
                return res.json({ status: true, message: "OTP email sent" });
            }
        });

    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error" });
    }
});
// Function to generate numeric OTP
function generateNumericOTP(length) {
    let otp = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
}




export {router as UserRouter}