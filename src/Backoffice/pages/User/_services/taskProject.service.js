import axios from "axios";

export const TaskProjectService = {
    addTask,
};

async function addTask(task) {
    let formData = new FormData();
    formData.append("taskName", task.taskName);
    formData.append("project", task.project);
    formData.append("taskDescription", task.taskDescription);
    formData.append("user", task.user);
    console.log(formData);
    return await axios
        .post("http://localhost:5000/tasks/add", formData)
        .then((res) => {
            console.log("task project added!");
        })
        .catch((err) => {
            console.log(err);
        });
}
