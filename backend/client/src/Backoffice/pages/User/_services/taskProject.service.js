import axios from "axios";

export const TaskProjectService = {
    addTask,
    validate: _validate,
    refuse: _refuse,
    delete: _delete,
};
const uri = process.env.REACT_APP_URI_SERVER


async function addTask(task) {
    let formData = new FormData();
    formData.append("taskName", task.taskName);
    formData.append("project", task.project);
    formData.append("taskDescription", task.taskDescription);
    formData.append("taskAmount", task.taskAmount);
    formData.append("user", task.user);
    console.log(formData);
    return await axios
        .post(uri+"/tasks/add", formData)
        .then((res) => {
            console.log("task project added!");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function _validate(id) {
    const requestOptions = {
        method: "PUT",
    };
    return await fetch(uri+`/tasks/validate/${id}`, requestOptions);
}

async function _refuse(id) {
    const requestOptions = {
        method: "PUT",
    };
    return await fetch(uri+`/tasks/refuse/${id}`, requestOptions);
}

async function _delete(id) {
    const requestOptions = {
        method: "PUT",
    };
    return await fetch(uri+`/tasks/archive/${id}`, requestOptions);
}
