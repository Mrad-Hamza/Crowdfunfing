import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import { userService } from "../../../_services";
import { userActions } from "../../../actions";
import { Captcha } from 'primereact/captcha';


export function SignupForm(props) {
    const { switchToSignin } = useContext(AccountContext);
    const { switchToForgotPasswordOne } = useContext(AccountContext);
    const [submitted,setSubmitted] = useState(false)
    const [state,setState]= useState({username:'',password:'',passwordConfirm:'',mailAddress:'',firstname:'',lastname:''})

    const showResponse = (response) => {
        console.log(response)
//call to a backend to verify against recaptcha with private key
}
    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        if (name==="username") {
            setState(prevState=>{
                return {...prevState,username:value}
            })
        } else if (name==="mailAddress"){
            setState(prevState=>{
                return {...prevState,mailAddress:value}
            })
        } else if (name==="firstname"){
            setState(prevState=>{
                return {...prevState,firstname:value}
            })
        } else if (name==="lastname"){
            setState(prevState=>{
                return {...prevState,lastname:value}
            })
        } else if (name==="password"){
            setState(prevState=>{
                return {...prevState,password:value}
            })
        } else if (name==="passwordConfirm"){
            setState(prevState=>{
                return {...prevState,passwordConfirm:value}
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        if (state.username && state.password && state.mailAddress && state.firstname && state.lastname && state.password===state.passwordConfirm) {
            userService.register(state)
            setTimeout(function() { //Start the timer
                switchToSignin() //After 1 second, set render to true
            }.bind(this), 1000)
        }
    }

  return (
    <BoxContainer>
      <FormContainer>
        <Input id="username" name="username" type="text" placeholder="Username" onChange={handleChange}/>
        <Input id="firstname" name="firstname" type="text" placeholder="First Name" onChange={handleChange} />
        <Input id="lastname" name="lastname" type="text" placeholder="Last Name" onChange={handleChange} />
        <Input id="mailAddress" name="mailAddress" type="email" placeholder="Email" onChange={handleChange} />
        <Input id="password" name="password" type="password" placeholder="Password" onChange={handleChange} />
        <Input id="passwordConfirm" name="passwordConfirm" type="password" placeholder="Confirm Password" onChange={handleChange} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={handleSubmit}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
