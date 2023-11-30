import React from "react";
import { AspectRatio, Box, Center } from "@chakra-ui/react";
// import "../styles/Blog.css";


export const Blog = ({ videoId }) => {
  return (
    <div className="blog-container" style={{ margin: '5%' }}>
      <h1 style={{ fontSize: "30px" }}>
        <strong>CrickGeek 🦎 -</strong> Powering Cricket, Enforcing AI
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
          border: "2px solid #12504B",
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
            style={{
              margin: "2% auto",
              boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
              border: "2px solid #12504B",
              borderRadius: "10px",
            }}
          />
        </Box>
      </Box>

      <p>
        <strong style={{ fontSize: "25px" }}>Introduction:</strong> Welcome to
        the world of CrickGeek 🏏, where technology meets cricket, transforming
        the game with the power of Artificial Intelligence (AI). In this blog
        post, we'll explore how AI and Machine Learning (ML) algorithms are
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

      <h3>Umpire Decision Classification</h3>

      <Center>
        <img
          src={"/assets/Blog_Images/Umpire_Decision_Classification.jpg"}
          alt="Umpire Image Decision Classification"
          width="40%"
          height="25%"
          style={{ marginBottom: "2%" }}
        />
      </Center>

      <p>
        Umpire decisions are a crucial aspect of cricket, and AI is revolutionizing
        this domain. Using advanced Computer Vision techniques, our AI models
        provide additional insights to umpires, reducing the margin for error and
        ensuring fair play in every match.
      </p>

      <h2>Technological Marvels at CrickGeek</h2>

      <h3>AI Models at Play</h3>

      <img
        src={"/assets/Blog_Images/AI_Models_Cricket.jpg"}
        alt="AI Models in Cricket"
        width="100%"
        style={{ marginBottom: "2%" }}
      />

      <p>
        At CrickGeek, we've developed cutting-edge AI models that go beyond
        predictions. Let's explore some of the exciting applications within the
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

      <h3>Revolutionizing Umpire Decisions</h3>

      <img
        src={"/assets/Blog_Images/Umpire_Decision_Classification.jpg"}
        alt="Umpire Image Decision Classification"
        width="60%"
        height="40%"
        style={{ marginBottom: "2%" }}
      />

      <p>
        Through these technological advancements, CrickGeek is dedicated to
        ushering in a new era of cricket, blending the excitement of the game
        with the precision of AI. Join us on this journey, explore our AI-driven
        tools, and witness the transformation of cricket into a more dynamic and
        data-driven sport.
      </p>

      <br />

      <center className="float-div">
        <strong>
          <div className="emoji">😊</div>
          <i>Thank You and enjoy the future of cricket with CrickGeek!</i>
        </strong>
      </center>
    </div>
  );
};
