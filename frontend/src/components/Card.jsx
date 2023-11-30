import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
//   Link,
  useColorModeValue,
  Heading,
  Text,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';


const MotionBox = motion(Box);

const Card = ({ title, imageSrc, description, linkTo }) => {
    return (
        <MotionBox
        py={6}
        initial={{ x: "-70vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1, origin: 1, delay: 0.3 }}
        >
            <Link to={linkTo}>
                <Box
                    maxW={'345px'}
                    h={'60vh'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.900')}
                    
                    rounded={'md'}
                    p={6}
                    overflow={'hidden'}
                    borderRadius="md"
                    boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"

                    transition="box-shadow 0.3s, transform 0.3s"
                    _hover={{
                        boxShadow: "0px 8px 12px rgba(1, 0, 0, 0.2)",                     
                        transform: "scale(1.05)", 
                    }}
            
                >
                    <Box h={'210px'} overflow={'hidden'} bg={'gray.100'} mt={-6} mx={-6} mb={6} display={'block'}>
                        <Image src={imageSrc} width={'345px'} height={'230px'} alt="Example" />
                    </Box>
                    <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} width={'110%'} fontFamily={'body'}>
                        {title}
                    </Heading>
                    <Text color={'gray.500'}>
                        {description}
                    </Text>
                </Box>
            </Link>
        </MotionBox>
    );
};
  

export default Card;
