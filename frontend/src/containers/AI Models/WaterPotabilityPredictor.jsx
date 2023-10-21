import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
// import { ThreeCircles } from "react-loader-spinner";


const WaterPotabilityPredictor = () => {
  const [loading, setLoading] = useState(false); // Track loading status
  const [responseText, setResponseText] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const [ph, setPh] = useState();
  const [Hardness, setHardness] = useState();
  const [Solids, setSolids] = useState();
  const [Chloramines, setChloramines] = useState();
  const [Organic_carbon, setOrganic_carbon] = useState();

  const [Trihalomethanes, setTrihalomethanes] = useState();
  const [Turbidity, setTurbidity] = useState();
  const [Sulfate, setSulfate] = useState();
  const [Conductivity, setConductivity] = useState();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://geekco.onrender.com/api/ai/water-potability-predictor",
        {
          ph,
          Hardness,
          Solids,
          Chloramines,
          Organic_carbon,
          Trihalomethanes,
          Turbidity,
          Sulfate,
          Conductivity,
        }
      );
      console.log(response.data);

      setTimeout(() => {
        setLoading(false);
        Swal.fire({
          title: `${response.data} Water Sample`,
  
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
          Water Potability Predictor
        </Text>
        <form style={{ width: "40%", color: "#fff" }} onSubmit={handlesubmit}>
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="ph"
            required
            onChange={(e) => setPh(e.target.value)}
          />
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Hardness"
            onChange={(e) => setHardness(e.target.value)}
          />
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Solids"
            onChange={(e) => setSolids(e.target.value)}
          />
          <Input
            my={"2"}
            type="text"
            placeholder="Chloramines"
            color={"#fff"}
            onChange={(e) => setChloramines(e.target.value)}
          />
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Sulfate"
            onChange={(e) => setSulfate(e.target.value)}
          />
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Conductivity"
            onChange={(e) => setConductivity(e.target.value)}
          />
          <Input
            my={"2"}
            type="text"
            placeholder="Organic Carbon"
            color={"#fff"}
            onChange={(e) => setOrganic_carbon(e.target.value)}
          />
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Trihalomethanes"
            onChange={(e) => setTrihalomethanes(e.target.value)}
          />
          <Input
            my={"2"}
            type="text"
            color={"#fff"}
            placeholder="Turbidity"
            onChange={(e) => setTurbidity(e.target.value)}
          />
          {/* <Button type="submit">Get Predictions</Button> */}
          <Center>
            <Button type="submit" my={"2"}>Get Predictions</Button>
          </Center>
        </form>
        {/* {showResponse && <p>{responseText}</p>} */}
      </Center>
    </Box>
  );
};

export default WaterPotabilityPredictor;
