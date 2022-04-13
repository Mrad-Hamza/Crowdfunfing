const routes = {
    projects: {
        path: "/projects",
    },
    getProjectById: {
        path: "/projects/:projectId",
        linkPath: (projectId) => `/projects${projectId}`,
    },
    forums: {
        path: "/forums",
    },
    getForumById: {
        path: "/forums/:forumId",
        linkPath: (forumId) => `/forums${forumId}`,
    },
};

export default routes;
