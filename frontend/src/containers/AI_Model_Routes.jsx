import { Routes, Route } from "react-router-dom";

import ModelCards from "./components/ModelCards";
import WaterPotabilityPredictor from "./containers/AI Models/WaterPotabilityPredictor";
// import OilSpillDetector from "./containers/AI Models/OilSpillDetector";
// import NoisePollutionDetector from "./containers/AI Models/NoisePollutionDetector";
// import FireDetector from "./containers/AI Models/FireDetector";
// import AqiPredictor from "./containers/AI Models/AqiPredictor";


function AI_Model_Routes() {
    return (
      <Routes>
        <Route path="/" element={<ModelCards />} />
        {/* <Route path="aqi-predictor" element={<AqiPredictor />} /> */}
        <Route path="water-potability-predictor" element={<WaterPotabilityPredictor />} />
        {/* <Route path="oil-spill-detector" element={<OilSpillDetector />} />
        <Route path="noise-pollution-detector" element={<NoisePollutionDetector />} />
        <Route path="fire-detector" element={<FireDetector />} /> */}
      </Routes>
    );
  }

export default AI_Model_Routes