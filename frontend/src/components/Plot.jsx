import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";


const TimeSeriesChart = ({ data, width = "100%", height = "auto" }) => {
  const chartRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [chart, setChart] = useState(null);
  const [years, setYears] = useState([]);
  const [values, setValues] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [divisions, setDivisions] = useState(5);

  useEffect(() => {
    if (data.length > 0 && selectedLocation) {
      filterDataByLocation();
    }
  }, [data, selectedLocation]);

  useEffect(() => {
    if (years.length > 0 && values.length > 0) {
      createChart();
    }
  }, [years, values]);

  useEffect(() => {
    const minHeight = 100;
    const calculatedHeight = divisions * 20 + minHeight;
    setHeight(calculatedHeight);
  }, [divisions]);

  const setHeight = (calculatedHeight) => {
    chartRef.current.style.height = `${calculatedHeight}px`;
  };

  const filterDataByLocation = () => {
    const filteredData = data.filter(
      (item) => item["State/UT"] === selectedLocation
    );

    if (filteredData.length === 0) {
      console.log(`No data available for ${selectedLocation}`);
      setYears([]);
      setValues([]);
      return;
    }

    console.log("Filtered Data:", filteredData);

    const yearKeys = Object.keys(filteredData[0]).filter(
      (key) => !isNaN(key)
    );
    const years = yearKeys.map(Number);
    const values = yearKeys.map((year) => {
      return parseFloat(filteredData[0][year].replace(/,/g, "")) || 0;
    });

    setYears(years);
    setValues(values);

    setMinValue(Math.min(...values));
    setMaxValue(Math.max(...values));
  };

  const createChart = () => {
    if (chart) {
      chart.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    setChart(
      new Chart(ctx, {
        type: "line",
        data: {
          labels: years,
          datasets: [
            {
              label: `Tree Cover in ${selectedLocation}`,
              data: values,
              borderColor: "steelblue",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "Year",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: `Tree Cover in ${selectedLocation}`,
              },
              ticks: {
                stepSize: calculateStepSize(),
                min: minValue,
                max: maxValue,
              },
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      })
    );
  };

  const selectLocation = (location) => {
    setSelectedLocation(location);
  };

  const calculateStepSize = () => {
    return (maxValue - minValue) / divisions;
  };

  const plotColor = useColorModeValue("white", "gray.700");

  return (
    <Box p="4" borderWidth="1px" borderRadius="lg" bg={plotColor} width={width} height={height}>
      <Flex align="center" justify="space-between">
        <Text>Select a Location:</Text>
        <Select
          value={selectedLocation || ""}
          onChange={(e) => selectLocation(e.target.value)}
          placeholder="Select a Location"
        >
          {Array.from(new Set(data.map((item) => item["State/UT"]))).map(
            (location) => (
              <option key={location} value={location}>
                {location}
              </option>
            )
          )}
        </Select>
      </Flex>
      <Box mt="4">
        <canvas ref={chartRef}></canvas>
      </Box>
    </Box>
  );
};

export default TimeSeriesChart;
