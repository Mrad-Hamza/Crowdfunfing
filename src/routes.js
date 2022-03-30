const routes = {
    projects: {
        path: "/projects",
    },
    getProjectById: {
        path: "/projects/:projectId",
        linkPath: (projectId) => `/projects${projectId}`,
    },
};

export default routes;
