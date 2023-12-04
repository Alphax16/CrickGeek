import React from 'react';
import { Container, Center, Flex, SimpleGrid } from '@chakra-ui/react';
import Card from './Card';


const Cards = ({ cardData, title }) => {
  return (
    <Container maxW={'90%'} mt={12} minH={'40%'}>
      <Center>{title}</Center>
      <Flex flexWrap="wrap" gridGap={6} justify="center" minH={'40%'}>
      <SimpleGrid columns={2} spacing={20} marginBottom={'5%'}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            imageSrc={card.imageSrc}
            description={card.description}
            linkTo={card.linkTo}
          />
        ))}
        </SimpleGrid>
      </Flex>
    </Container>
  );
};

export default Cards;
