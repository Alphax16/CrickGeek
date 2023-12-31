// ModelCards.js
import React from 'react';
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Cards from './Cards';


const ModelCards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardData = [
    {
      title: "IPL Score Predictor",
      imageSrc: "assets/AI-Models/Previews/IPL_Score_Predictor.jpg",
      description: `Elevate your IPL experience! Our AI predicts match scores by analyzing player performance, pitch conditions, and team dynamics. Stay ahead with accurate forecasts.`,
      linkTo: "/models/ipl-score-predictor"
    },
    
    // {
    //   title: "IPL Innings Score Predictor",
    //   imageSrc: "assets/AI-Models/Previews/IPL_Innings_Score_Predictor.jpg",
    //   description: `Get inning-wise insights for IPL matches! Our AI analyzes player stats and match conditions to forecast individual innings scores. Enhance your cricket strategy. Let the match and AI revolution begin.`,
    //   linkTo: "/models/ipl-innings-score-predictor"
    // },
    
    {
      title: "T20 Innings Score Predictor",
      imageSrc: "assets/AI-Models/Previews/T20_Innings_Score_Predictor.jpg",
      description: `Experience T20 thrills! Our AI predicts scores for men's T20 cricket, offering strategic insights based on player stats and match dynamics. Stay informed for every match.`,
      linkTo: "/models/t20i-score-predictor"
    },
    
    {
      title: "ICC Test Cricket Runs Predictor",
      imageSrc: "assets/AI-Models/Previews/ICC_Test_Cricket_Runs_Predictor.jpg",
      description: `Experience ICC Test Cricket thrills! Our AI predicts runs for ICC Test cricket, offering strategic insights based on player stats and match dynamics. Stay informed for every match.`,
      linkTo: "/models/icc-test-runs-predictor"
    },

    {
      title: "Umpire Action Decision Classifier",
      imageSrc: "assets/AI-Models/Previews/Umpire_Action_Images_Classifier.jpg",
      description: `Experience T20 thrills! Our AI predicts scores for men's T20 cricket, offering strategic insights based on player stats and match dynamics. Stay informed for every match.`,
      linkTo: "/models/umpire-action-decision-classifier"
    },

    // {
    //   title: "IPL Score Predictor",
    //   imageSrc: "assets/AI-Models/Previews/IPL_Score_Predictor.jpg",
    //   description: `AQI (Air Quality Index) predictor uses time series data analysis to forecast air quality, providing information for health and pollution management. Predicts PM2.5 levels.`,
    //   linkTo: "/models/ipl-score-predictor"
    // },
    // {
    //   title: "IPL Score Predictor",
    //   imageSrc: "assets/AI-Models/Previews/IPL_Score_Predictor.jpg",
    //   description: `AQI (Air Quality Index) predictor uses time series data analysis to forecast air quality, providing information for health and pollution management. Predicts PM2.5 levels.`,
    //   linkTo: "/models/ipl-score-predictor"
    // },
  ]
  

  return (
    <Box py={['8', '12', '16']} bg={'primary.oceanBlue'} minWidth={'100vw'} minHeight={'100vh'}>
      <Stack spacing={['2', '4']} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading py={['2', '4']} fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'} color={'white'}>
          AI Models
        </Heading>
        <Text color={'white'} fontSize={{ base: 'sm', sm: 'lg' }} className='models'>
          These are our AI models easing Cricket predictions and monitoring players&apos; performance.
        </Text>
      </Stack>

      <Cards cardData={cardData} />
    </Box>

  );
};

export default ModelCards;
