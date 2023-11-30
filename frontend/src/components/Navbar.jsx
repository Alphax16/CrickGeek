import { Box, Flex, Avatar, HStack, IconButton, Button, Menu, 
    MenuButton, useDisclosure, Stack, useToast, useMediaQuery,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link and useLocation
import { useEffect, useState,  } from "react";
import { motion } from "framer-motion";


 // Define routes links and names and their classNames-
const Links = [
  { name: "Home", path: "/", className: "nav-home" },
  // { name: "Maps", path: "/forest-map", className: "nav-maps" },
  { name: "Statistics", path: "/statistics", className: "nav-statistics" },
  // { name: "Visualizations", path: "/visualizations", className: "nav-visualizations", },
  { name: "AI Models", path: "/models", className: "nav-ai-models" },
  { name: "Quiz", path: "/quiz", className: "nav-quiz" },
];

const GlowingLogo = motion(Avatar);

const Navbar = () => {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerScreen] = useMediaQuery("(min-width: 768px)");

  const navigate = useNavigate();

  const location = useLocation();

  const isHomeRoute = location.pathname === "/";
  const handleGoBack = () => {
    navigate(-1);
  };

  const [activeLink, setActiveLink] = useState("/"); // Initialize with the default route
  const [fact, setFact] = useState();
  const [isGlowing, setIsGlowing] = useState(false);

  const updateActiveLink = () => {
    const currentPath = location.pathname;
    setActiveLink(currentPath);
  };

  useEffect(() => {
    updateActiveLink();
  }, [location]);

  const getRandomFact = () => {
    setIsGlowing(true);
    console.log("clicked");
    
    fetch("/facts.json")
      .then((response) => response.json())
      .then((data) => {
        setFact(shufflefact(data));
        // console.log(data);
      })
      .catch((err) => console.error("Error loading quiz data:", err));
      
      setTimeout(() => {
        setIsGlowing(false);
      }, 1000);
  };

  const shufflefact = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    toast({
      title: data[randomIndex].fact,

      isClosable: true,
    });
  };

  return (
    <>
      <Box
        bg={"transparent"}
        className="navbox"
        px={{ lg: "32", md: "4", base: "4" }}
        position={"absolute"}
        zIndex={"100"}
        top={"0"}
        right={"0"}
        left={"0"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {isHomeRoute ? (
            // <Image src="/assets/Logo/Geekco-Logo.png" alt="Geekco-Logo" />
            <Box
              // as="img"
              src="/assets/Logo/CrickGeek-Logo.png"
              alt="Logo"
              boxSize="50px"

              as={motion.img}
              whileHover={{
                rotate: 360,
                transition: { duration: 3, ease: "linear" }
              }}
              whileTap={{
                rotate: 360,
                x: "100vw",
                y: [0, -50, 50, -50],
                transition: { duration: 3, ease: "linear", yoyo: Infinity }
              }}
              // _hover={{
              //   transition: "filter 0.5s ease",
              //   // filter: "hue-rotate(360deg)",
              //   // rotate: "360deg",

              //   transform: ,
              // }}
              display={isLargerScreen ? "block" : "none"}
              className='nav-logo'
            />
          ) : (
            isLargerScreen && (
              <Button
                onClick={handleGoBack}
                textDecoration="none"
                backgroundColor="teal"
                color="white"
              >
                Back
              </Button>
            )
          )}
          
          <IconButton
            size={"sm"}
            icon={
              isOpen ? (
                <AiOutlineCloseCircle fontSize={"32"} />
              ) : (
                <GiHamburgerMenu fontSize={"32"} />
              )
            }
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            bg={"gray.200"}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              fontWeight={"bold"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    textDecoration: "none",
                    backgroundColor: activeLink === link.path ? "#C1E836" : "transparent",
                    color: activeLink === link.path ? "black" : "#fff",
                    padding: activeLink === link.path ? "5px" : "auto",
                    borderRadius: activeLink === link.path ? "20px" : "0px",
                  }}
                  className={link.className}
                >
                  {link.name}
                </Link>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                onClick={getRandomFact}
                minW={0}
              >
                <GlowingLogo
                  size={"sm"}
                  src={"/assets/Idea-Bulb.png"}
                  alt={"Idea Bulb"}
                  initial={{ filter: "brightness(1.2)" }}
                  animate={isGlowing ? { boxShadow: "0 0 30px 20px yellow", filter: "brightness(1.5)" } : { filter: "brightness(1.2)" }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="facts"
                />
              </MenuButton>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4} background={"green"}>
              {Links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    textDecoration: "none",
                    backgroundColor: activeLink === link.path ? "#C1E836" : "green",
                    color: activeLink === link.path ? "black" : "#fff",
                  }}
                  p={2}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    backgroundColor: "#C1E836",
                    color: "black",
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
