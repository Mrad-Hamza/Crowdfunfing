import React,{useState,useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { InputNumber } from "primereact/inputnumber";
import { useParams } from "react-router";
import { userService } from '../User/_services';
import { InputSwitch } from "primereact/inputswitch";
import { useHistory } from 'react-router-dom';



import axios from "axios";

const PaymentPage = () => {

        const history = useHistory();

    const emptyCampaign = {
        _id: useParams(),
        nameCompaign: "Test",
        typeCompaign: "",
        objective: "",
        description: "",
        deadline: new Date(),
        Verified: "",
        Status: "",
    };
    const emptyUser = {
        username: localStorage.getItem("currentUsername"),
        mailAddress: localStorage.getItem("currentMailAddress"),
        roles: "Simple User",
        _id: localStorage.getItem("currentUserId"),
    };
    const initialData = {
        mail: localStorage.getItem("currentMailAddress"),
        donation: 5,
        username: localStorage.getItem("currentUsername"),
        id: localStorage.getItem("currentUserId"),
        anonym: true
    };

    const [campaign, setCampaign] = useState(emptyCampaign);
    const [data, setData] = useState(initialData);

    useEffect(() => {
      let res = userService.getCampaign(emptyCampaign._id._id)
      Promise.resolve(res).then((value) => {
          setCampaign(value.data)
      });
    }, [data])


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
            //console.log(res);
        });

        axios({
            method: "POST",
            url: "http://localhost:5000/payment/addToDatabase",
            data: {
                data: data,
                campaign: campaign,
            },
        }).then((res) => {
            //console.log(res);
        });
        console.log(campaign)
        console.log(data)
        // axios
        //     .put({
        //         method: "PUT",
        //         url: "http://localhost:5000/compaigns/updateAmount/6268598f99cbd70117c071ee",
        //         data: {
        //             cumulateAmount: 50,
        //         },
        //     })
        //     .then((res) => console.log(res.data));
        console.log(campaign);
        console.log(data.donation);
        userService.updateCampaingAmount(campaign._id,data.donation)
        history.push("/");

     };
     const onInputChange = (e, username) => {
        const val = (e.value ) || "";
        let _data = { ...data };
        _data[`${username}`] = val;
        console.log(_data)
        setData(_data);
     };
     const onInputAnonymChange = (e, username) => {
         const val = e.value || "";
         let _data = { ...data };
         _data[`anonym`] = !data.anonym;
         console.log(_data);
         setData(_data);
     };


  return (
      <div>
          <h3>How much would you like to donate ?</h3> <br />
          <InputNumber onChange={(e) => onInputChange(e, "donation")} required showButtons mode="decimal" />
          <br />
          <br />
          Anonym ?
          <InputSwitch checked={data.anonym} onChange={(e) => onInputAnonymChange(e, "donation")} />
          <br />
          <StripeCheckout description="Secure Payment" stripeKey="pk_test_51Ks1exLyE3hWd2jo361ebaWXgcu8HR6zgQ7ZqpAmq8cxMR6gF9cclTN6LFNg702oPEonjLGRvIAlEKudpt2j4bJq00CoX5HQO2" token={makePayment}></StripeCheckout>
      </div>
  );
}

export default PaymentPage
