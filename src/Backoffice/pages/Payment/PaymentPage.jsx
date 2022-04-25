import React,{useState,useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from "axios";

const PaymentPage = () => {

    const emptyCampaign = {
        _id: "6256c26547d815717428d8de",
        nameCompaign: "Test",
        typeCompaign: "",
        objective: "",
        description: "",
        deadline: new Date(),
        Verified: "",
        Status: "",
    };
    const initialData = {
        mail: localStorage.getItem("currentMailAddress"),
        donation: 5,
        username: localStorage.getItem("currentUsername"),
        _id: localStorage.getItem("currentUserId"),
    };

    const [campaign, setCampaign] = useState(emptyCampaign);

    const [data, setData] = useState(initialData);

    const makePayment = token => {
        axios({
            method: "POST",
            url: "http://localhost:5000/payment/",
            data: {
                token : token,
                data: data,
                campaign: campaign,
            },
        }).then((res) => {
            console.log(res);
        });

        axios({
            method: "POST",
            url: "http://localhost:5000/payment/addToDatabase",
            data: {
                data: data,
                campaign: campaign,
            },
        }).then((res) => {
            console.log(res);
        });
     };

  return <StripeCheckout stripeKey="pk_test_51Ks1exLyE3hWd2jo361ebaWXgcu8HR6zgQ7ZqpAmq8cxMR6gF9cclTN6LFNg702oPEonjLGRvIAlEKudpt2j4bJq00CoX5HQO2" token={makePayment}></StripeCheckout>;
}

export default PaymentPage
