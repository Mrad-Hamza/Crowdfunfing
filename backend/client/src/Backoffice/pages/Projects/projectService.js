
export const projectService = {
    delete: _delete,
    activate: _activate,
};

const uri = process.env.REACT_APP_URI_SERVER


function _activate(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/projects/activate/${id}`, requestOptions);
}

function _delete(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/projects/archive/${id}`, requestOptions);
}
