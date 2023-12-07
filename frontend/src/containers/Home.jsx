import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import HeroSection from "../components/HeroSection";
// import PollutionTypes from "../components/PollutionTypes";
import ModelCards from "../components/ModelCards";
import Swal from "sweetalert2";
import displayAlertBox from "../components/AlertBox";


const Home = () => {
  const videoId = 'gDbORPJaOXw';

  const alertTitle = `Please read ⚠. Don't Skip!`;
  const alertBody = `Being constrained on budget, we are using free tier deployment cloud services which offer very less bandwith and resources and have <strong>down time and crashes from time to time</strong>. 
  <br /><br />
  If such case occurs, then <strong>kindly navigate to the main Home/Landing page and keep on refreshing the web-page multiple times or try again later</strong>.
  <br /><br />
  You can watch the complete demo video covering all the features of our application at-
  <a href='https://www.youtube.com/watch?v=${videoId}' 
    target='_blank' 
    style="color: blue" 
    onmouseover="this.style.textDecoration='underline'"
    onmouseout="this.style.textDecoration='none'"
  >
      <strong>
          https://www.youtube.com/watch?v=${videoId}
      </strong>
  </a>`;

  useEffect(() => {
    displayAlertBox({ title: alertTitle, body: alertBody });
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
