import { authHeader } from '../_helpers';
import axios from 'axios';

export const roleService = {
    addRole,
    getRole,
    update,
    delete: _delete
};
const uri = process.env.REACT_APP_URI_SERVER


function addRole(type) {

    axios.post(uri+'/userRole/add/'+type)
    .then(res =>{
        return "Role added"
    })
    .catch(err=>{
        console.log(err)
    })
}

async function getRole(id) {
    const requestOptions = {
        method: 'GET',
    };
    console.log(uri+`/userRole/`+id)
    const result = await axios.get(uri+`/userRole/`+id,requestOptions)
    return result
}

function update(role) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(role)
    };

    return axios.put(uri+`/userRole/`+role.id, requestOptions)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
    };

    return axios.delete(uri+`/userRole/${id}`, requestOptions)
}

function handleResponse(response) {
    return response.text().then(text => {
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
