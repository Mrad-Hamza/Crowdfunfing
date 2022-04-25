import axios from "axios";

export const InvoiceProjectService = {
    // register,
    addInvoice,
    delete: _delete,
    activate: _activate,
};

async function addInvoice(invoice) {
    let formData = new FormData();
    formData.append("invoiceName", invoice.invoiceName);
    formData.append("project", invoice.project);
    formData.append("invoiceFile", invoice.invoiceFile);
    formData.append("user", invoice.user);
    console.log(formData);
    return await axios
        .post("http://localhost:5000/invoiceProject/add", formData)
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
    return fetch(`http://localhost:5000/invoiceProject/activate/${id}`, requestOptions);
}

function _delete(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(`http://localhost:5000/invoiceProject/archive/${id}`, requestOptions);
}
