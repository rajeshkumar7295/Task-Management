const User = require("../models/User");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    try {

        const {
            username,
            email,
            password,

        } = req.body;
        if (!username || !email || !password) {
            return res.send(403).json({
                success: false,
                message: "All fields are required."
            })
        }
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "user already registered."
            })
        }




        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashedPassword,

        })
        return res.status(200).json({
            success: true,
            message: "user registered successfully",
            data: user
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registrered. Please try again",
        })
    }
}

exports.login = async (req, res) => {

    try {


        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again."
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User is not register."
            })
        }
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,

            }
            const token = Jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });
            user.token = token;
            user.password = undefined;

            res.status(200).json({
                success: true,
                user,
                token,
                message: "user LoggedIn successfully."
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "password incorrect."
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, please try again',
        });
    }

}

exports.changePassword = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user?.id);

        const { oldPassword, newPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if (!isPasswordMatch) {

            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" });
        }

        let hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: hashedPassword },
            { new: true }
        );

        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user?.id;
        

        const userDetails = await User.findById({ _id: id });
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "User not found."
            })
        }

        await User.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User delete successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "unable to delete user",
            error: error.message
        })
    }
}