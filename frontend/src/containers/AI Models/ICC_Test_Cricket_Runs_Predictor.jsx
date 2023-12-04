import { Box, Button, Center, Input, Text, Select } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import instance from "../../api";


const ICC_Test_Cricket_Runs_Predictor = () => {
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState('');

  // matches_played, innings, not_out, highest_score, avg, centuries, fifties, ducks, country, years_played, debut_year
  const [matchesPlayed, setMatchesPlayed] = useState(0);
  const [innings, setInnings] = useState(0);
  const [timesNotOut, setTimesNotOut] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [average, setAverage] = useState(0);
  const [timesCenturies, setTimesCenturies] = useState(0);
  const [timesFifties, setTimesFifties] = useState(0);
  const [duckCount, setDuckCount] = useState(0);
  const [country, setCountry] = useState('');
  const [yearsPlayed, setYearsPlayed] = useState(0);
  const [debutYear, setDebutYear] = useState();

  const inpTxtColor = '#ffffff';
  const optsColor = '#082438';

  const options = {
    countries: [
      'INDIA', 'AUS', 'SA', 'ENG', 'SL', 'WI', 'PAK', 'NZ', 'ZIM',
       'BDESH', 'AUS/SA', 'INDIA/PAK', 'AUS/ENG', 'AFG', 'IRE', 'NZ/WI',
       'ENG/INDIA', 'ENG/SA', 
      //  '3', 
       'ENG/IRE', 'SA/ZIM'
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        matches_played: matchesPlayed, innings: innings, not_out: timesNotOut, highest_score: highestScore, avg: average, centuries: timesCenturies, fifties: timesFifties, ducks: duckCount, country: country, years_played: yearsPlayed, debut_year: debutYear
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
          title: `T20I Target Score: ${2} runs (approx.)`,
          icon: "success",
        });

        setResponseText(0);
      }

      const response = await instance.post(
        "/ICC-Test-Cricket-Runs-Predictor",
        data
      );

      setTimeout(() => {
        setLoading(false);
        
        Swal.fire({
          title: `ICC Target Runs Scored: ${Math.round(parseFloat(response.data.predicted_runs))} runs`,
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
    <Box bg={"primary.oceanBlue"} py={"16"} minW={"100vw"} minH={"130vh"}>
      <LoadingSpinner isOpen={loading} />
      <Center flexDir={"column"}>
        <Text fontSize={{ base: "xl", lg: "4xl" }}
              fontWeight={"bold"}
              my={"4"}
              color={inpTxtColor}
        >
          ICC Test Cricket Runs Calculator
        </Text>
        <form style={{ width: "40%", color: inpTxtColor }} onSubmit={handleSubmit}>
          
          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Matches Played"
            onChange={(e) => setMatchesPlayed(e.target.value)}
          />

          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Innings Runs"
            onChange={(e) => setInnings(e.target.value)}
          />

          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Times Not Out"
            onChange={(e) => setTimesNotOut(e.target.value)}
          />

          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Highest Score"
            onChange={(e) => setHighestScore(e.target.value)}
          />
          
          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Average"
            onChange={(e) => setAverage(e.target.value)}
          />

          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Times Centuries Scored"
            onChange={(e) => setTimesCenturies(e.target.value)}
          />

          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Times Fifties Scored"
            onChange={(e) => setTimesFifties(e.target.value)}
          />

          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Duck Count"
            onChange={(e) => setDuckCount(e.target.value)}
          />

          <Select
            value={country || ""}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Select Country"
            backgroundColor={optsColor}
            my={"3"}
          >
            {
              options['countries'].map((opt) => (
                <option key={opt} value={opt} style={{ backgroundColor: optsColor }}>
                  {opt}
                </option>
              ))
            }
          </Select>

          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Years Played"
            onChange={(e) => setYearsPlayed(e.target.value)}
          />

          <Input
            my={"3"}
            type="text"
            color={inpTxtColor}
            placeholder="Debut Year"
            onChange={(e) => setDebutYear(e.target.value)}
          />

          <Center mt={"5%"}>
            <Button type="submit" my={"3"}>Get Prediction</Button>
          </Center>
        </form>
      </Center>
    </Box>
  );
};

export default ICC_Test_Cricket_Runs_Predictor;
