import React, { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Tour from "./Tour";
import { TourProvider } from "./context/TourContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./containers/Home";
import AI_Model_Routes from "./containers/AI_Model_Routes";
import CrickStats from './containers/CrickStats';
import Quiz from "./containers/Quiz";
import NotFound from "./containers/NotFound";

import "./App.css";
import Statistics_Routes from "./containers/Statistics_Routes";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router y="16" bgColor="#12504B" color="#fff">
        <Navbar />
        <TourProvider>
          <Tour />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/how-it-works" element={<HowItWorks />} /> */}
            <Route path="/statistics/*" element={<Statistics_Routes />} />
            {/* <Route path="/visualizations" element={<Visualizations />} /> */}
            <Route path="/models/*" element={<AI_Model_Routes />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TourProvider>
        <Footer />
      </Router>
    </>
  )
}

export default App
