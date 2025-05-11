import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";

const app = express();
const serverPort = process.env.SERVER_PORT;

//                                       DEV only
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "PUT", "POST"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//                                       Middleware
// check if needed
app.use(express.json());

app.use(cors(corsOptions));
app.use("/", router);

app.listen(serverPort, () => {
  console.log(`Server live on port ${serverPort}`);
});
