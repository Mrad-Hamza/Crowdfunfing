import axios from "axios";

export const InvoiceProjectService = {
    // register,
    addInvoice,
    delete: _delete,
    activate: _activate,
};
const uri = process.env.REACT_APP_URI_SERVER

async function addInvoice(invoice) {
    let formData = new FormData();
    formData.append("invoiceName", invoice.invoiceName);
    formData.append("project", invoice.project);
    formData.append("invoiceFile", invoice.invoiceFile);
    formData.append("user", invoice.user);
    console.log(formData);
    return await axios
        .post(uri+"/invoiceProject/add", formData)
        .then((res) => {
            console.log("invoice project added!");
        })
        .catch((err) => {
            console.log(err);
        });
}

function _activate(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/invoiceProject/activate/${id}`, requestOptions);
}

function _delete(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/invoiceProject/archive/${id}`, requestOptions);
}
