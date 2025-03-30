const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user.model");
const { generateTokens, storeRefreshToken } = require("../utils/jwtToken");
dotenv.config();

const register = async (req, res, next) => {
    try {
        let registerData = req.body;
        
        // Validate required fields
        if (!registerData.name || !registerData.email || !registerData.password) {
            return res.status(400).json({ success: false, message: "Name, email, and password are required." });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email: registerData.email });
        if (userExists) {
            return res.status(400).json({ success: false, message: `User with the email "${registerData.email}" already exists.` });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(registerData.password, salt);

        // Create new user
        const newUser = new User({
            name: registerData.name,  // Ensure this is correctly referenced
            email: registerData.email,
            phone: registerData.phone,
            grade: registerData.grade,
            password: hashedPassword,
        });

        // Save user
        const insertedUser = await newUser.save();
        if (!insertedUser) {
            throw new Error("Failed to register user.");
        }

        const { password: _, ...insertedUserWithoutPassword } = insertedUser;

        const { accessToken, refreshToken } = await generateTokens(insertedUserWithoutPassword);
        storeRefreshToken(insertedUser, refreshToken)

        res
        .cookie("accessToken", accessToken, {
            httpOnly: true, // prevent XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // prevents CSRF attack
            maxAge: 15 * 60 * 1000, // 15 minutes
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true, // prevent XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // prevents CSRF attack
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200).json({ success: true, message: "User registered successfully.", user: insertedUserWithoutPassword });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res, next) => {
    try {
        const registerData = req.body;
        const email = registerData.email;
        const password = registerData.password;
        // Create an empty User instance to use its find method
        const userInstance = new User({});
        const users = await userInstance.find({ email });
 
        // Check if user exists
        if (users.length === 0) {
            return res.status(400).json({ success: false, message: `User not found.` });
        }
        
        const user = users[0];
        
        // Verify password with bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: `Invalid password.` });
        }
        
        // Password is valid, send success response
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        const { accessToken, refreshToken } = await generateTokens(userWithoutPassword);
        storeRefreshToken(userWithoutPassword, refreshToken)
        
        res
        .cookie("accessToken", accessToken, {
            httpOnly: true, // prevent XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // prevents CSRF attack
            maxAge: 15 * 60 * 1000, // 15 minutes
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true, // prevent XSS attacks
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // prevents CSRF attack
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .status(200).json({ 
            success: true, 
            message: "User logged in successfully.", 
            user: userWithoutPassword 
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const profile = async (req, res, next) => {
    try {
        const { user } = req;
        const existingUser = await new User({}).findById(user.id);
        if (existingUser.length == 0) {
            return res.status(400).json({ success: false, message: "User not found." });
        }
        const { password: _, ...userWithoutPassword } = existingUser
        return res.status(200).json({ success: true, user: userWithoutPassword });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getUserDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        const doesUserExist = await new User({}).findById(id)

        if (doesUserExist.length === 0) {
            return res.status(400).json({ success: false, message: `User not found.` });
        }
        
        const user = doesUserExist[0];
        const { password, ...userWithoutPassword } = user;

        res.status(200).json({ success: true, userWithoutPassword });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({ success: true, message: "User logged out successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { register, login, getUserDetails, profile, logout };
