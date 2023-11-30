import React from 'react'
import { Box, Heading, VStack } from '@chakra-ui/react';
import Cards from '../components/Cards';


const CrickStats = () => {
    const data = [
        {
          "title": "IPL Cricket Match Statistics",
          "imageSrc": "assets/Statistics/IPL_Cricket_Statistics.jpg",
          "description": "Explore a rich dataset containing detailed statistics from IPL cricket matches. Analyze player performances, team strategies, and match outcomes for a comprehensive understanding of the thrilling world of IPL cricket.",
          "linkTo": "/statistics/IPL"
        },
        {
          "title": "IPL Innings Statistics",
          "imageSrc": "assets/Statistics/IPL_Cricket_Statistics.jpg",
          "description": "Dive into the fascinating realm of IPL cricket through this meticulously curated dataset. Uncover trends, track player achievements, and gain valuable insights into the dynamics of one of the most popular T20 cricket leagues in the world.",
          "linkTo": "/statistics/IPL-Innings"
        },
        {
          "title": "T20 Innings Men Cricket Match Statistics",
          "imageSrc": "assets/Statistics/IPL_Cricket_Statistics.jpg",
          "description": "Immerse yourself in the world of IPL cricket with these comprehensive stats. From batting averages to match outcomes, this provides a detailed look at the performances that define the excitement of IPL cricket.",
          "linkTo": "/statistics/T20I"
        },
        {
          "title": "ODI Cricket Match Statistics",
          "imageSrc": "assets/Statistics/IPL_Cricket_Statistics.jpg",
          "description": "Unlock the potential of cricket analysis with this IPL Cricket Match Statistics dataset. Whether you're a fan, analyst, or researcher, this dataset offers a treasure trove of information to unravel the intricacies of IPL matches.",
          "linkTo": "/statistics/ODI"
        },
        {
          "title": "Umpire Action Images Dataset",
          "imageSrc": "assets/Statistics/IPL_Cricket_Statistics.jpg",
          "description": "Experience the intensity of IPL cricket through the lens of statistics. This dataset captures the highs and lows, the records and upsets, providing a detailed account of IPL matches for enthusiasts and analysts alike.",
          "linkTo": "/statistics/Umpire-Action-Images"
        },
        // {
        //   "title": "IPL Cricket Match Statistics",
        //   "imageSrc": "assets/Statistics/IPL_Cricket_Statistics.jpg",
        //   "description": "Explore a rich dataset containing detailed statistics from IPL cricket matches. Analyze player performances, team strategies, and match outcomes for a comprehensive understanding of the thrilling world of IPL cricket.",
        //   "linkTo": "/statistics/IPL"
        // },
        // {
        //   "title": "IPL Cricket Match Statistics",
        //   "imageSrc": "assets/Statistics/IPL_Cricket_Statistics.jpg",
        //   "description": "Explore a rich dataset containing detailed statistics from IPL cricket matches. Analyze player performances, team strategies, and match outcomes for a comprehensive understanding of the thrilling world of IPL cricket.",
        //   "linkTo": "/statistics/IPL"
        // },
      ]
      

    return (
        <Box y="16" bgColor="#12504B" color="#fff" minW={"100vw"} minH={"100vh"}>
            <VStack>
              <Heading mt={'5%'} py={'4'} fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} color={'white'}>
                Global Cricket Statistics
              </Heading>
              <Cards cardData={data} />
            </VStack>
        </Box>
    )
}

export default CrickStats;
