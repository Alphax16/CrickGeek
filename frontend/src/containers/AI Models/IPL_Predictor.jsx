import { Box, Button, Center, Input, Text, Select } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import instance from "../../api";
// import { ThreeCircles } from "react-loader-spinner";


const IPL_Predictor = () => {
  const [loading, setLoading] = useState(false); // Track loading status
  const [responseText, setResponseText] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  
  const [team1, selectTeam1] = useState('');
  const [team2, selectTeam2] = useState('');
  const [city, chooseCity] = useState('');
  const [tossDecision, setTossDecision] = useState('Head');
  const [tossWinner, selectTossWinner] = useState('');
  const [venue, selectVenue] = useState('');

  

  const options = {
    teams: ['MI', 'KKR', 'RCB', 'DC', 'CSK', 'RR', 'DD', 'GL', 'KXIP', 'SRH', 'RPS', 'KTK', 'PW'],

    venues: ['Rajiv Gandhi International Stadium, Uppal', 'Maharashtra Cricket Association Stadium',
              'Saurashtra Cricket Association Stadium', 'Holkar Cricket Stadium', 'M Chinnaswamy Stadium',
              'Wankhede Stadium', 'Eden Gardens', 'Feroz Shah Kotla', 'Punjab Cricket Association IS Bindra Stadium, Mohali', 
              'Green Park', 'Punjab Cricket Association Stadium, Mohali', 'Sawai Mansingh Stadium', 
              'MA Chidambaram Stadium, Chepauk', 'Dr DY Patil Sports Academy', 'Newlands', "St George's Park", 'Kingsmead', 
              'SuperSport Park', 'Buffalo Park', 'New Wanderers Stadium', 'De Beers Diamond Oval', 'OUTsurance Oval', 
              'Brabourne Stadium', 'Sardar Patel Stadium, Motera', 'Barabati Stadium', 
              'Vidarbha Cricket Association Stadium, Jamtha', 'Himachal Pradesh Cricket Association Stadium', 'Nehru Stadium',
              'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium', 'Subrata Roy Sahara Stadium',
              'Shaheed Veer Narayan Singh International Stadium', 'JSCA International Stadium Complex', 'Sheikh Zayed Stadium',
              'Sharjah Cricket Stadium', 'Dubai International Cricket Stadium'],

    tossDecisions: ['Heads', 'Tails'],

    cities: ['Hyderabad', 'Pune', 'Rajkot', 'Indore', 'Bangalore', 'Mumbai', 'Kolkata', 'Delhi', 'Chandigarh', 'Kanpur',
              'Jaipur', 'Chennai', 'Cape Town', 'Port Elizabeth', 'Durban', 'Centurion', 'East London', 'Johannesburg',
              'Kimberley', 'Bloemfontein', 'Ahmedabad', 'Cuttack', 'Nagpur', 'Dharamsala', 'Kochi', 'Visakhapatnam',
              'Raipur', 'Ranchi', 'Abu Dhabi', 'Sharjah', 'Dubai']
  };

  const abbvr = {MI: 'Mumbai Indians', KKR: 'Kolkata Knight Riders', RCB: 'Royal Challengers Bangalore', DC: 'Deccan Chargers', 
                  CSK: 'Chennai Super Kings', RR: 'Rajasthan Royals', DD: 'Delhi Daredevils', GL: 'Gujarat Lions', 
                  KXIP: 'Kings XI Punjab', SRH: 'Sunrisers Hyderabad', RPS: 'Rising Pune Supergiants', 
                  KTK: 'Kochi Tuskers Kerala', PW: 'Pune Warriors'};

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (team1 === team2) {
        console.log(team1);
        Swal.fire({
          title: `Same Winner Tie: ${abbvr[team1]}`,
  
          icon: "success",
        });
      }

      const data = {
        team1: abbvr[team1], team2: abbvr[team2], city, toss_decision: tossDecision === 'Head' ? 0 : 1, toss_winner: abbvr[tossWinner], venue: venue
      }

      console.log('Frontend Data:', data);

      const response = await instance.post(
        "/IPL-Predictor",
        data
      );
      console.log(response.data);

      setTimeout(() => {
        setLoading(false);
        Swal.fire({
          title: `Winner Team: ${response.data.winner_team}`,
  
          icon: "success",
        }); 
        setResponseText(response.data);
        setShowResponse(true);
      }, 4000);
    } catch (err) {
      console.error("Error fetching tree data:", err);
      setLoading(false);
    }
  };

  return (
    <Box bg={"#12504B"} py={"16"}>
      {/* {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor="#00FF00"
            innerCircleColor="#0000FF"
            middleCircleColor="#FF0000"
          />
        </div>
      )} */}
      <LoadingSpinner isOpen={loading} />
      <Center flexDir={"column"}>
        <Text
          fontSize={{ base: "xl", lg: "4xl" }}
          fontWeight={"bold"}
          my={"4"}
          color={"#fff"}
        >
          IPL Score Predictor
        </Text>

        <form style={{ width: "40%", color: "#fff" }} onSubmit={handlesubmit}>         
            <Select
              value={team1 || ""}
              onChange={(e) => selectTeam1(e.target.value)}
              placeholder="Choose First Team"
              backgroundColor={'#1a382b'}
              my={"2"}
            >
              {
                options['teams'].map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: '#1a382b' }}>
                    {abbvr[opt]}
                  </option>
                ))
              }
            </Select>
            
            <Select
              value={team2 || ""}
              onChange={(e) => selectTeam2(e.target.value)}
              placeholder="Choose Second Team"
              backgroundColor={'#1a382b'}
              my={"2"}
            >
              {
                options['teams'].map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: '#1a382b' }}>
                    {abbvr[opt]}
                  </option>
                ))
              }
            </Select>
            {/* city = 'Hyderabad'
            # toss_decision = 0
            # toss_winner = 'Royal Challengers Bangalore'
            # venue = 'Rajiv Gandhi International Stadium, Uppal' */}
            <Select
              value={city || ""}
              onChange={(e) => chooseCity(e.target.value)}
              placeholder="Choose the City"
              backgroundColor={'#1a382b'}
              my={"2"}
            >
              {
                options['cities'].map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: '#1a382b' }}>
                    {opt}
                  </option>
                ))
              }
            </Select>

            <Select
              value={tossDecision || ""}
              onChange={(e) => setTossDecision(e.target.value)}
              placeholder="Enter the Toss Decision"
              backgroundColor={'#1a382b'}
              my={"2"}
            >
              {
                options['tossDecisions'].map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: '#1a382b' }}>
                    {opt}
                  </option>
                ))
              }
            </Select>

            {
                team1 && team2 &&
                  (<Select
                    value={team1 || ""}
                    onChange={(e) => selectTossWinner(e.target.value)}
                    placeholder="Choose the Toss Winner"
                    backgroundColor={'#1a382b'}
                    my={"2"}
                  >
                        <option key={team1} value={team1} style={{ backgroundColor: '#1a382b' }}>
                          {abbvr[team1]}
                        </option>
                        {
                          (team1 != team2) && (<option key={team2} value={team2} style={{ backgroundColor: '#1a382b' }}>
                            {abbvr[team2]}
                          </option>)
                        }
                  </Select>)
              }
            
            <Select
              value={venue || ""}
              onChange={(e) => selectVenue(e.target.value)}
              placeholder="Choose the Match Stadium's Venue"
              backgroundColor={'#1a382b'}
              my={"2"}
            >
              {
                options['venues'].map((opt) => (
                  <option key={opt} value={opt} style={{ backgroundColor: '#1a382b' }}>
                    {opt}
                  </option>
                ))
              }
            </Select>
            
          <Center>
            <Button type="submit" my={"2"}>Get Predictions</Button>
          </Center>
        </form>
        {/* {showResponse && <p>{responseText}</p>} */}
      </Center>
    </Box>
  );
};

export default IPL_Predictor;
