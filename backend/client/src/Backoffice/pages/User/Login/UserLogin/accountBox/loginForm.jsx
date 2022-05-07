import React, { useContext, useEffect, useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import * as faceapi from "face-api.js";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import { FileUpload } from "primereact/fileupload";
import { Route, useLocation } from "react-router-dom";
import { Marginer } from "../marginer";
import { InputText } from "primereact/inputtext";
import { AccountContext } from "./accountContext";
import { Toast } from "primereact/toast";
import { userService } from "../../../_services";
import Backdrop from "@material-ui/core/Backdrop/";
import CircularProgress from "@material-ui/core/CircularProgress/";
import { Button } from "@mui/material";
import defaultImg from "../../../../../../assets/layout/images/NoPic.png";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

export function LoginForm(props) {
    const emptyImg = {
        objectURL: "https://raw.githubusercontent.com/selmagassab/CrowdFundingProject/Hamza/src/assets/layout/images/",
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

    const [firstImg, setfirstImg] = useState(defaultImg);
    const [secondImg, setsecondImg] = useState(defaultImg);
    const [noFacesFound, setnoFacesFound] = useState(false);
    const [moreThanOneFace, setmoreThanOneFace] = useState(false);
    const [matchFound, setmatchFound] = useState(null);
    const [loading, setloading] = useState();
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
    const videoHeight = 380;
    const videoWidth = 540;
    const canvasRef = React.useRef();

    useEffect(() => {
      if(matchFound==="found") {
          userService.facialLogin(mail);
          refreshPage()
      }
    }, [matchFound])


    useEffect(() => {
        userService.logout();

        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + "/models";

            Promise.all([
                await faceapi.nets.faceExpressionNet.loadFromUri("/models"),
                await faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                await faceapi.nets.mtcnn.loadFromUri("/models"),
                await faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models"),
                await faceapi.nets.ageGenderNet.loadFromUri("/models"),
            ]).then(setModelsLoaded(true));
        };
        loadModels();
        detect();
    }, []);

    const handleFirstImageUpload = (e) => {
        let img = e.target.files[0];
        let canvas = document.getElementById("canvas1");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        setfirstImg(URL.createObjectURL(img));
        console.log(firstImg)

    };
    const handleSecondImageUpload = (e) => {
        let img = e.target.files[0];
        let canvas = document.getElementById("canvas2");
        const context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        setsecondImg(URL.createObjectURL(img));

    };

    const checkMatch = async () => {
        setloading(true);
        setmatchFound(null);

        let firstImg = document.getElementById("first-img");
        let faces = await faceapi.detectAllFaces(firstImg).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
        faces = faceapi.resizeResults(faces, { height: 300, width: 300 });
        faceapi.draw.drawDetections(document.getElementById("canvas1"), faces);

        switch (faces.length) {
            case 0:
                setnoFacesFound(true);
                setloading(false);
                break;
            case 1:
                findMatch(faces[0]);
                break;
            default:
                setmoreThanOneFace(true);
                break;
        }
    };

    const findMatch = async (face) => {
        let matchScore = 0.63;
        let secondImg = document.getElementById("second-img");
        let faces = await faceapi.detectAllFaces(secondImg).withFaceLandmarks().withFaceDescriptors();
        let labledFace = new faceapi.LabeledFaceDescriptors("Face", [face.descriptor]);
        let faceMatcher = new faceapi.FaceMatcher(labledFace, matchScore);

        let results = await faces.map((f) => {
            return faceMatcher.findBestMatch(f.descriptor);
        });
        if (results.findIndex((i) => i._label == "Face") !== -1) {
            let matched = [faces[results.findIndex((i) => i._label == "Face")]];
            matched = faceapi.resizeResults(matched, { height: 300, width: 300 });
            faceapi.draw.drawDetections(document.getElementById("canvas2"), matched, { withScore: false });
            setmatchFound("found")
            setloading(false)
        } else {
            setmatchFound("not found")
            setloading(false)
        }
    };

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {}, [redirect]);

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


    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (canvasRef && canvasRef.current) {
                canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
                const displaySize = {
                    width: videoWidth,
                    height: videoHeight,
                };

                faceapi.matchDimensions(canvasRef.current, displaySize);
                const labeledDescriptor = await detect();
                console.log(labeledDescriptor);
                const faceMatcher = new faceapi.FaceMatcher(labeledDescriptor, 0.2);
                faceapi.matchDimensions(canvasRef.current, displaySize);
                canvasRef && canvasRef.current && canvasRef.current.getContext("2d").clearRect(0, 0, videoWidth, videoHeight);

                const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
                console.log(detections);
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                const labDescr = faceapi.LabeledFaceDescriptors("test", detections.descriptor);
                const labels = faceMatcher.labDescr.map((ld) => ld.label);
                console.log(labels);



                canvasRef && canvasRef.current && canvasRef.current.getContext("2d").clearRect(0, 0, videoWidth, videoHeight);

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

    const getUserImage = (e) => {
        var result = userService.getUserByMailOrUsername(mail)
        Promise.resolve(result).then((value) => {
            console.log(value.data.img.imgName)
            const img = require("../../../../../../assets/layout/images/" + value.data.img.imgName);
            let canvas = document.getElementById("canvas1");
            const context = canvas.getContext("2d");
            context.clearRect(0, 0, canvas.width, canvas.height);
            setfirstImg(img);
        })


    }

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
        console.log(mail)
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
            detect();
        }, 100);
    };

    const detect = async () => {

        const imgOriginal = await faceapi.fetchImage("https://raw.githubusercontent.com/selmagassab/CrowdFundingProject/43e714ba81cd407278aa8026fde1653226d60d5e/src/assets/layout/images/aa.jpg");

        const fullFaceDescriptions = await faceapi.detectAllFaces(imgOriginal).withFaceLandmarks().withFaceDescriptors();
        if (!fullFaceDescriptions.length) {
            return;
        }
        const faceMatcher = new faceapi.FaceMatcher(fullFaceDescriptions);
        faceapi.matchDimensions(canvasRef, imgOriginal);
        const resizedResults = faceapi.resizeResults(fullFaceDescriptions, imgOriginal);
        const labels = faceMatcher.labeledDescriptors.map((ld) => ld.label);
        resizedResults.forEach(({ detection, descriptor }) => {
            const label = faceMatcher.findBestMatch(descriptor).toString();
            const options = { label };
            const drawBox = new faceapi.draw.DrawBox(detection.box, options);
            drawBox.draw(canvasRef);
        });


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

    const facelogin = () => {
        showImgDialog();
    };

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
                <Dialog visible={imgDialog} style={{ width: "550px" }} header="Facial Recognition" modal className="p-fluid" footer={ImgDialogFooter} onHide={hideImgDialog}>
                    <div className="main">
                        Please Enter your Mail
                        <Input id="mail" name="mail" type="text" placeholder="Email" onChange={handleMailChange} />
                        <Button onClick={getUserImage} variant="contained" color="primary" style={{ margin: "10px auto" }}>
                            get user image
                        </Button>
                        <div className="img-container" style={{ position: "relative" }}>
                            <img id="first-img" src={firstImg} style={{ height: 300, width: 300 }} />
                            <canvas id="canvas1" width="300px" height="300px"></canvas>
                        </div>
                        <div className="img-container" style={{ position: "relative" }}>

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
                                                    <video ref={videoRef} id="second-img" height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: "10px" }} />
                                                    <canvas ref={canvasRef} id="canvas2" style={{ position: "absolute", top: 0, left: 0 }} />
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
                        <Button onClick={checkMatch} disabled={!firstImg || !secondImg} variant="contained" color="primary" style={{ margin: "10px auto" }}>
                            Check Match
                        </Button>
                        {matchFound == "found" ? <p>Match Found!!</p> : matchFound == "not found" ? <p>No matches found</p> : ""}
                        {noFacesFound ? <p>No faces found in first image. Please upload image with 1 face</p> : ""}
                        {moreThanOneFace ? <p>More than one face found in first image. Pleae upload photo with only one face</p> : ""}
                        {loading ? (
                            <Backdrop open={loading} style={{ zIndex: 100000, color: "fff" }}>
                                <p style={{ color: "#fff", fontSize: 20, fontWeight: 900 }}>Analyzing images...</p>
                                <CircularProgress color="secondary" />
                            </Backdrop>
                        ) : (
                            ""
                        )}
                    </div>

                </Dialog>
            </BoxContainer>
        );
    }
}
