import React from 'react';
import { Container, Flex } from '@chakra-ui/react';
import Card from './Card';


const Cards = ({ cardData }) => {
  return (
    <Container maxW={'90%'} mt={12}>
      <Flex flexWrap="wrap" gridGap={6} justify="center">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            imageSrc={card.imageSrc}
            description={card.description}
            linkTo={card.linkTo}
          />
        ))}
      </Flex>
    </Container>
  );
};

export default Cards;
