
export const eventService = {
    interested: _interested,
    notInterested: _NotInterested,
};

function _interested(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(`http://localhost:5000/events/interested/${id}`, requestOptions);
}

function _NotInterested(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(`http://localhost:5000/events/notInterested/${id}`, requestOptions);
}


