import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import instance from "../../api";


const T20I_Innings_Predictor = () => {
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState('');
  
  const [inngRuns, setInngRuns] = useState(0);
  const [inngWickets, setInngWickets] = useState(0);
  const [ballsRemaining, setBallsRemaining] = useState(0);
  const [totalBatterRuns, setTotalBatterRuns] = useState(0);
  const [totalNonStrikerRuns, setTotalNonStrikerRuns] = useState(0);
  const [batterBallsFaced, setBatterBallsFaced] = useState(0);
  const [nonStrikerBallsFaced, setNonStrikerBallsFaced] = useState(0);
  const [runsFromBall, setRunsFromBall] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        inng_runs: inngRuns, inng_wickets: inngWickets, balls_remaining: ballsRemaining, total_batter_runs: totalBatterRuns,
        total_non_striker_runs: totalNonStrikerRuns, batter_balls_faced: batterBallsFaced,
        non_striker_balls_faced: nonStrikerBallsFaced, runs_from_ball: runsFromBall,
      };

      // Innings Runs	
      // Innings Wickets	
      // Balls Remaining	
      // Total Batter Runs	
      // Total Non Striker Runs 
      // Batter Balls Faced
      // Non Striker Balls Faced	
      // Runs From Ball

      if (Object.values(data).every(val => (val == '') || (val == 0))) {
        setLoading(false);
        
        Swal.fire({
          title: `T20I Target Score: ${2} runs`,
          icon: "success",
        });

        setResponseText(0);
      }

      const response = await instance.post(
        "/T20I-Mens-Cricket-Match-Predictor",
        data
      );

      setTimeout(() => {
        setLoading(false);
        
        Swal.fire({
          title: `T20I Target Score: ${Math.round(parseFloat(response.data.T20I_Target_Score))} runs`,
          icon: "success",
        });

        setResponseText(response.data);
      }, 4000);
    } catch (err) {
      console.error("Error fetching data:", err);
      setLoading(false);
    }
  };

  return (
    <Box bg={"#12504B"} py={"16"}>
      <LoadingSpinner isOpen={loading} />
      <Center flexDir={"column"}>
        <Text fontSize={{ base: "xl", lg: "4xl" }}
              fontWeight={"bold"}
              my={"4"}
              color={"#fff"}
        >
          IPL Score Predictor
        </Text>
        <form style={{ width: "40%", color: "#fff" }} onSubmit={handleSubmit}>
          
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Inning Runs"
            onChange={(e) => setInngRuns(e.target.value)}
          />

          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Inning Wickets"
            onChange={(e) => setInngWickets(e.target.value)}
          />

          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Balls Remaining"
            onChange={(e) => setBallsRemaining(e.target.value)}
          />

          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Total Batter Runs"
            onChange={(e) => setTotalBatterRuns(e.target.value)}
          />
          
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Total Non-Striker Runs"
            onChange={(e) => setTotalNonStrikerRuns(e.target.value)}
          />

          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Batter Balls Faced"
            onChange={(e) => setBatterBallsFaced(e.target.value)}
          />

          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Non-Striker Balls Faced"
            onChange={(e) => setNonStrikerBallsFaced(e.target.value)}
          />

          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Runs from Ball"
            onChange={(e) => setRunsFromBall(e.target.value)}
          />

          <Button type="submit" my={"2"}>Get Predictions</Button>
        </form>
      </Center>
    </Box>
  );
};

export default T20I_Innings_Predictor;
