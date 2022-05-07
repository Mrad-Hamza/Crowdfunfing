import axios from "axios";

export const InvoiceTaskService = {
    // register,
    addInvoice,
    delete: _delete,
    activate: _activate,
};
const uri = process.env.REACT_APP_URI_SERVER


async function addInvoice(invoice) {
    let formData = new FormData();
    formData.append("invoiceName", invoice.invoiceName);
    formData.append("task", invoice.task);
    formData.append("invoiceFile", invoice.invoiceFile);
    formData.append("user", invoice.user);
    console.log(formData);
    return await axios
        .post(uri+"/invoiceTask/add", formData)
        .then((res) => {
            console.log("invoice task added!");
        })
        .catch((err) => {
            console.log(err);
        });
}

function _activate(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/invoiceTask/activate/${id}`, requestOptions);
}

function _delete(id) {
    const requestOptions = {
        method: "PUT",
    };
    return fetch(uri+`/invoiceTask/archive/${id}`, requestOptions);
}
