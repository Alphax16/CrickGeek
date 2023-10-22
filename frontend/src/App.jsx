import React, { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Tour from "./Tour";
import { TourProvider } from "./context/TourContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./containers/Home";
import Quiz from "./containers/Quiz";
import NotFound from "./containers/NotFound";

import './App.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <TourProvider>
          <Tour />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/how-it-works" element={<HowItWorks />} /> */}
            {/* <Route path="/statistics" element={<TreeStats />} /> */}
            {/* <Route path="/visualizations" element={<Visualizations />} /> */}
            {/* <Route path="/models/*" element={<AI_Model_Routes />} /> */}
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
