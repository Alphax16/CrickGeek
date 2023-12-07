import { Routes, Route } from "react-router-dom";

import ModelCards from "../components/ModelCards";
import IPL_Predictor from "./AI Models/IPL_Predictor";
import T20I_Innings_Predictor from "./AI Models/T20I_Score_Predictor";
import Umpire_Action_Images_Classifier from "./AI Models/Umpire_Action_Images_Classifier";
import ICC_Test_Cricket_Runs_Predictor from "./AI Models/ICC_Test_Cricket_Runs_Predictor";
// import OilSpillDetector from "./containers/AI Models/OilSpillDetector";
// import NoisePollutionDetector from "./containers/AI Models/NoisePollutionDetector";
// import FireDetector from "./containers/AI Models/FireDetector";
// import AqiPredictor from "./containers/AI Models/AqiPredictor";


function AI_Model_Routes() {
    const videoId = 'gDbORPJaOXw';

    return (
      <Routes>
        <Route path="/" element={<ModelCards />} />
        {/* <Route path="aqi-predictor" element={<AqiPredictor />} /> */}
        <Route path="ipl-score-predictor" element={<IPL_Predictor />} />
        <Route path="t20i-score-predictor" element={<T20I_Innings_Predictor />} />
        <Route path="icc-test-runs-predictor" element={<ICC_Test_Cricket_Runs_Predictor />} />
        
        <Route path="umpire-action-decision-classifier" element={<Umpire_Action_Images_Classifier videoId={videoId} mode={'prod'} />} />
        
        {/* <Route path="oil-spill-detector" element={<OilSpillDetector />} />
        <Route path="noise-pollution-detector" element={<NoisePollutionDetector />} />
        <Route path="fire-detector" element={<FireDetector />} /> */}
      </Routes>
    );
  }

export default AI_Model_Routes