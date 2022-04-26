import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import EyeIcon from "../../../Images/EyeIcon.PNG";
import Edit from "../../../Images/EditIcon.PNG";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { userService } from "../../../../Backoffice/pages/User/_services/user.service";

const ProfilePage = () => {
    let emptyUser = {
        _id: null,
        username: "",
        firstname: "",
        lastname: "",
        mailAddress: "",
        lockUntil: 0,
        img: {
            imgName: "NoPic.png",
        },
        loginAttempts: 0,
        roles: "",
    };

    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [userDialog, setUserDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [submitted, setSubmitted] = useState(false);
    const [imgDialog, setImgDialog] = useState(false);
    const [pwdDialog, setPwdDialog] = useState(false);
    const [PwdSubmitted, setPwdSubmitted] = useState(false);
    const toast = useRef(null);

    const BlackBar = styled.div`
        height: 53px;
        width: 100%;
        background-color: black;
        color: white;
        padding-top: 1%;
        padding-left: 2%;
        text-align: left;
    `;
    const NameHeader = styled.div`
        font-size: 27px;
        width: 100%;
        font-weight: 700;
        color: black;
        padding-top: 4%;
        padding-left: 3%;
        text-align: left;
    `;
    const TextHeader = styled.div`
        font-size: 17px;
        width: 80%;
        font-weight: 500;
        color: black;
        padding-top: 4%;
        padding-left: 3%;
        text-align: left;
    `;
    useEffect(() => {
        setTimeout(() => {
            Promise.resolve(userService.getProfile()).then((value) => {
                setUser(value);
            });
        }, 2000);
    }, []);

    const saveUser = () => {
        setSubmitted(true);
        let _user = { ...user };
        userService.update(_user);
        toast.current.show({ severity: "success", summary: "Successful", detail: "User Updated", life: 3000 });
        setUserDialog(false);
        setUser(emptyUser);
        window.location.reload(false);
    };

    const changePwd = () => {
        setSubmitted(true);
        if (pwd != "") {
            if (pwd.length <= 7) {
                toast.current.show({ severity: "error", summary: "Error", detail: "Password must atleast contain 8 caracters", life: 3000 });
            } else {
                if (pwd === confirmPwd) {
                    userService.changePassword(localStorage.getItem("currentMailAddress"), pwd);
                    toast.current.show({ severity: "success", summary: "Success", detail: "Password Changed Succesfully!", life: 3000 });
                } else {
                    toast.current.show({ severity: "error", summary: "Error", detail: "Passwords must be identical! Please re-confirm your password", life: 3000 });
                }
            }
        }
    };

    const onInputPwdChange = (e) => {
        setPwd(e.target.value);
    };

    const onInputConfirmPwdChange = (e) => {
        setConfirmPwd(e.target.value);
    };

    const onInputChange = (e, username) => {
        const val = (e.target && e.target.value) || "";
        let _user = { ...user };
        _user[`${username}`] = val;
        setUser(_user);
    };
    const openNew = () => {
        setSubmitted(false);
        setUserDialog(true);
    };
    const openNewPwdDialog = () => {
        setPwdSubmitted(false);
        setPwdDialog(true);
    };

    const hidePwdDialog = () => {
        setPwdSubmitted(false);
        setPwdDialog(false);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };
    const setImg = (e) => {
        setImgDialog(true);
    };
    const onUpload = (e) => {
        userService.addUserImage(e.files[0]);
        toast.current.show({ severity: "success", summary: "Congratulations", detail: "Profile Picure Changed", life: 5000 });
        window.location.reload(false);
    };
    const hideImgDialog = () => {
        setImgDialog(false);
    };
    const ImgDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideImgDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" />
        </>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUser} />
        </>
    );

    const pwdDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hidePwdDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={changePwd} />
        </>
    );
    return (
        <div>
            <Toast ref={toast} />
            <BlackBar>
                <img src={EyeIcon} height="35px" alt={"eeaaa"} onClick={openNewPwdDialog} />
                Change password
                <img src={Edit} style={{ marginTop: "-3px", marginLeft: "24px" }} alt={"ee"} onClick={openNew}></img>
            </BlackBar>
            <div className="container col-12">
                <div className="row ml-2">
                    <NameHeader>{user.username}</NameHeader>
                </div>
                <div className="row ml-2" style={{ display: "flex" }}>
                    <div className="col-3">
                        <imgStyled>
                            <img src={require("../../../../assets/layout/images/" + user.img.imgName)} alt={"a"} className="shadow-2 fluid" style={{ width: 250, height: 300, borderRadius: 400 / 2 }} onClick={setImg} />
                        </imgStyled>
                    </div>
                    <div className="col-4">
                        <div className="row">
                            <TextHeader>Campaings : 0 </TextHeader>
                            <TextHeader>Donations : 0</TextHeader>
                            <TextHeader>Comments : 0</TextHeader>
                        </div>
                        <br></br>
                        <div className="row">
                            <TextHeader>Name : {user.firstname}</TextHeader>
                            <TextHeader>Last Name : {user.lastname}</TextHeader>
                            <TextHeader>Mail : {user.mailAddress}</TextHeader>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <Dialog visible={imgDialog} style={{ width: "550px" }} header="Change Profile Picture" modal className="p-fluid" footer={ImgDialogFooter} onHide={hideImgDialog}>
                <div className="col-12">
                    <div className="card">
                        <FileUpload name="demo[]" customUpload={true} uploadHandler={onUpload} multiple accept="image/png" maxFileSize={1000000} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={userDialog} style={{ width: "450px" }} header="Add/Update User" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="username">Username</label>
                    <InputText id="username" value={user.username} onChange={(e) => onInputChange(e, "username")} required autoFocus className={classNames({ "p-invalid": submitted && !user.name })} />
                    {submitted && !user.username && <small className="p-invalid">Username is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="mailAddress">Mail Address</label>
                    <InputText id="mailAddress" value={user.mailAddress} onChange={(e) => onInputChange(e, "mailAddress")} required rows={3} cols={20} />
                    {submitted && !user.mailAddress && <small className="p-invalid">mailAddress is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="firstname">Name</label>
                    <InputText id="firstname" value={user.firstname} onChange={(e) => onInputChange(e, "firstname")} required rows={3} cols={20} />
                    {submitted && !user.firstname && <small className="p-invalid">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="lastname">Lastname</label>
                    <InputText id="lastname" value={user.lastname} onChange={(e) => onInputChange(e, "lastname")} required rows={3} cols={20} />
                    {submitted && !user.lastname && <small className="p-invalid">Lastname is required.</small>}
                </div>
            </Dialog>

            <Dialog visible={pwdDialog} style={{ width: "450px" }} header="Change Password!" modal className="p-fluid" footer={pwdDialogFooter} onHide={hidePwdDialog}>
                <div className="field">
                    <label htmlFor="pwd">Password</label>
                    <InputText id="pwd" value={pwd} onChange={(e) => onInputPwdChange(e)} required autoFocus className={classNames({ "p-invalid": PwdSubmitted && !pwd })} />
                    {PwdSubmitted && !pwd && <small className="p-invalid">Enter a password.</small>}
                </div>
                <div className="field">
                    <label htmlFor="confirmPwd">Confirm your password</label>
                    <InputText id="confirmPwd" value={confirmPwd} onChange={(e) => onInputConfirmPwdChange(e)} required rows={3} cols={20} />
                    {PwdSubmitted && !confirmPwd && <small className="p-invalid">Confirm your password</small>}
                </div>
            </Dialog>
        </div>
    );
};
//require("../../../../../assets/layout/images/"+user.img.imgName)
export default ProfilePage;
