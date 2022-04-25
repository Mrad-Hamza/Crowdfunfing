import axios from "axios";

export const projectService = {
    delete: _delete,
    activate: _activate,
};

function _activate(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(`http://localhost:5000/projects/activate/${id}`, requestOptions);
}

function _delete(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(`http://localhost:5000/projects/archive/${id}`, requestOptions);
}
