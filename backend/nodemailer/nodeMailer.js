const nodemailer=require('nodemailer')
require('dotenv').config()


const sendOtpMail=async(email, otp)=>{
    const auth=nodemailer.createTransport({
      service:"gmail",
      secure:true,
      port:465,
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      }
    })
    const reciver={
      from:process.env.EMAIL_USER,
      to:email,
      subject:'Welcome to AI Code Wizard',
      text:`Your secret OTP code is ${otp} `
    };
    try {
      await auth.sendMail(reciver);
      return 'success';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send OTP email. Please check the email address and try again.');
    }
    // auth.sendMail(reciver,(err,res)=>{
    //   if(err) {
    //     console.log('error in email') }else{
    //       console.log('success')
    //       // return 'success'
    //       res.end()
    //     }
      
    // })
  }


  // const checking=async(req,res)=>{
  //   // let data= await User.find()
  //   const {email,otp}=req.body
  //   sendOtpMail(email,otp)
  //   res.status(200).send({data:'workingggg kar rha bhai'})
// }
  module.exports={
   sendOtpMail
  }