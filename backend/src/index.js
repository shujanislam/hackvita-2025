const dotenv = require("dotenv");
const connectDB = require("./config/pgsqlDb");
const app = require("./app.js");
// const Redis = require("ioredis");

process.on("uncaughtException", (err) => {
    console.error(`Error: ${err.message}`);
    console.error(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

dotenv.config();

// const redis = new Redis({
//     host: process.env.REDIS_HOST || "127.0.0.1",
//     port: process.env.REDIS_PORT || 6379,
// });

// redis.on("connect", () => {
//     console.log("Connected to Redis successfully.");
// });

// redis.on("error", (err) => {
//     console.error(`Redis error: ${err.message}`);
//     reconnectRedis();
// });

// const reconnectRedis = () => {
//     console.log("Attempting to reconnect to Redis...");
//     setTimeout(() => {
//         redis.connect().catch((err) => {
//             console.error(`Failed to reconnect to Redis: ${err.message}`);
//             reconnectRedis();
//         });
//     }, 5000); // Retry connection every 5 seconds
// };

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Test API
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "Welcome to Hackvita!" });
});

const start = () => {
    connectDB();

    const server = app.listen(PORT, HOST, () => {
        console.log(`App listening at http://${HOST}:${PORT}`);
    });

    process.on("unhandledRejection", (err) => {
        console.error(`Error: ${err.message}`);
        console.error(`Shutting down the server due to Unhandled Promise Rejection`);

        server.close(() => {
            process.exit(1);
        });
    });
};

start();

// module.exports = redis;
