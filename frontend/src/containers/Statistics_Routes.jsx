import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import ExcelTable from "../components/Table/Table";
import ImagesTable from "../components/Table/ImagesTable";
import instance from "../api";
import CrickStats from "./CrickStats";
import NotFound from "./NotFound";
import { csvToJson } from "../utils/csvFuncs";

import axios from "axios";

// import { IPL_Table } from "./IPL_Table";


function Statistics_Routes() {
    const location = useLocation();
    const [data, setData] = useState([]);

    // const dataAPIs = {
    //     "IPL": "/IPL-Predictor",
    //     "IPL-Innings": "/IPL-Predictor-2008-2017",
    //     "T20I": "/T20I-Mens-Cricket-Match-Predictor",
    //     "ODI": "/ODI-Predictor",
    //     "ICC-Test-Cricket": "/ICC-Test-Cricket-Runs-Predictor",
    //     "Umpire-Action-Images": "/Umpire-Action-Decision-Classifier",
    // };

    const basePath = "/assets/Data"
    const dataFilePaths = {
        "IPL": "IPL2/IPL_Data.csv",
        "IPL-Innings": "IPL/IPL_Innings_Data.csv",
        "T20I": "IPL/IPL_Data.csv",
        "ODI": "ODI/ODI_Dataset_Cleaned_Final_101.csv",
        "ICC-Test-Cricket": "ICC/ICC_Test_Cricket_Runs_Data.csv",
        "Umpire-Action-Images": "Umpire-Action-Images/UmpireActionImages.json",
    };

    // const titles = {
    //     "IPL": "IPL Cricket Match Statistics",
    //     "IPL-Innings": "IPL Innings Statistics",
    //     "T20I": "T20 International Cricket Match Statistics",
    //     "ODI": "ODI Cricket Match Statistics",
    //     "ICC-Test-Cricket": "ICC Test Cricket Statistics",
    //     "Umpire-Action-Images": "Umpire Action Data",
    // };

    function getEndOfRoute() {
        const pathArray = location.pathname.split("/");
        return pathArray[pathArray.length - 1];
    }

    useEffect(() => {
        const routeParameter = getEndOfRoute();
        console.log('Route:', routeParameter);

        // async function fetchData() {
        //     try {
        //         console.log('dataAPIs[routeParameter] =', dataAPIs[routeParameter]);
        //         const response = await instance.get(dataAPIs[routeParameter]);
        //         console.log("CSV2JSON Data's Type:", typeof(response.data));
        //         console.log("CSV2JSON Data's Type Checking Again...(for Array):", Array.isArray(response.data) ? "array" : typeof response.data);
        //         console.log('CSV2JSON Data:', response.data);
        //         setData(response.data);
        //     } catch (err) {
        //         console.error("Error fetching data:", err);
        //     }
        // }
        
        async function fetchData() {
            try {
                console.log('dataAPIs[routeParameter] =', dataFilePaths[routeParameter]);
                // const response = await instance.get(dataAPIs[routeParameter]);
                let tableData;
                const path = `${basePath}/${dataFilePaths[routeParameter]}`;
                if (routeParameter != "Umpire-Action-Images") {
                    // console.log("CSV2JSON Data's Type:", typeof(response.data));
                    // console.log("CSV2JSON Data's Type Checking Again...(for Array):", Array.isArray(response.data) ? "array" : typeof response.data);
                    // console.log('CSV2JSON Data:', response.data);
                    tableData = await csvToJson(path);
                    // setData(tableData);
                } else {
                    const response = await axios.get(path);
                    tableData = response.data;
                    // setData(tableData);
                }
                console.log('tableData:', tableData);
                setData(tableData);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        if (routeParameter !== "statistics") {
            fetchData();
        }
    }, [location.pathname]);

    return (
        <Routes>
            {/* <Route path="/IPL" element={<IPL_Table />} /> */}
            <Route exact path="/" element={<CrickStats title={'Global Cricket Statistics'} />} />
            <Route exact path="/IPL" element={<ExcelTable data={data} title={'IPL Cricket Match Statistics'} />} />
            <Route exact path="/IPL-Innings" element={<ExcelTable data={data} title={'IPL Innings Statistics'} />} />
            <Route exact path="/ODI" element={<ExcelTable data={data} title={'ODI Cricket Match Statistics'} />} />
            <Route exact path="/ICC-Test-Cricket" element={<ExcelTable data={data} title={'ICC Test Cricket Statistics'} />} />

            <Route exact path="/Umpire-Action-Images" element={<ImagesTable data={data} serviceName={'Umpire_Actions_Images_Data'} title={'Umpire Action Images Data'} />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default Statistics_Routes;
