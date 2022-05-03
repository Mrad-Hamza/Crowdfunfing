import { authHeader } from '../_helpers';
import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    checkToken,
    getAll,
    addUser,
    googlelogin,
    getProfile,
    update,
    changePassword,
    forgotpassword,
    delete: _delete
};


function addUser(user) {
    const token = localStorage.getItem('token')
    const decodedJwt = JSON.parse(atob(token.split('.')[1]))
    if (Date.now()>(decodedJwt.exp * 1000)){
        console.log(localStorage.getItem('token')+ " aa")
        logout()
        refreshPage()
    }
    else {
        axios.post('http://localhost:5000/users/add',user)
            .then(res =>{
            console.log("User added!")
        })
        .catch(err=>{
            console.log(err)
        })
    }

}
function googlelogin(tokenId){
    axios({
        method:"POST",
        url:"http://localhost:5000/users/googlelogin",
        data: {
            tokenId : tokenId
        }
    }).then(res => {
        localStorage.setItem('token',res.data.accessToken)
        localStorage.setItem('currentUserId',res.data.userId)
        localStorage.setItem('currentUsername',res.data.userName)
        localStorage.setItem('currentMailAddress',res.data.mail)
        authHeader();
    })
}
function login(username, password) {
    const data = {
        username : username,
        mailAddress : username,
        password : password
    }
    axios.post(`http://localhost:5000/users/login`,data)
    .then(res=> {
        localStorage.setItem('token',res.data.accessToken)
        localStorage.setItem('currentUserId',res.data.userId)
        localStorage.setItem('currentUsername',res.data.userName)
        localStorage.setItem('currentMailAddress',res.data.mail)
        authHeader();

    })
    .catch(err=>{
        console.log(err+"err")
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}
function refreshPage() {

        window.location.reload(false);
    }

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return await axios.get(`http://localhost:5000/users`, requestOptions)
}

function getProfile() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
        const result = axios.get(`http://localhost:5000/users/profile/`+localStorage.getItem('username'),requestOptions)
        .then((res) =>  res.data)
        return result
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:5000/users/add`, requestOptions).then(handleResponse);
}

async function forgotpassword(mailAddress){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return await axios.post(`http://localhost:5000/users/ForgotPassword/`+mailAddress, requestOptions)
}
async function changePassword(mailAddress,password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

    };
    return await axios.put('http://localhost:5000/users/PasswordUpdate/'+mailAddress+"/"+password,requestOptions)
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    checkToken()
    return fetch(`http://localhost:5000/users/${user.id}`, requestOptions).then(handleResponse);;
}
function checkToken(){
    const token = localStorage.getItem('token')
    const decodedJwt = JSON.parse(atob(token.split('.')[1]))
    if (Date.now()>(decodedJwt.exp * 1000)){
        logout()
        refreshPage()
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    const token = localStorage.getItem('token')
    const decodedJwt = JSON.parse(atob(token.split('.')[1]))
    if (Date.now()>(decodedJwt.exp * 1000)){
        logout()
        refreshPage()
    } else {
        return fetch(`http://localhost:5000/users/${id}`, requestOptions).then(handleResponse);
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
