import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adRoute from "./routes/ad.route.js";
import authRoute from "./routes/auth.route.js";
import serviceRoute from"./routes/service.route.js";
import mailRoute from './routes/mail.route.js'
import userRoute from './routes/user.route.js'
import contactRoute from './routes/contact.route.js'
import reportRoute from './routes/report.route.js'
import coverRoute from './routes/cover.route.js'
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();
mongoose.set("strictQuery", false);

const connect = async () => {
  try {
   const conn = await mongoose.connect(process.env.MONGO);
    console.log(`Connected to mongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// origin: ["http://localhost:3000", "http://localhost:3001", "https://shampy.online" ],
// const corsOptions = {
//   origin: ["https://shampy.vercel.app/", "https://shampy-admin.vercel.app/"],
//   credentials: true,
// };

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/posts", adRoute);
app.use("/api/service", serviceRoute);
app.use("/api/mail", mailRoute);
app.use("/api/cover", coverRoute);
app.use("/api/user", userRoute);
app.use("/api/report", reportRoute);
app.use("/api/contact", contactRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  connect();
  console.log(`Backend server is running on: ${PORT}`);
});
