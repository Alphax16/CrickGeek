import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Heading } from '@chakra-ui/react'
import ExcelTable from '../components/Table/ExcelTable'
import instance from '../api'


export const IPL_Table = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  console.log('IPL_Table.jsx component rendered successfully!');

  function getEndOfRoute() {
      const pathArray = location.pathname.split("/");
      return pathArray[pathArray.length - 1];
  }

  useEffect(() => {
      console.log('useEffect() of Statistics_Routes.jsx worked!!');
      const routeParameter = getEndOfRoute();
      // console.log('Current pathname:', location.pathname);
      console.log('Route parameter:', routeParameter);
      
      async function fetchData() {
          try {
              const response = await instance.get("/IPL-Predictor");
              console.log('CSV2JSON Data (IPL_Table.jsx Component):', response.data[0]);
              setData(response.data);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      }

      // if (routeParameter) {
          fetchData();
      // }
  }, []);

  return (
    <Box py={"16"} bgColor={"primary.oceanBlue"} color="#fff">
      <Heading
        py={"4"}
        textAlign={"center"}
        fontSize={{ base: "2xl", sm: "4xl" }}
        fontWeight={"bold"}
      >
        IPL Data Statistics:
      </Heading>
        {data && <ExcelTable data={data} />}
    </Box>
  )
}
