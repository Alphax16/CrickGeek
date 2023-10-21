
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactNode } from 'react'


const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  )
}

const Footer = ()=> {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} p={'2.5'} textAlign={'center'}>
        
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} >
        <Box marginTop={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}>
          <Text fontWeight={'bold'}>GEEKCO</Text>
        
        </Flex>
        <Text pt={6} fontSize={'sm'} textAlign={'center'}>
        © 2023 Amigos. All rights reserved.
        </Text>
      </Box>
          <Stack align={'center'}>
            <ListHeader>Product</ListHeader>
            <Box as="a" href={'#'}>
              Overview
            </Box>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Box as="a" href={'#'}>
                Features
              </Box>
      
            </Stack>
            <Box as="a" href={'#'}>
              Tutorials
            </Box>
            <Box as="a" href={'#'}>
              Releases
            </Box>
          </Stack>
          {/* <Stack align={'center'}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={'#'}>
              About Us
            </Box>
            <Box as="a" href={'#'}>
              Press
            </Box>
            <Box as="a" href={'#'}>
              Careers
            </Box>
            <Box as="a" href={'#'}>
              Contact Us
            </Box>
            <Box as="a" href={'#'}>
              Partners
            </Box>
          </Stack> */}
          {/* <Stack align={'center'}>
            <ListHeader>Legal</ListHeader>
            <Box as="a" href={'#'}>
              Cookies Policy
            </Box>
            <Box as="a" href={'#'}>
              Privacy Policy
            </Box>
            <Box as="a" href={'#'}>
              Terms of Service
            </Box>
            <Box as="a" href={'#'}>
              Law Enforcement
            </Box>
            <Box as="a" href={'#'}>
              Status
            </Box>
          </Stack> */}
          <Stack align={'center'}>
            <ListHeader>Follow Us</ListHeader>
            <Box as="a" href={"www.github.com"}>
              GitHub
            </Box>
            <Box as="a" href={"www.linkedin.com"}>
              LinkedIn
            </Box>
            <Box as="a" href={"www.dribbble.com"}>
              Dribbble
            </Box>
            <Box as="a" href={"www.twitter.com"}>
              Twitter X
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
    
    </Box>
  )
}



export default Footer;
