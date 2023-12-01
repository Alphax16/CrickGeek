import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ExcelTable from "../components/Table/Table";
import ImagesTable from "../components/Table/ImagesTable";
import instance from "../api";
import CrickStats from "./CrickStats";
// import { IPL_Table } from "./IPL_Table";


function Statistics_Routes() {
    const location = useLocation();
    const [data, setData] = useState([]);

    const dataAPIs = {
        "IPL": "/IPL-Predictor",
        "IPL-Innings": "/IPL-Predictor-2008-2017",
        "T20I": "/T20I-Mens-Cricket-Match-Predictor",
        "ODI": "/ODI-Predictor",
        "Umpire-Action-Images": "/Umpire-Action-Decision-Classifier",
    };

    function getEndOfRoute() {
        const pathArray = location.pathname.split("/");
        return pathArray[pathArray.length - 1];
    }

    useEffect(() => {
        const routeParameter = getEndOfRoute();
        console.log('Route:', routeParameter);

        async function fetchData() {
            try {
                console.log('dataAPIs[routeParameter] =', dataAPIs[routeParameter]);
                const response = await instance.get(dataAPIs[routeParameter]);
                console.log("CSV2JSON Data's Type:", typeof(response.data));
                console.log("CSV2JSON Data's Type Checking Again...(for Array):", Array.isArray(response.data) ? "array" : typeof response.data);
                console.log('CSV2JSON Data:', response.data);
                setData(response.data);
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
            <Route exact path="/" element={<CrickStats />} />
            <Route exact path="/IPL" element={<ExcelTable data={data} />} />
            <Route exact path="/IPL-Innings" element={<ExcelTable data={data} />} />
            <Route exact path="/ODI" element={<ExcelTable data={data} />} />
            <Route exact path="/Umpire-Action-Images" element={<ImagesTable data={data} serviceName={'Umpire_Actions_Images_Data'} />} />
        </Routes>
    );
}

export default Statistics_Routes;
