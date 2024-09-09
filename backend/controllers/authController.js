const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { User } = require("../Model/userModel")
const {sendOtpMail}=require('../nodemailer/nodeMailer')
require("dotenv").config()

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

const signUp=async(req,res)=>{
    const {name,email,password}=req.body

    try{

        const existingUser= await User.findOne({email})
        // console.log(existingUser)
        if(existingUser){
            return res.status(200).send({msg:"user already exists"})
        }
        bcrypt.hash(password,6, async function(err,hash){
            if(err){
                return res.status(400).send({msg:"something went wrong try again"})
            }

            const otp = generateOTP();
            const otpExpires = Date.now() + 10 * 60 * 1000;
            try {
               await sendOtpMail(email,otp)
            
            const user=new User({
                name,
                email,
                password:hash,
                otp,
                otpExpires
            })
            await user.save()
            
            return res.status(201).send({msg:"OTP sent Successfully"})
            } catch (error) {
                return res.status(400).send({ msg: error.message });
            }

        })
       

    }
    catch(err){
        // console.log(err)
        res.status(500).send({ msg:"something went wrong try again"})
    }
}

const signupWithGoogleOAuth=async(req,res)=>{
    const {name,email,password}=req.body
    // console.log('datatesting',name,email,password)
    try {
        const existingUser= await User.findOne({email})

        if(existingUser){
            return res.status(200).send({msg:"user already exists"})
        }

        bcrypt.hash(password,6, async function(err,hash){
            if(err){
                return res.status(400).send({msg:"something went wrong try again"})
            }

           
            
           
            
            const user=new User({
                name,
                email,
                password:hash,
                otp : undefined,
                otpExpires : undefined,
                isVerified : true,
                
            })

           
            await user.save()

            const user1= await User.findOne({email})
            // console.log(user1,"existsinguser")

            if (!user1.isVerified) {
                return res.status(400).json({ msg: 'User not verified' });
              }
            const isMatch=await bcrypt.compare(password, user1.password)

            if(!isMatch){
                return res.status(200).send({msg:"invalid credentials"})
            }
            const token=jwt.sign({userId:user._id,name:user.name,email:user.email},process.env.JWT_SECRET, {expiresIn:"1d"})
            return res.status(201).send({msg:"Google OAuth successfull",token:token})
           

        })
       


    } catch (error) {
        // console.log(err)
        res.status(500).send({ msg:"something went wrong try again"})
    }
}

const veriyfyOtp=async(req,res)=>{
     const {email,otp}=req.body
     try {
        let user = await User.findOne({ email });

        if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
          return res.status(400).json({ msg: 'Invalid or expired OTP' });
        }
    
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        res.status(200).json({ msg:'OTP verify success' });
     } catch (error) {
        res.status(500).send({ msg:"something went wrong try again"})
     }
}

const logIn=async(req,res)=>{
    const {email,password}=req.body
    try{
        const user =await User.findOne({email})
     
        
        if(!user){
            return res.status(200).send({msg:'user not found'})
        }
        if (!user.isVerified) {
            return res.status(200).json({ msg: 'User not verified' });
          }
        const isMatch=await bcrypt.compare(password, user.password)
        // console.log(isMatch)
        if(!isMatch){
            return res.status(200).send({msg:"invalid credentials"})
        }
        const token=jwt.sign({userId:user._id,name:user.name,email:user.email},process.env.JWT_SECRET, {expiresIn:"1d"})
        res.status(200).send({msg:"login successfull",token:token})
       
        }
        catch(err){
            console.log(err)
            res.status(500).send({ msg:"something went wrong try again"})
        }
}

const checkingUser=async(req,res)=>{
    let data= await User.find()
    res.status(200).send({data:data})
}

const deleteUser=async(req,res)=>{
    const {id}=req.params
    // console.log('getting id',id)
    try {
        const deleteUser=await User.findByIdAndDelete(id)
        res.status(200).send({msg:'Account Deleted Successfully',deleteUser:deleteUser})
    } catch (error) {
        res.status(500).send({ msg:"something went wrong try again"})
    }
}

const resendOtp = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      const otp = generateOTP();
      const otpExpires = Date.now() + 10 * 60 * 1000;
      await sendOtpMail(email, otp);
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
      res.status(200).json({ msg: 'OTP sent successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Something went wrong, try again' });
    }
  };

  const forgotPassword = async (req, res) => {
    const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;
    await sendOtpMail(email, otp);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    res.status(200).json({ msg: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).send({ msg: 'Something went wrong, please try again' });
  }
  };
  
  const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    bcrypt.hash(newPassword, 6, async function (err, hash) {
      if (err) {
        return res.status(400).send({ msg: 'Something went wrong, please try again' });
      }

      user.password = hash;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res.status(200).json({ msg: 'Password reset successfully' });
    });
  } catch (error) {
    res.status(500).send({ msg: 'Something went wrong, please try again' });
  }
  };
 

module.exports={
    signUp,
    signupWithGoogleOAuth,
    veriyfyOtp,
    logIn,
    checkingUser,
    deleteUser,
    resendOtp,
    forgotPassword,
    resetPassword
    
}