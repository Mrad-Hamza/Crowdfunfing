import React, { useContext, useEffect, useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import * as faceapi from "face-api.js";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { Route, useLocation } from "react-router-dom";
import { Marginer } from "../marginer";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { AccountContext } from "./accountContext";
import { Toast } from "primereact/toast";
import { userService } from "../../../_services";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Button } from "@mui/material";

export function LoginForm(props) {
    const emptyImg = {
        objectURL: "",
    };
    let emptyUser = {
        _id: null,
        username: null,
        firstname: null,
        lastname: null,
        mailAddress: null,
        lockUntil: 0,
        img: null,
        loginAttempts: 0,
        roles: null,
    };

    const { switchToSignup } = useContext(AccountContext);
    const { switchToForgotPasswordOne } = useContext(AccountContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [imgDialog, setImgDialog] = useState(false);
    const [mail, setMail] = useState("");
    const [img, setImg] = useState(emptyImg);
    const [verifUser, setVerifUser] = useState(emptyUser);
    const location = useLocation();
    const toast = useRef(null);
    const canvas = useRef(null);
    const [modelsLoaded, setModelsLoaded] = React.useState(false);
    const [captureVideo, setCaptureVideo] = React.useState(false);
    const videoRef = React.useRef();
    const videoHeight = 480;
    const videoWidth = 640;
    const canvasRef = React.useRef();

    useEffect(() => {
        userService.logout();
        loadModels();
    }, []);

    function refreshPage() {
        window.location.reload(false);
    }
    useEffect(() => {}, [redirect]);

    const loadModels = async () => {
        const MODEL_URL = "/models";
        Promise.all([
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        ]).then(setModelsLoaded(true));
    };

    const startVideo = () => {
        setCaptureVideo(true);
        navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error("error:", err);
            });
    };
    const handleVideoOnPlay = async () => {
         setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight,
                };
                const labeledDescriptor = await detect()
                console.log(labeledDescriptor)
                const faceMatcher = new faceapi.FaceMatcher(labeledDescriptor, 0.2)
                faceapi.matchDimensions(canvasRef.current, displaySize);
                canvasRef && canvasRef.current && canvasRef.current.getContext("2d").clearRect(0, 0, videoWidth, videoHeight);

                 const detections = await faceapi.detectSingleFace(
                     videoRef.current,
                     new faceapi.TinyFaceDetectorOptions()
                ).withFaceLandmarks().withFaceDescriptor();
                console.log(detections)
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                const labDescr = faceapi.LabeledFaceDescriptors("test", detections.descriptor);
                const labels = faceMatcher.labDescr.map((ld) => ld.label);
                console.log(labels)


                // resizedDetections.forEach(({ detection, descriptor }) => {
                //     const label = faceMatcher.findBestMatch(descriptor).toString();
                //     const options = { label };
                //     const drawBox = new faceapi.draw.DrawBox(detection.box, options);
                //     drawBox.draw(canvasRef);
                // });


                // canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
                // canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
                // canvasRef && canvasRef.current && faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
            }
        }, 100);

    };
    const closeWebcam = () => {
        videoRef.current.pause();
        videoRef.current.srcObject.getTracks()[0].stop();
        setCaptureVideo(false);
    };

    const showImgDialog = (e) => {
        setImgDialog(true);
    };
    const hideImgDialog = () => {
        setImgDialog(false);
    };
    const onUpload = (e) => {
        setImg(e.files[0]);
        console.log(img.objectURL);
    };
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "username") {
            setUsername(value);
        } else {
            setPassword(value);
        }
    };

    const handleMailChange = (e) => {
        const { value } = e.target;
        setMail(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (username && password) {
            var result = userService.login(username, password);
            Promise.resolve(result).then((value) => {
                if (value === "Invalid details") {
                    toast.current.show({ severity: "error", summary: "Error", detail: value, life: 5000 });
                } else if (value === "You failed too many times.") {
                    toast.current.show({ severity: "error", summary: "Error", detail: value, life: 5000 });
                } else if (value === "No User Found!") {
                    toast.current.show({ severity: "error", summary: "Error", detail: value, life: 5000 });
                } else {
                    toast.current.show({ severity: "success", summary: "Succesfull", detail: "Login successful", life: 5000 });
                    setTimeout(
                        function () {
                            //Start the timer
                            refreshPage(); //After 1 second, set render to true
                        }.bind(this),
                        1000
                    );
                    setRedirect(true);
                }
            });
        }
    };

    const compare = () => {
        setTimeout(() => {
            const res = userService.getUserByMailOrUsername(mail);
            Promise.resolve(res).then((value) => {
                setVerifUser(value.data);
            });
            detect()
        }, 100);
    };

    const detect = async () => {
        console.log(verifUser.img.imgName);
        const originalfile = await faceapi.fetchImage("https://raw.githubusercontent.com/selmagassab/CrowdFundingProject/43e714ba81cd407278aa8026fde1653226d60d5e/src/assets/layout/images/" + verifUser.img.imgName);
        const detections = await faceapi.detectSingleFace(originalfile).withFaceLandmarks().withFaceDescriptor();
        const result = [
            new Float32Array(detections.descriptor)
        ]
        return new faceapi.LabeledFaceDescriptors(verifUser.username, result)
    }

    const facelogin = () => {
        showImgDialog();
    };

    const responseSuccessGoogle = (res) => {
        console.log(res);
        userService.googlelogin(res.tokenId);
        setTimeout(
            function () {
                //Start the timer
                refreshPage(); //After 1 second, set render to true
            }.bind(this),
            1000
        );
    };
    const componentClicked = (res) => {};

    const responseFacebook = (res) => {
        userService.facebooklogin(res.accessToken, res.userID);
        setTimeout(
            function () {
                //Start the timer
                refreshPage(); //After 1 second, set render to true
            }.bind(this),
            1000
        );
    };
    const responseFailureGoogle = (res) => {};

    const ImgDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideImgDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" />
        </>
    );
    if (!redirect) {
        return (
            <BoxContainer>
                <Toast ref={toast} />
                <FormContainer>
                    <Input id="username" name="username" type="text" placeholder="Email" onChange={handleChange} />
                    {submitted && !username && <div className="help-block">Username is required</div>}
                    <Input type="password" id="password" name="password" placeholder="Password" onChange={handleChange} />
                </FormContainer>
                <Marginer direction="vertical" margin={10} />
                <MutedLink href="#" onClick={switchToForgotPasswordOne}>
                    Forget your password?
                </MutedLink>
                <Marginer direction="vertical" margin="1.6em" />
                <SubmitButton type="submit" onClick={handleSubmit}>
                    Signin
                </SubmitButton>
                <Marginer direction="vertical" margin="1em" />
                <Marginer direction="vertical" margin="1.6em" />
                <Button type="submit" onClick={facelogin}>
                    Facial Login
                </Button>
                <GoogleLogin clientId="98128393533-fb736bc4b2637vn8t1028bcf0e6mv0lj.apps.googleusercontent.com" buttonText="Login with Google" onSuccess={responseSuccessGoogle} onFailure={responseFailureGoogle} cookiePolicy={"single_host_origin"} />
                <FacebookLogin appId="531998668448477" autoLoad={false} onClick={componentClicked} callback={responseFacebook} />
                <Marginer direction="vertical" margin="1em" />
                <MutedLink href="#">
                    Don't have an accoun?{" "}
                    <BoldLink href="#" onClick={switchToSignup}>
                        Signup
                    </BoldLink>
                </MutedLink>
                {/* <Dialog visible={imgDialog} style={{ width: "550px" }} header="Facial Recognition" modal className="p-fluid" footer={ImgDialogFooter} onHide={hideImgDialog}>
                    <div className="col-12">
                        <div className="card">
                            <Input id="mail" name="mail" type="text" placeholder="Email" onChange={handleMailChange} />
                            <FileUpload name="demo[]" customUpload={true} uploadHandler={onUpload} multiple accept="image/png" maxFileSize={1000000} />
                            <Button type="submit" onClick={compare}>
                                Click
                            </Button>
                        </div>
                        <div className="card">
                            <img src={img.objectURL} alt="" />
                            <canvas ref={canvas} style={{ position: "absolute", top: 0, left: 0 }} />
                        </div>
                        <div className="card">
                            <div>
                                <div style={{ textAlign: "center", padding: "10px" }}>
                                    {captureVideo && modelsLoaded ? (
                                        <button onClick={closeWebcam} style={{ cursor: "pointer", backgroundColor: "green", color: "white", padding: "15px", fontSize: "25px", border: "none", borderRadius: "10px" }}>
                                            Close Webcam
                                        </button>
                                    ) : (
                                        <button onClick={startVideo} style={{ cursor: "pointer", backgroundColor: "green", color: "white", padding: "15px", fontSize: "25px", border: "none", borderRadius: "10px" }}>
                                            Open Webcam
                                        </button>
                                    )}
                                </div>
                                {captureVideo ? (
                                    modelsLoaded ? (
                                        <div>
                                            <div style={{ display: "flex", justifyContent: "center", padding: "10px" }}>
                                                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: "10px" }} />
                                                <canvas ref={canvasRef} style={{ position: "absolute" }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>loading...</div>
                                    )
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog> */}
            </BoxContainer>
        );
    }
}
