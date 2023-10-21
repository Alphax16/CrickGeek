import React, { useEffect, useState, useRef } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel, Popover, PopoverContent, PopoverBody, PopoverTrigger, Button } from "@chakra-ui/react";
import * as d3 from "d3";


const Plot = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isYearSelectorOpen, setIsYearSelectorOpen] = useState(false);

  const svgRef = useRef();

  const toggleYearSelector = () => {
    setIsYearSelectorOpen(!isYearSelectorOpen);
  };

  const selectYear = (year) => {
    setSelectedYear(`${year}`);
    setIsYearSelectorOpen(false);
  };
   

  const selectLocation = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    if (data.length > 0 && selectedLocation && selectedYear) {
      createD3Plot();
    }
  }, [data, selectedLocation, selectedYear]);

  const createD3Plot = () => {
    console.log("Creating D3 plot...");
    console.log("Selected Year:", selectedYear);
    console.log("Selected Location:", selectedLocation);

    d3.select(svgRef.current).selectAll("*").remove();

    const filteredData = data.filter(
      (item) =>
        item['State/UT'] === selectedLocation &&
        item[`${selectedYear}`] !== undefined
    );

    console.log("Filtered Data (before preprocessing):", filteredData);

    filteredData.forEach((item) => {
      for (const key in item) {
        if (key === `${selectedYear}`) {
          const rawValue = item[key];
          item[key] = `${rawValue}`;
        } else {
          item[key] = `${item[key]}`;
        }
      }
    });

    console.log("Filtered Data (after preprocessing):", filteredData);

    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
  
    const svg = d3.select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    const xScale = d3
      .scaleLinear()
      .domain([1987, 2013])
      .range([0, width]);
  
    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(filteredData, (d) => d[selectedYear]) || 0,
      ])
      .nice()
      .range([height, 0]);
  
    const line = d3
      .line()
      .x((d) => xScale(+d.Year))
      .y((d) => yScale(d[selectedYear]));
  
    svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));
  
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));
  
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + margin.top + 10)
      .style("text-anchor", "middle")
      .text("Year");
  
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0 - height / 2)
      .attr("y", 0 - margin.left)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(`Tree Cover in ${selectedYear}`);
  };
  
  const locationOptions = [...new Set(data.map(item => item['State/UT']))];
  

  return (
    <div id="map">
      <VStack
        justifyContent="center"
        alignItems="center"
        minH="100vh"
        w="100vw"
        spacing={4}
        bg="#12504B"
        py={"16"}
      >
        <Box p={4} color="#fff">
          <FormControl>
            <FormLabel htmlFor="yearSelect">Select a Year:</FormLabel>
            <Popover
              isOpen={isYearSelectorOpen}
              onClose={toggleYearSelector}
              placement="bottom-start"
            >
              <PopoverTrigger>
                <Button
                  id="yearSelect"
                  variant="outline"
                  bg="teal.200"
                  onClick={toggleYearSelector}
                  zIndex={1}
                >
                  {selectedYear || "Select a Year"}
                </Button>
              </PopoverTrigger>

              <PopoverContent zIndex={2}>
                <PopoverBody>
                  <VStack spacing={2}>
                    {[1987, 1989, 1991, 1993, 1995, 1997, 1999, 2001, 2003, 2005, 2007, 2011, 2013].map((year) => (
                      <Button
                        key={year}
                        variant="ghost"
                        onClick={() => selectYear(year)}
                        isActive={year === selectedYear}
                      >
                        {year}
                      </Button>
                    ))}
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </FormControl>
        </Box>

        <Box p={4} color="#fff">
          <FormControl>
            <FormLabel htmlFor="locationSelect">Select a Location:</FormLabel>
            <select
              id="locationSelect"
              className="form-select"
              value={selectedLocation}
              onChange={(e) => selectLocation(e.target.value)}
            >
              <option value="">Select a Location</option>
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </FormControl>
        </Box>

        <Box w="100%" h="500px">
          <svg ref={svgRef}></svg>
        </Box>
      </VStack>
    </div>
  );
};

export default Plot;
