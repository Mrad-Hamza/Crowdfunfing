const URL = {
    baseApiUrl: process.env.REACT_APP_URI_SERVER + "",

    forums: {
        fetchForums: `/forums/`,

    },

    comments: {
        fetchComment: `/comment/`,

    },
};

export default URL;
