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
        getTaskByProjectId: `/tasks/all`,
    },
    invoiceProjects: {
        fetchInvoiceProjects: `/invoiceProjects/`,
        getInvoiceByProjectId: `/invoiceProjects/all`,
    },
};

export default URL;
