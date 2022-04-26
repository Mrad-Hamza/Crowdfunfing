import React, { useEffect } from "react";
import CompaignComponent from "./CompaignComponent";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "../../features/actions/projects.actions";
import URL from "../../features/constants/services.compaigns";
import axios from "axios";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const Compaigns = ()=> {
    const compaigns = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchCompaigns= async () => {
        const result = await axios.get(URL.baseApiUrl + URL.compaigns.fetchCompaigns).catch((err) => {
            console.log("Err", err);
        });
        console.log("🚀 ~ file:Compaigns.js ~ line 17 ~ fetchCompaigns ~ result", result);
        dispatch(setProjects(result.data));
    };

    useEffect(() => {
        fetchCompaigns();
    }, []);

    console.log("Compaigns:", compaigns);
    return (
        <div>
           
                <CompaignComponent />

        </div>
    );
};

export default Compaigns;