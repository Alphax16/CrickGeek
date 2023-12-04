import { Box, Center, Heading, AspectRatio, Text } from "@chakra-ui/react";
// import React from "react";
import { Blog } from "../components/Blog";
// import Blog from "../components/Blog";
// import Blog2 from "../components/Blog2";
// import { Blog2 } from "../components/Blog2";


const HowItWorks = () => {
//   const videoId = 'Z6E8il4JetI';
  const videoId = 'Tw3TjMuyjvQ';

  return (
    <Box py={"16"} bgColor={"primary.oceanBlue"} color="#fff">
      <Heading
        py={"4"}
        textAlign={"center"}
        fontSize={{ base: "2xl", sm: "4xl" }}
        fontWeight={"bold"}
      >
        How It Works?
      </Heading>
      <Box>
        <Center>
          {/* <Text textAlign={"justify"} width={"90%"}>
            {Blog.blogData}
          </Text> */}
          {/* <Box className="blog-container" dangerouslySetInnerHTML={{ __html: Blog.blogData }} textAlign={"justify"} width={"90%"} /> */}
          {/* <Box className="blog-container" dangerouslySetInnerHTML={{ __html: Blog.blogData }} textAlign={"justify"} width={"90%"} /> */}
          <Blog videoId={videoId} />
          {/* <Blog2 /> */}
        </Center>
      </Box>
    </Box>
  );
};

export default HowItWorks;