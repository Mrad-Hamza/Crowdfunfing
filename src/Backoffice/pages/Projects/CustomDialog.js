import React from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const CustomDialog = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">Opps No cocktail with those filters</DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
