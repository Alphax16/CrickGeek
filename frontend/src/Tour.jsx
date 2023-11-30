import { useState } from "react";
import Joyride from "react-joyride";
import { useNavigate } from "react-router-dom";
import { useTour } from "./context/TourContext";

function Tour() {
  const [runTour, setRunTour] = useState(false);
  const navigate = useNavigate();
  const { startTour } = useTour();

  const tourSteps = [
    // Define steps
    {
      target: "body",
      content: "This is a quick Feature Demo Tour of our Web-App, 'CrickGeek' 🏏.",
      placement: "center",
    },
    {
      target: ".nav-logo",
      content: "Kudos! You spotted it successfully, GeekBall⚾. Hover and/or Tap to flaunt your bowling skills.",
    },
    {
      target: ".navbox",
      content: "This tab contains all features 🧰 of offered by 'CrickGeek'.",
    },
    {
      target: ".nav-home",
      content: "This tab is for leading to the Home page 🏡 of 'CrickGeek'.",
    },
    {
      target: ".nav-maps",
      content: "This tab leads to Cartographic Analysis 🗺 of Indian region Forest Cover of our application 'CrickGeek'.",
    },
    {
      target: ".nav-statistics",
      content: "This ta leads to Statistical Analysis 📈 of the Global Historical Cricket data being used by our AI models.",
    },
    {
      target: ".nav-visualizations",
      content: "This tab leads to the Exploratory Data Analysis, EDA 🔎 section of out Time Series datasets.",
    },
    {
      target: ".nav-ai-models",
      content: "This tab contains all the AI services 🧠 offered by 'CrickGeek' for aiding monitoring and predicting Cricket player and team performances.",
    },
    {
      target: ".nav-quiz",
      content: "This tab leads to an 'CRICK-QUIZ' ❓ session where you can test your knowledge about Cricket.",
    },
    {
      target: ".facts",
      content: "This is our 'Fact-O-Bot' 🤖. Click it to get facts related to Cricket.",
    },
    {
      target: ".how-it-works",
      content: "This button will lead to our project's documentation 📃 blog section.",
    },
    {
      target: ".pollution-types",
      content: "These tabs will lead you to Wikipedia articles for grabbing some insights 📚 about Pollution and their Types.",
    },
    {
      target: ".models",
      content: "These the all the AI Services 🤖 which 'CrickGeek' offers.",
    },
    
    // {
    //   target: buttonRef.current,
    //   content: "This is a Chakra UI Button element.",
    //   placement: "bottom",
    // },
  ];

  // useEffect(() => {
  //   if (startTour) {
  //     setRunTour(true);
  //   }
  // }, [startTour]);

  // useEffect(() => {
  //   if (window.location.pathname === "/") {
  //     setRunTour(true);
  //   }
  // }, []);

  // Handle the tour finish event
//   const handleTourFinish = () => {
//     // Perform actions when the tour is finished
//   };

  return (
    <Joyride
      steps={tourSteps}
      run={startTour}
      continuous={true}
      showProgress={true}
      showSkipButton={true}
      callback={(tour) => {
        if (tour.status === "finished") {
          setRunTour(false);
        }
      }}
    />
  );
}

export default Tour;
