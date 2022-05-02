import axios from "axios";

export const TaskProjectService = {
    addTask,
    validate: _validate,
    refuse: _refuse,
    delete: _delete,
};

async function addTask(task) {
    let formData = new FormData();
    formData.append("taskName", task.taskName);
    formData.append("project", task.project);
    formData.append("taskDescription", task.taskDescription);
    formData.append("taskAmount", task.taskAmount);
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

function _validate(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(`http://localhost:5000/tasks/validate/${id}`, requestOptions);
}

function _refuse(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(`http://localhost:5000/tasks/refuse/${id}`, requestOptions);
}

function _delete(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(`http://localhost:5000/tasks/archive/${id}`, requestOptions);
}
