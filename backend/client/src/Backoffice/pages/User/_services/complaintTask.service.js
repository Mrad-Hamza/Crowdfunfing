import axios from "axios";

export const ComplaintTaskService = {
    addComplaint,
    delete: _delete,
    activate: _activate,
    validate: _validate,
};

const uri = process.env.REACT_APP_URI_SERVER

async function addComplaint(complaint) {
    let formData = new FormData();
    formData.append("complaintTaskTitle", complaint.complaintTaskTitle);
    formData.append("task", complaint.task);
    formData.append("complaintDescription", complaint.complaintDescription);
    formData.append("user", complaint.user);
    console.log(formData);
    return await axios
        .post(uri+"/complaintTask/add", formData)
        .then((res) => {
            console.log("complaint task added!");
        })
        .catch((err) => {
            console.log(err);
        });
}

function _activate(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/complaintTask/activate/${id}`, requestOptions);
}

function _delete(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/complaintTask/archive/${id}`, requestOptions);
}

function _validate(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/complaintTask/validate/${id}`, requestOptions);
}
