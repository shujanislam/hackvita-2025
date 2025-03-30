const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth.route.js");
const roadmapRouter = require("./routes/roadmap.route.js");

dotenv.config();
const app = express();

const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            `http://${process.env.HOST || 'localhost'}:5173`,
        ];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.set('trust proxy', 1);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:false}));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/roadmap", roadmapRouter);


module.exports = app;

