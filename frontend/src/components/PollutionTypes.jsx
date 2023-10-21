import { Box, Flex, Text, Center,useColorModeValue,Image,useMediaQuery,Stack, Heading } from "@chakra-ui/react";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";


const IMAGE = "/assets/Pollution Types Images/Slate Background Image.jpg"

const MotionBox = motion(Box);

const PollutionTypes = () => {

  
  return (
    <Box bg="url('/assets/pollution_green.jpg')" bgPos={'center'} bgRepeat={'no-repeat'}  backgroundSize="cover">
   {/* <Box bg={''}>  */}
      
      <HorizontalScrollCarousel />
    
    </Box>
  );
};

const HorizontalScrollCarousel = () => {
  const [isLargeScreen] = useMediaQuery("(max-width: 1024px)");
  const [isExtraLargeScreen] = useMediaQuery("(min-width: 1280px)");

    const MotionBox = motion(Box);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
      target: targetRef,
    });
  
    const x = useTransform(scrollYProgress, [0, isLargeScreen ? 1 : 2], ["1%","-96%"]);


  return (
    <Box pos="relative" ref={targetRef} h={{base:'180vh' ,lg:"140vh"}} >
        <Center py={'5'}>
          <Heading py={{sm: '5', lg: '7'}} fontSize={{ base: '2xl', sm: '4xl', 
          // lg: '6xl'
         }} color={'#fff'} fontWeight={'bold'} className='pollution-types'>
    Types of Pollution
    </Heading>
  </Center>
      <Flex pos="sticky" top="0" pt={{sm: '-16'}} h="60%" align="center" overflow="hidden">
        <MotionBox style={{ x }} display="flex" gap="4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </MotionBox>
      </Flex>
    </Box>
  );
};

const Card = ({ card }) => {
  const handleCardClick = (event) => {
    event.preventDefault();
    window.open(card.redirect, "_blank");
  };

  return (
    <Box

      key={card.id}
      h="600px"
      w="450px"
      overflow="hidden"
      bg="neutral.200"
      pos="relative"
      className="group"
      maxW={'345px'}
      rounded={'md'}
      p={6}
      transition="box-shadow 0.3s, transform 0.3s"
      _hover={{ transform: "scale(1.05)", cursor: 'pointer'}}
      onClick={handleCardClick}
    >
      <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={card.url}
            alt="/"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          {/* <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text> */}
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {card.title}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            {/* <Text fontWeight={800} fontSize={'xl'}>
              $57
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text> */}
            <Text color={'gray.600'} textAlign={'justify'}>
              {card.desc}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
    </Box>
  );
};

export default PollutionTypes;

// const cards = [
//   {
//     id: 1,
//     url: "/assets/Pollution Types Images/Air Pollution.jpg",
//     title: "Air Pollution",
//     desc: `Contamination of the Earth's atmosphere by harmful substances like pollutants and particulate matter.
//     Major sources include industrial emissions, vehicle exhaust, and burning fossil fuels.
//     Health effects: respiratory problems, cardiovascular diseases, and reduced air quality.`,
//   },
//   {
//     id: 2,
//     url: "/assets/Pollution Types Images/Water Pollution.jpg",
//     title: "Water Pollution",
//     desc: `Contamination of water bodies (rivers, lakes, oceans) by pollutants like chemicals, sewage, and waste.
//     Causes include industrial runoff, agricultural pesticides, and improper waste disposal.
//     Consequences: compromised aquatic ecosystems, harm to human health, and reduced access to clean water.`,
//   },
//   {
//     id: 3,
//     url: "/assets/Pollution Types Images/Land Pollution.jpg",
//     title: "Land Pollution",
//     desc: `Degradation of land quality due to various pollutants, including hazardous waste, litter, and soil erosion.
//     Activities like mining, improper disposal of waste, and deforestation contribute.
//     Impacts: soil infertility, loss of biodiversity, and impaired agricultural productivity.`,
//   },
//   {
//     id: 4,
//     url: "/assets/Pollution Types Images/Noise Pollution.jpg",
//     title: "Noise Pollution",
//     desc: `Excessive and disruptive levels of noise in the environment, often from urbanization and transportation.
//     Sources include traffic, construction, and industrial machinery.
//     Adverse effects: stress, hearing impairment, and sleep disturbances.`,
//   },
//   {
//     id: 5,
//     url: "/assets/Pollution Types Images/Radioactive Pollution.jpg",
//     title: "Radioactive Pollution",
//     desc: `Presence of radioactive materials in the environment, resulting from nuclear accidents, nuclear power plants, or improper disposal of radioactive waste.
//     Can lead to radiation exposure and health risks like cancer and genetic mutations.
//     Requires strict containment and disposal measures to prevent harm.`,
//   },

// ];

const cards = [
  {
    id: 1,
    url: "/assets/Pollution Types Images/Air Pollution.jpg",
    title: "Air Pollution",
    desc: `Contamination of the Earth's atmosphere by harmful substances. Major sources include industrial emissions and vehicle exhaust. Health effects: respiratory problems and reduced air quality.`,
    redirect: "https://en.wikipedia.org/wiki/Air_pollution",
  },
  {
    id: 2,
    url: "/assets/Pollution Types Images/Water Pollution.jpg",
    title: "Water Pollution",
    desc: `Contamination of water bodies by pollutants like chemicals and sewage. Causes include industrial runoff and agricultural pesticides. Leads to harm to human health & aquatic life.`,
    redirect: "https://en.wikipedia.org/wiki/Water_pollution",
  },
  {
    id: 3,
    url: "/assets/Pollution Types Images/Land Pollution.jpg",
    title: "Land Pollution",
    desc: `Degradation of land quality due to pollutants including hazardous waste and soil erosion. Activities like mining and deforestation contribute. Impacts: soil infertility and loss of biodiversity.`,
    redirect: "https://en.wikipedia.org/wiki/Soil_contamination",
  },
  {
    id: 4,
    url: "/assets/Pollution Types Images/Noise Pollution.jpg",
    title: "Noise Pollution",
    desc: `Excessive levels of noise in the environment from urbanization and transportation. Sources include traffic and industrial machinery. Adverse effects: stress and hearing impairment.`,
    redirect: "https://en.wikipedia.org/wiki/Noise_pollution",
  },
  {
    id: 5,
    url: "/assets/Pollution Types Images/Radioactive Pollution.jpg",
    title: "Radioactive Pollution",
    desc: `Presence of radioactive materials from nuclear accidents and power plants. Can lead to radiation and health risks like cancer. Requires strict containment measures to prevent harm.`,
    redirect: "https://en.wikipedia.org/wiki/Radioactive_contamination",
  },
]
