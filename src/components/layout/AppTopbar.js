import React,{useState,useEffect,useRef} from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { userService } from "../../pages/User/_services";
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';


export const AppTopbar = (props) => {
    let emptyUser = {
        _id: null,
        username: "",
        firstname: "",
        lastname: "",
        mailAddress: "",
        lockUntil: 0,
        img:{
            imgName:"NoPic.png"
        },
        loginAttempts: 0,
        roles: "",
    };
    const [userDialog, setUserDialog] = useState(false);
    const [user,setUser] = useState(emptyUser);
    const [imgDialog,setImgDialog] = useState(false)
    const [fileName,setFileName] = useState("");
    const toast = useRef(null);

    useEffect(() => {
        Promise.resolve(userService.getProfile())
        .then((value)=>{
            setUser(value)
        })
    },[userDialog])

    const setDialog = (e) => {
        setUserDialog(true)
    }

    const setImg = (e) => {
        setImgDialog(true)
    }

    const logout = (e) => {
        userService.logout()
        setTimeout(function() { //Start the timer
            window.location.reload(false);
        }.bind(this), 1000)
    }
    const hideDialog = () => {
        setUserDialog(false);
    }
    const hideImgDialog = () => {
        setImgDialog(false)
    }
    const onUpload = (e) => {
        console.log(e.files[0])
        userService.addUserImage(e.files[0])
        toast.current.show({ severity: 'success', summary: 'Congratulations', detail: "Profile Picure Changed", life: 5000 });
    }
    const DialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" />
        </>
    );
    const ImgDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideImgDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" />
        </>
    );
    return (
        <div className="layout-topbar">
            <Toast ref={toast} />
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === "light" ? "assets/layout/images/logo-dark.svg" : "assets/layout/images/logo-white.png"} alt="logo" />
                <span>FUNDISE</span>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>

                <li>
                    <button className="p-link layout-topbar-button" onClick={setDialog}>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                </li>
                <li>
                    <button className="p-link layout-topbar-button" onClick={logout}>
                            <i className="pi pi-sign-out"/>
                            <span>Logout</span>
                    </button>
                </li>
            </ul>
            <Dialog visible={userDialog} style={{ width: '550px' }} header="User Profile" modal className="p-fluid" footer={DialogFooter} onHide={hideDialog}>
                <div className="col-12">
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <img src={require("../../assets/layout/images/"+user.img.imgName)} alt={"a"} className="shadow-2 fluid" style={{width: 100, borderRadius: 400/ 2}} onClick={setImg}  />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="firstname2"> Name : {user.firstname}</label>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="lastname2">Lastname : {user.lastname}</label>
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="city">Username : {user.username}</label>
                        </div>
                        <div className="field col-12 md:col-3">
                            <label htmlFor="address" rows="4">{user.mailAddress}</label>
                        </div>
                    </div>
            </div>
            </Dialog>

            <Dialog visible={imgDialog} style={{ width: '550px' }} header="Change Profile Picture" modal className="p-fluid" footer={ImgDialogFooter} onHide={hideImgDialog}>
                <div className="col-12">
                    <div className="card">
                        <FileUpload name="demo[]" customUpload={true} uploadHandler={onUpload} multiple accept="image/png" maxFileSize={1000000} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};
