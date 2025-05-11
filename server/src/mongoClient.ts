import mongoose, { ConnectOptions } from "mongoose";

// MongoDB setup
mongoose.connect(
  `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/assignment?retryWrites=true&w=majority`
);

const taskSchema = new mongoose.Schema({ task: String });
const Task = mongoose.model("assignment_raunak", taskSchema);

export { Task };
