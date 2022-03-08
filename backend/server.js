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


const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter);


const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const projectsRouter = require("./routes/projects");
app.use("/projects", projectsRouter);

const tasksRouter = require("./routes/tasks");
app.use("/tasks", tasksRouter);

const invoicesProjectRouter = require("./routes/invoiceProjects");
app.use("/invoicesProject", invoicesProjectRouter);

const userRoleRouter = require("./routes/role-user");
app.use("/userRole", userRoleRouter);

const imageRouter = require("./routes/image");
app.use("/image", imageRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Server is running on port: ${port}`);
});
