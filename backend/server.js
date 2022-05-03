const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
const eventsRouter = require("./routes/events");
app.use("/events", eventsRouter);

const CommentEventRouter = require("./routes/commentEvent");
app.use("/commentEvent", CommentEventRouter);

/* const usersRouter = require("./routes/users");
app.use("/users", usersRouter); */

const projectsRouter = require("./routes/projects");
app.use("/projects", projectsRouter);

const tasksRouter = require("./routes/tasks");
app.use("/tasks", tasksRouter);

const invoicesProjectRouter = require("./routes/invoiceProject");
app.use("/invoiceProject", invoicesProjectRouter);

const invoicesTaskRouter = require("./routes/invoiceTask");
app.use("/invoiceTask", invoicesTaskRouter);

const complaintProjectRouter = require("./routes/complaintProject");
app.use("/complaintProject", complaintProjectRouter);

const complaintTaskRouter = require("./routes/complaintTask");
app.use("/complaintTask", complaintTaskRouter);

const userRoleRouter = require("./routes/role-user");
app.use("/userRole", userRoleRouter);
const forumsRouter = require("./routes/forum");
app.use("/forums", forumsRouter);
const commentsRouter = require("./routes/comment");
app.use("/comment", commentsRouter);

const imageRouter = require("./routes/image");
app.use("/image", imageRouter);

const paymentRouter = require("./routes/payment");
app.use("/payment",paymentRouter);

const compaignRouter = require("./routes/compaigns");
app.use("/compaigns", compaignRouter);

const categoryRouter = require("./routes/category");
app.use("/category", categoryRouter);

const statisticsEventRouter = require("./routes/statisticsEvent");
app.use("/statis", statisticsEventRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
