import React, { useContext,useEffect,useState,useRef } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import  App from '../../../../../App'
import { Route, useLocation } from 'react-router-dom';
import { Marginer } from "../marginer";
import { InputText } from 'primereact/inputtext';
import { AccountContext } from "./accountContext";
import { Toast } from 'primereact/toast';
import { userService } from "../../../_services";
import Dashboard from "../../../../../components/Dashboard";

export function ForgotPasswordOneForm(props) {
    const { switchToSignup } = useContext(AccountContext);
    const { switchToSignin } = useContext(AccountContext);
    const [mailAddress,setmailAddress] = useState('')
    const [password,setPassword] = useState('')
    const [passwordConfirm,setPasswordConfirm] = useState('')
    const [submitted,setSubmitted] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const [code,setCode] = useState('')
    const [userCode,setUserCode] = useState('')
    const location = useLocation();
    const toast = useRef(null);


    useEffect(()=>{
        userService.logout()
    },[])

    function refreshPage() {

        window.location.reload(false);
    }
    useEffect( () => {
        console.log("test")
    },[redirect])

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        if (name==="mailAddress") {
            setmailAddress(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        if (mailAddress) {
            const res = userService.forgotpassword(mailAddress)
            let result = Promise.resolve(res);
            result.then((value)=>{
                setCode(value.data.code)
                console.log(code)
            })
        }
    }

    const handleChangePassword = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        if (name==="password") {
            setPassword(value)
        }
        else if (name==="passwordConfirm") {
            setPasswordConfirm(value)
        }
        else if (name==="code") {
            setUserCode(value)
        }
    }

    const handleSubmitPassword = (e) => {
        e.preventDefault()
        setSubmitted(true)
        if (code === userCode) {
            const res = userService.changePassword(mailAddress,password)
            let result = Promise.resolve(res);
            result.then((value)=>{
                setCode(value)
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Password changed Succesfully', life: 3000 });
        }
        else{
            toast.current.show({ severity: 'error', summary: 'Errir', detail: 'There was an error!  ', life: 3000 });
        }
    }
    if (!code) {
         return (
    <BoxContainer>
      <FormContainer>
            <Input id="mailAddress" name="mailAddress" type="text" placeholder="Email" onChange={handleChange} />
            {submitted && !mailAddress &&
            <div className="help-block">Mail Address is required</div>
            }
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmit}>Send Code</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignin}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
    }
    else {
        return (

        <BoxContainer>
        <Toast ref={toast} />
      <FormContainer>
            <Input id="code" name="code" type="text" placeholder="Code" onChange={handleChangePassword} />
            <Input id="password" name="password" type="password" placeholder="password" onChange={handleChangePassword} />
            {submitted && !password &&
            <div className="help-block">password is required</div>
            }
            <Input id="passwordConfirm" name="passwordConfirm" type="password" placeholder="password" onChange={handleChangePassword} />
            {submitted && !passwordConfirm &&
            <div className="help-block">confirm password</div>
            }
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={handleSubmitPassword}>Change Password</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignin }>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>);
    }
}
