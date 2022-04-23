import axios from "axios";

export const ComplaintProjectService = {
    addComplaint,
};

async function addComplaint(complaint) {
    let formData = new FormData();
    formData.append("complaintProjectTitle", complaint.complaintProjectTitle);
    formData.append("project", complaint.project);
    formData.append("complaintDescription", complaint.complaintDescription);
    formData.append("user", complaint.user);
    console.log(formData);
    return await axios
        .post("http://localhost:5000/complaintProject/add", formData)
        .then((res) => {
            console.log("complaint project added!");
        })
        .catch((err) => {
            console.log(err);
        });
}
