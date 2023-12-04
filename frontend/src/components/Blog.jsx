import React from "react";
import { AspectRatio, Box, Center } from "@chakra-ui/react";
import { motion } from "framer-motion"; 
import "../styles/Blog.css";


export const Blog = ({ videoId }) => {
  return (
    <div className="blog-container" style={{ margin: "5%" }}>
      <h1 style={{ fontSize: "30px" }}>
        <strong>CrickGeek 🏏 -</strong> Powering Cricket, Enforcing AI
      </h1>

      <iframe
        title="EcoTech Demo Video Preview"
        width="700vw"
        height="400vh"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{
          display: "block",
          margin: "2% auto",
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
          border: "2px solid primary.oceanBlue",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      ></iframe>

      <Box display="flex" justifyContent="center">
        <Box width={{ lg: "60%", md: "60%" }}>
          <img
            src={"/assets/Blog_Images/Cricket_AI.png"}
            alt="Cricket Image"
            width="100%"
            // style={{
            //   margin: "2% auto",
            //   boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
            //   border: "2px solid primary.oceanBlue",
            //   borderRadius: "10px",
            // }}
            className="floating-image"
          />
        </Box>
      </Box>

      <p>
        <strong style={{ fontSize: "25px" }}>Introduction:</strong> Welcome to
        the world of CrickGeek 🏏, where technology meets cricket, transforming
        the game with the power of Artificial Intelligence (AI). In this blog
        post, we&apos;ll explore how AI and Machine Learning (ML) algorithms are
        playing a pivotal role in redefining cricket, from predictive analytics
        to revolutionizing umpire decisions.
      </p>

      <h2>The Role of AI in Cricket</h2>

      <h3>Predictive Analytics</h3>

      <p>
        Just as AI predicts environmental changes, our AI models analyze
        historical data, player statistics, and current form to provide accurate
        predictions for various aspects of cricket matches. From player
        performance to match outcomes, AI enhances strategic decision-making for
        teams and fans alike.
      </p>

      <h3>Revolutionizing your Cricket Experience with our AI models</h3>

      <img
        src={"/assets/Blog_Images/AI_Models.png"}
        alt="Umpire Image Decision Classification"
        width="100%"
        height="100%"
        className="floating-image"
      />

      <p>
        Umpire decisions are a crucial aspect of cricket, and AI is revolutionizing
        this domain. Using advanced Computer Vision techniques, our AI models
        provide additional insights to umpires, reducing the margin for error and
        ensuring fair play in every match.
      </p>

      <h2>Technological Marvels at CrickGeek</h2>

      <h3>AI Models at Play</h3>

      <img
        src={"/assets/Blog_Images/IPL_Score_Predictor.png"}
        alt="AI Models in Cricket"
        width="80%"
        height="60%"
        // style={{ marginBottom: "2%" }}
        className="floating-image"
      />

      <p>
        At CrickGeek, we&apos;ve developed cutting-edge AI models that go beyond
        predictions. Let&apos;s explore some of the exciting applications within the
        realm of cricket:
      </p>

      <ol>
        <li>
          <strong>Performance Prediction:</strong> Our AI models predict player
          performance, providing teams with valuable insights for strategic
          planning.
        </li>
        <li>
          <strong>Match Outcome Prediction:</strong> Analyzing historical data
          and current conditions, AI predicts match outcomes, adding excitement
          for fans and aiding analysts.
        </li>
        <li>
          <strong>Injury Prevention:</strong> By analyzing player data, AI
          contributes to injury prevention, ensuring the well-being of players
          on the field.
        </li>
      </ol>

      <h3>Umpire Decision Classification</h3>

      <Center>
        <img
          src={"/assets/Blog_Images/Umpire_Decision_Classification.jpg"}
          alt="Umpire Image Decision Classification"
          width="60%"
          height="30%"
          className="floating-image"
        />
      </Center>
      
      <h3>Crick-Quiz</h3>
      <p>
        A fun and entertaining way to put knowledge of Cricket to test with out Cricket Quiz game, named &apos;Crick-Quiz&apos;.
      </p>
      <Center>
        <img
          src={"/assets/Blog_Images/Crick_Quiz.png"}
          alt="Umpire Image Decision Classification"
          width="90%"
          height="100%"
          className="floating-image"
        />
      </Center>

      <p>
        Through these technological advancements, CrickGeek is dedicated to
        ushering in a new era of cricket, blending the excitement of the game
        with the precision of AI. Join us on this journey, explore our AI-driven
        tools, and witness the transformation of cricket into a more dynamic and
        data-driven sport.
      </p>

      <br />

      <center className="float-div" style={{ fontSize: "200%" }}>
        <strong>
          <i>Thank You and enjoy the future of cricket with CrickGeek!</i>
          <Center>
            <motion.div className="emoji" 
            whileHover={{ 
              transition: "transform 0.3s ease", 
              display: "inline-block", 
              position: "absolute",
              transform: "scale(5) translate(-50%, -50%)"
            }}
            >
            😊
            </motion.div>
          </Center>
        </strong>
      </center>
    </div>
  );
};
