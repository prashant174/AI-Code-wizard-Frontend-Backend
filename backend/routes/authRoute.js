const express=require("express")
const { signUp, checkingUser, logIn, veriyfyOtp, signupWithGoogleOAuth, deleteUser, resendOtp, forgotPassword, resetPassword } = require("../controllers/authController")
const authRouter=express.Router()


authRouter.post("/signup",signUp)
authRouter.post("/googleAuth",signupWithGoogleOAuth)
authRouter.post("/verify-otp",veriyfyOtp)
authRouter.post("/resend-otp",resendOtp)
authRouter.post("/login",logIn)
authRouter.get("/testing",checkingUser)
authRouter.delete("/deleteUser/:id",deleteUser)
authRouter.post("/forgot-password",forgotPassword)
authRouter.post("/reset-password",resetPassword)


module.exports={authRouter}