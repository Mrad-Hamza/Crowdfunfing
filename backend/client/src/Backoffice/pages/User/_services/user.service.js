import { authHeader } from "../_helpers";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const userService = {
    login,
    logout,
    register,
    facialLogin,
    checkToken,
    getUserDonations,
    facebooklogin,
    getUserImage,
    getAll,
    getCampaign,
    addUser,
    googlelogin,
    getUserByMailOrUsername,
    getProfile,
    updateCampaingAmount,
    update,
    changePassword,
    forgotpassword,
    addUserImage,
    getCampaignById,
    delete: _delete,
    getById,
};
const uri = process.env.REACT_APP_URI_SERVER

async function getUserDonations() {
    return await axios.get(uri+"/payment/getUserDonations/" + localStorage.getItem("currentUserId"));
}

async function getCampaignById(id) {
    return await axios.get(uri+"/compaigns/" + id);
}

async function addUserImage(image) {
    let formData = new FormData();
    let idUser = localStorage.getItem("currentUserId");
    formData.append("image", image);
    formData.append("data", idUser);
    console.log(formData);
    console.log(idUser);
    return await axios.put(uri+"/users/addUserImage", formData);
}

async function addUser(user) {
    return await axios
        .post(uri+"/users/add", user)
        .then((res) => {
            console.log("User added!");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function getUserByMailOrUsername(search) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return await axios.get(uri+"/users/search/" + search, requestOptions);
}
function facialLogin(email) {
    axios({
        method: "POST",
        url: uri+"/users/facialLogin",
        data: {
            email: email,
        },
    }).then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("currentUserId", res.data.userId);
        localStorage.setItem("currentUsername", res.data.userName);
        localStorage.setItem("currentMailAddress", res.data.mail);
        localStorage.setItem("currentRoles", res.data.role);
        authHeader();
    });
}

function googlelogin(tokenId) {
    axios({
        method: "POST",
        url: uri+"/users/googlelogin",
        data: {
            tokenId: tokenId,
        },
    }).then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("currentUserId", res.data.userId);
        localStorage.setItem("currentUsername", res.data.userName);
        localStorage.setItem("currentMailAddress", res.data.mail);
        localStorage.setItem("currentRoles", res.data.role);
        authHeader();
    });
}
function facebooklogin(accessToken, userID) {
    axios({
        method: "POST",
        url: uri+"/users/facebooklogin",
        data: {
            accessToken: accessToken,
            userID: userID,
        },
    }).then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("currentUserId", res.data.userId);
        localStorage.setItem("currentUsername", res.data.userName);
        localStorage.setItem("currentMailAddress", res.data.mail);
        localStorage.setItem("currentRoles", res.data.role);
        authHeader();
    });
}
async function login(username, password) {
    const data = {
        username: username,
        mailAddress: username,
        password: password,
    };
    return await axios
        .post(uri+`/users/login`, data)
        .then((res) => {
            if (res.data === "Invalid details") {
                return res.data;
            } else if (res.data === "You failed too many times.") {
                return res.data;
            } else if (res.data === "No User Found!") {
                return res.data;
            } else {
                console.log(res);
                localStorage.setItem("token", res.data.accessToken);
                localStorage.setItem("currentUserId", res.data.userId);
                localStorage.setItem("currentUsername", res.data.userName);
                localStorage.setItem("currentMailAddress", res.data.mail);
                localStorage.setItem("currentRoles", res.data.role);
                authHeader();
                return res.data;
            }
        })
        .catch((err) => {
            console.log(err + "err");
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUserId");
    localStorage.removeItem("currentUsername");
    localStorage.removeItem("currentMailAddress");
    localStorage.removeItem("currentRoles");
    localStorage.removeItem("token");
}
function refreshPage() {
    window.location.reload(false);
}

async function getUserImage(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return await axios.get(uri+"/image/" + id, requestOptions);
}

async function getCampaign(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return await axios.get(uri+"/compaigns/" + id, requestOptions);
}

async function getAll() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return await axios.get(uri+`/users`, requestOptions);
}

async function getById(id) {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    return await axios.get(uri+"/users/" + id, requestOptions);
}

async function getProfile() {
    const requestOptions = {
        method: "GET",
        headers: authHeader(),
    };
    const result = await axios.get(uri+`/users/profile/` + localStorage.getItem("currentMailAddress"), requestOptions).then((res) => res.data);
    return result;
}

function register(user) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    };
    return fetch(uri+`/users/add`, requestOptions).then(handleResponse);
}

async function forgotpassword(mailAddress) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
    return await axios.post(uri+`/users/ForgotPassword/` + mailAddress, requestOptions);
}
async function changePassword(mailAddress, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    };
    return await axios.put(uri+"/users/PasswordUpdate/" + mailAddress + "/" + password, requestOptions);
}
async function updateCampaingAmount(id, number) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     data: {
    //         cumulateAmount: 20
    //     }
    // };
    // return await axios.put(uri+'/compaigns/updateAmount/6268598f99cbd70117c071ee', requestOptions).then((res) => console.log(res.data))
    return await axios
        .put(uri+"/compaigns/updateAmount/" + id + "/" + number)
        .then((res) => {
            console.log("campaign  updated!");
        })
        .catch((err) => {
            console.log(err);
        });
}

async function update(user) {
    const requestOptions = {
        method: "PUT",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: user,
    };
    return axios.put(uri +`/users/update/${user._id}`, requestOptions);
}
function checkToken() {
    const token = localStorage.getItem("token");
    if (token ==null) {
        return false;
    }
    else {
        const decodedJwt = JSON.parse(atob(token.split(".")[1]));
        if (Date.now() > decodedJwt.exp * 1000) {
            return true;
        } else {
            return false;
        }
    }

}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: "DELETE",
        headers: authHeader(),
    };
    const token = localStorage.getItem("token");
    const decodedJwt = JSON.parse(atob(token.split(".")[1]));
    if (Date.now() > decodedJwt.exp * 1000) {
        logout();
        refreshPage();
    } else {
        return fetch(uri +`/users/${id}`, requestOptions).then(handleResponse);
    }
}

function handleResponse(response) {
    return response.text().then((text) => {
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
