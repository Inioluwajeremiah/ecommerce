import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoute from "./routes/uploadRoute.js";
import { errorHandler, notFound } from "./middleware/errorHandlerMiddleWare.js";
import cors from "cors";
import cookieParser from "cookie-parser";
// security packages
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import helmet from "helmet";

const port = process.env.PORT || 8000;

connectDB();

const app = express();

// body paser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser());

// app.use(cors());

// security tools
app.use(xss());
app.use(hpp());
app.use(helmet());
app.use(mongoSanitize());

// routes
app.use("/v1/api/products", productRoutes); // product route
app.use("/v1/api/users", userRoutes); //user route
app.use("/v1/api/orders", orderRoutes); // order route
app.get("/"),
  (req, res) => {
    res.send("Api is running locally");
    // res.sendFile(path.join(__dirname, "public", "index.html"));
  };
// upload image routes
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/v1/api/upload", uploadRoute);

// PAYPAL API
app.get("/v1/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

// configure build for production
if (process.env.NODE_ENV === "production") {
  // set build folder to a static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that is not api will ne redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/"),
    (req, res) => {
      res.send("Api is running locally");
      // res.sendFile(path.join(__dirname, "public", "index.html"));
    };
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`app is running on port ${port}`));
