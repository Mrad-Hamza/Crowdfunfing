import React,{useState,useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";




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
        anonym: false
    };

    const [campaign, setCampaign] = useState(emptyCampaign);
    const [montant, setMontant] = useState(5)
    const [anonym, setAnonym] = useState(false)
    const [data, setData] = useState(initialData);

    useEffect(() => {
      setData((prevState)=>({
          ...prevState,donation:(montant)
      }))
      console.log(data)
    }, [montant])

    useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            anonym: !anonym,
        }));
        console.log(data);
    }, [anonym]);


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
     const onInputChange = (e) => {
        //  setData((prevState)=>({
        //      ...prevState,
        //      donatioen:e.value,
        //  }));
        //  console.log(data)
     };


  return (
      <div>
          <div className="field">
              <h5>How much do you want to donate ?</h5>
              <InputNumber value={montant} onValueChange={(e) => setMontant(e.value)} showButtons mode="decimal"></InputNumber>
          </div>
          <div className="field">
              <h5>Do you want this transaction to be annonym?</h5>
              <InputSwitch checked={anonym} onChange={(e) => setAnonym(e.value)} />{" "}
          </div>

          <StripeCheckout stripeKey="pk_test_51Ks1exLyE3hWd2jo361ebaWXgcu8HR6zgQ7ZqpAmq8cxMR6gF9cclTN6LFNg702oPEonjLGRvIAlEKudpt2j4bJq00CoX5HQO2" token={makePayment}></StripeCheckout>
      </div>
  );
}

export default PaymentPage
