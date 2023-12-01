import { useState, useEffect } from "react";
import { Box, Center, FormLabel, List, Text, UnorderedList, Button, 
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, 
  AlertDialogBody, AlertDialogFooter, useDisclosure, Heading, FormControl, Radio,
} from "@chakra-ui/react";


function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [score, setScore] = useState(0);

  const fetchQuizData = () => {
    fetch("/assets/quiz/quiz.json")
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA-47:', data);
        if (Array.isArray(data)) {
          const shuffledQuestions = shuffleArray(data);
          const selectedQuestions = shuffledQuestions.slice(0, 10);
          setQuestions(selectedQuestions);
        } else {
          console.error("Error loading quiz data: Data is not an array.");
        }
      })
      .catch((err) => console.error("Error loading quiz data:", err));
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleAnswerSubmit = (selectedOption) => {
    const currentQuestion = questions[currentIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      showAlertDialog();
    }
  };

  const handleBackClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getPerformanceReport = (score) => {
    const performanceFeedbacks = {
      lost: "Keep trying... Make it till you break it!!",
      better: "Well tried! Can do much better.",
      goodJob: "Good job! Can set the bar high...",
      bravo: "Bravo! Almost there... Slay it!!",
      won: "You are a perfectionist!!",
    };

    if (score === 0) {
      return performanceFeedbacks.lost;
    } else if (score >= 1 && score <= 3) {
      return performanceFeedbacks.better;
    } else if (score >= 4 && score <= 6) {
      return performanceFeedbacks.goodJob;
    } else if (score >= 7 && score <= 9) {
      return performanceFeedbacks.bravo;
    } else {
      return performanceFeedbacks.won;
    }
  };

  const restartQuiz = () => {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    onClose();
    fetchQuizData();
  };

  const showAlertDialog = () => {
    onOpen();
  };

  return (
    <Box bg="#12504B" minW={"100vw"} minH={"120vh"}>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Results</AlertDialogHeader>
            <AlertDialogBody>
              Your Score:
              <Text fontWeight={"bold"}>
                { `${score} / ${questions.length}`}
              </Text>
              <Box>{getPerformanceReport(score)}</Box>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={restartQuiz}>
                Restart Quiz
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <Box pt={{ base: "15%", lg: "6%" }}>
        <Center display="flex" flexDir="column">
          <Heading
            py="4"
            fontSize={{ base: "2xl", sm: "4xl" }}
            fontWeight="bold"
            color="white"
          >
            CRICK QUIZ
          </Heading>
          {currentIndex < questions.length && (
            <Box borderRadius="xl" w="70%" my="10" bg="green.100" p="3">
              <Text
                borderRadius="xl"
                textAlign="center"
                bg="green.200"
                fontSize="xl"
                p="3"
              >
                Q. {currentIndex + 1} {questions[currentIndex].question}
              </Text>
              <UnorderedList>
                {questions[currentIndex].options.map((option, optionIndex) => (
                  <List key={optionIndex} textAlign="center" fontSize="xl" my="3">
                    <FormControl display="flex" alignItems="center">
                      <Radio
                        required
                        name={`question_${currentIndex}`}
                        value={option}
                        onChange={() => setSelectedOption(option)}
                        isChecked={selectedOption === option}
                        borderColor={"darkgreen"}
                        colorScheme="green" // You can adjust the color scheme as needed
                        size="lg" // You can adjust the size as needed
                      />
                      <FormLabel textAlign="center" borderRadius="xl" bg="green.200" fontSize="xl" py="3" ml="3">
                        {option}
                      </FormLabel>
                    </FormControl>
                  </List>
                ))}
              </UnorderedList>
              <Center flexDir="row">
                <Button
                  bg="green.100"
                  border="1px solid black"
                  onClick={handleBackClick}
                  disabled={currentIndex === 0}
                  mx={"1%"}
                >
                  Back
                </Button>
                {currentIndex < questions.length - 1 ? (
                  <Button
                    bg="green.100"
                    border="1px solid black"
                    onClick={() => handleAnswerSubmit(selectedOption)}
                    mx={"1%"}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    bg="green.100"
                    border="1px solid black"
                    onClick={showAlertDialog}
                    mx={"1%"}
                  >
                    Finish
                  </Button>
                )}
              </Center>
              <Center>
                <Text my="4">Score: {score}</Text>
              </Center>
            </Box>
          )}
        </Center>
      </Box>
    </Box>
  );
}

export default Quiz;
