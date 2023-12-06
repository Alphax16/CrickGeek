import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import HeroSection from "../components/HeroSection";
// import PollutionTypes from "../components/PollutionTypes";
import ModelCards from "../components/ModelCards";
import Swal from "sweetalert2";


const Home = () => {
  useEffect(() => {
    Swal.fire({
      title: `Please read ⚠. Don't Skip!`,
      // text: `Confidence: ${Math.round(response.data.confidence * 100)}%`,
      html: `Being constrained on budget, we are using free deployment cloud services which offer very less bandwith and resources and have <strong>down time and crashes from time to time</strong>. If such case occurs, then <strong>kindly navigate to the main Home/Landing page and keep on refreshing the web-page multiple times or try again later</strong>.`,
      icon: "warning",
    });
  }, []);

  return (
    <Box>
      <HeroSection />
      {/* <PollutionTypes /> */}
      <ModelCards />
    </Box>
  );
};

export default Home;
