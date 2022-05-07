
export const eventService = {
    interested: _interested,
    notInterested: _NotInterested,
};

function _interested(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(process.env.REACT_APP_URI_SERVER + `/events/interested/${id}`, requestOptions);
}

function _NotInterested(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(process.env.REACT_APP_URI_SERVER + `/events/notInterested/${id}`, requestOptions);
}


