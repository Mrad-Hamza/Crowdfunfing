import axios from "axios";

export const projectService = {
    register,
    addProject,
    UpdateProject,
    getproject,
    UpdateComment,
    updateAmount,
};
const uri = process.env.REACT_APP_URI_SERVER

async function getproject(id) {
    return await axios
        .get(uri+"/projects", id)
        .then((res) => {
            console.log("project added!");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function addProject(project) {
    let formData = new FormData();
    formData.append("projectName", project.projectName);
    formData.append("projectDescription", project.projectDescription);
    formData.append("projectCollectedAmount", project.projectCollectedAmount);
    formData.append("compaign", project.compaign);
    formData.append("image", project.image);
    formData.append("user", project.user);
    formData.append("userMail", project.userMail);
    console.log(formData);
    console.log(project.userMail);
    return await axios
        .post(uri+"/projects/add", formData)
        .then((res) => {
            console.log("project added!");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function UpdateProject(project) {
    let formData = new FormData();
    formData.append("id", project.id);
    formData.append("projectName", project.projectName);
    formData.append("projectDescription", project.projectDescription);
    formData.append("projectCollectedAmount", project.projectCollectedAmount);
    formData.append("image", project.image);
    console.log(formData);
    return await axios
        .put(uri+"/projects/update", formData)
        .then((res) => {
            console.log("project updated!");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function updateAmount(idTask, id) {
    const requestOptions = {
        method: "PUT",
    };
    return await fetch(uri+`/projects/updateAmount/${idTask}/${id}`, requestOptions);
}

async function UpdateComment(id, commentt) {
    return await axios
        .put(uri+"/commentEvent/update/" + id + "/" + commentt)
        .then((res) => {
            console.log("comment updated!");
        })
        .catch((err) => {
            console.log(err);
        });
}

function register(project) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
    };

    return fetch(uri+`/projects/add`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
