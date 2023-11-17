import { Box } from "@chakra-ui/react";
import HeroSection from "../components/HeroSection";
import PollutionTypes from "../components/PollutionTypes";
import ModelCards from "../components/ModelCards";

const Home = () => {
  return (
    <Box>
      <HeroSection />
      {/* <PollutionTypes /> */}
      <ModelCards />
    </Box>
  );
};

export default Home;
