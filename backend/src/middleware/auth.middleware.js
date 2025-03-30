const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.cookies;
        if (!accessToken) {
            if (!refreshToken) {
                return res.status(401).json({ message: "You need to login!" });
            }

            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const decodedUser = decoded.user;
            // Generate a new access token
            const newAccessToken = jwt.sign(
                {user: decodedUser },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );

            // Set the new access token as a cookie
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true, // Prevent XSS attacks
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
                sameSite: "strict", // Prevent CSRF attacks
                maxAge: 15 * 60 * 1000, // 15 minutes
            });

            const decodeFromNewAccessToken = jwt.verify(newAccessToken, process.env.ACCESS_TOKEN_SECRET);

            req.user = decodeFromNewAccessToken.user;
            return next();
        }

        // Verify the access token
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong!" });
    }
};


module.exports = { protectRoute };
