const URL = {
    baseApiUrl: "http://localhost:5000",

    projects: {
        fetchProjects: `/projects/active`,
        fectchDeletedProjects: `/projects/deleted`,
        addProject: `/projects/add`,
    },
    forums: {
        fetchForums: `/forum/`,
    },
    tasks: {
        fetchTasks: `/tasks/`,
        gettaskbyidproject: `/tasks/all`,
    },
};

export default URL;
