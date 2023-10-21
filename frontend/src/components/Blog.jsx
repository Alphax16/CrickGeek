import React from "react";
import { AspectRatio, Box } from "@chakra-ui/react";
import "../styles/Blog.css";


export const Blog = ({ videoId }) => {
  return (
    <div className="blog-container">
      <h1 style={{ fontSize: "30px" }}>
        <strong>Geekco 🦎 -</strong> Bridging gaps between Ecology and
        Technology
      </h1>
      <Box display="flex" justifyContent="center">
        <Box width={{lg: "60%", md: "60%"}}>
            <iframe
                title="EcoTech Demo Video Preview"
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{
                    margin: "2% auto",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.75)",
                    border: "2px solid #12504B",
                    borderRadius: "10px",
                    backgroundColor: "#fff",
                    width: "90%",
                }}
            ></iframe>
            </Box>
      </Box>

      <p>
        <strong style={{ fontSize: "25px" }}>Our Environment 🌎: </strong> Our
        planet faces an alarming threat due to various human-induced factors,
        including:
      </p>
      <ul>
        <li>
          <strong>😤 Air Pollution</strong>
        </li>
        <li>
          <strong>💧 Water Pollution</strong>
        </li>
        <li>
          <strong>🌾 Soil (Land) Pollution</strong>
        </li>
        <li>
          <strong>🔊 Noise Pollution</strong>
        </li>
        <li>
          <strong>💡 Light Pollution</strong>
        </li>
        <li>
          <strong>💻 Pollution due to Electronic Waste (e-waste)</strong>
        </li>
        <li>
          <strong>☢ Radioactive Pollution</strong>
        </li>
      </ul>

      <br />

      <img
        src={"/assets/Blog Images/Pollution Types.jpg"}
        alt="Pollution Types"
        width="50%"
        height="30%"
        className="floating-image"
      />

      <p>
        Among these, <strong>😤 Air</strong> and <strong>💧 Water</strong>{" "}
        pollution are the most prevalent, stemming from our everyday activities
        like traveling, cooking, washing etc..
      </p>

      <br />

      <p>
        <strong>🔊 Noise</strong> and <strong>💡 Light</strong> pollution,
        though often ignored, are emerging threats with profound implications
        for human health and genetics. Research suggests that besides hearing
        loss, exposure to sound and light pollution can lead to changes in
        stress-related hormones like <strong>Cortisol</strong>,{" "}
        <strong>Epinephrine</strong>, and <strong>Norepinephrine</strong>.
        Additionally, alterations in DNA Methylation, a heritable epigenetic
        mark, have been linked to these environmental factors, contributing to
        various human diseases.
      </p>

      <br />

      <img
        src={"/assets/Blog Images/Radioactive Pollution and E-waste.jpg"}
        alt="Radioactive Pollution and E-waste"
        width="50%"
        className="floating-image"
      />

      <p>
        <strong>☢ Radioactive pollution</strong> poses a grave risk due to
        inadequate disposal of nuclear waste and accidents at nuclear
        facilities, leading to severe health and environmental hazards.
      </p>

      <br />

      <p>
        <strong>💻 Electronic waste (e-waste)</strong> results from rapid
        obsolescence of electronic devices, contaminating soil and water with
        hazardous materials. To combat these issues, responsible waste
        management, safe disposal practices, and investments in sustainable
        energy alternatives are essential.
      </p>

      <br />

      <p>
        The mission driving our web service, 'Geekco' (Geek + Eco), is two-fold:
      </p>
      <ul>
        <li>To raise awareness about environmental degradation.</li>
        <li>To contribute technologically towards conservation efforts.</li>
      </ul>

      <p>
        Geekco is a web-based service powered by{" "}
        <strong>
          🤖 Artificial Intelligence (Machine Learning, Computer Vision, Audio
          Processing
        </strong>
        , etc.).
      </p>

      <br />

      <img
        src={"/assets/Blog Images/AI Models.jpg"}
        alt="AI Models"
        width="99%"
        className="floating-image"
      />

      <br />

      <p>Let's delve into the types of pollution and their impact:</p>

      <br />

      <ul>
        <li>
          <strong>😤 Air Pollution-</strong> Caused by industrial emissions,
          vehicle exhaust, and burning fossil fuels, air pollution leads to
          respiratory diseases, ecological damage, and climate change.
        </li>
        <li>
          <strong>💧 Water Pollution-</strong> Resulting from industrial
          discharges, sewage, and improper waste disposal, water pollution
          endangers aquatic life and makes water unsafe for consumption.
        </li>
        <li>
          <strong>🌾 Soil Pollution-</strong> Contamination of topsoil affects
          agriculture and soil organisms, reducing productivity.
        </li>
        <li>
          <strong>💡 Light Pollution-</strong> Disrupts natural light patterns,
          affecting wildlife behavior and human health, and contributing to
          energy waste.
        </li>
        <li>
          <strong>🔊 Noise Pollution-</strong> Harmful noise levels impact human
          health and disturb wildlife.
        </li>
        <li>
          <strong>♨ Thermal Pollution-</strong> Alters water temperature,
          harming aquatic ecosystems.
        </li>
        <li>
          <strong>💻 Electronic Waste (E-waste)-</strong> Disposal of electronic
          devices releases hazardous materials into the environment.
        </li>
        <li>
          <strong>🧰 Plastic Pollution-</strong> Widespread plastic accumulation
          threatens marine life and ecosystems.
        </li>
        <li>
          <strong>☢ Radioactive Pollution-</strong> Results from improper
          disposal and nuclear accidents, posing severe health risks.
        </li>
      </ul>

      <br />

      <p>
        Addressing these issues requires regulatory measures, responsible
        consumption, technological innovation, and public awareness. We have
        developed AI Web Service Models to tackle these challenges:
      </p>
      <ul>
        <li>
          <strong>😤 Air Quality Index (AQI) Prediction</strong>
        </li>
        <li>
          <strong>💧 Water Potability Prediction</strong>
        </li>
        <li>
          <strong>🛢 Oil Spill Detection</strong>
        </li>
        <li>
          <strong>🔊 Noise Pollution Detection</strong>
        </li>
        <li>
          <strong>🔥 Fire and Smoke Detection</strong>
        </li>
      </ul>

      <br />

      <ol>
        <li>
          <strong>😤 Air Quality Index (AQI) Prediction-</strong>
          <img
            src={"/assets/Blog Images/AQI Predictor.jpg"}
            alt="AQI Predictor"
            width="60%"
            className="floating-image"
          />
          <ul>
            <li>
              Air quality index (AQI) prediction is vital for public health and
              environmental management.
            </li>
            <li>
              Accurate predictions aid in health protection, policy formulation,
              urban planning, emergency response, public awareness, and
              scientific research.
            </li>
            <li>
              We utilized Long Short-Term Memory-Recurrent Neural Network
              (LSTM-RNN) for our model, ensuring precise predictions.
            </li>
            <li>
              Our workflow encompasses data preprocessing, visualization,
              prediction modeling, and user-friendly interfaces for accurate AQI
              forecasts.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <strong>💧 Water Potability Prediction-</strong>
          <img
            src={"/assets/Blog Images/Water Potability Predictor.jpg"}
            alt="Water Potability Predictor"
            width="50%"
            className="floating-image"
          />
          <ul>
            <li>
              Chemical composition, microbiological contamination, physical
              properties, geographical factors, weather patterns, and human
              activities influence water quality.
            </li>
            <li>
              Machine learning algorithms, statistical models, and data mining
              techniques are employed for water potability prediction.
            </li>
            <li>
              Accurate predictions are crucial for proactive water resource
              management and ensuring the supply of clean drinking water.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <strong>🛢 Oil Spill Detection-</strong>
          <img
            src={"/assets/Blog Images/Oil Spill Detector.jpg"}
            alt="Oil Spill Detector"
            width="50%"
            className="floating-image"
          />
          <ul>
            <li>
              Oil spill detection utilizes specialized cameras, satellites,
              drones, and algorithms for rapid and accurate identification.
            </li>
            <li>
              Segmentation techniques and deep learning models enhance detection
              accuracy, revolutionizing environmental disaster management.
            </li>
            <li>
              Challenges include variations in spill sizes, lighting conditions,
              and water textures, which continuous research aims to overcome.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <strong>🔊 Noise Pollution Detection-</strong>
          <img
            src={"/assets/Blog Images/Noise Pollution Detector.jpg"}
            alt="Noise Pollution Detector"
            width="50%"
            className="floating-image"
          />
          <ul>
            <li>
              Models consider environmental factors, urban planning, land use
              data, and weather conditions for noise pollution predictions.
            </li>
            <li>
              Accurate predictions aid in public health protection, urban
              development, and policymaking.
            </li>
            <li>
              Continuous research enhances prediction accuracy, paving the way
              for a quieter and healthier environment.
            </li>
          </ul>
        </li>

        <br />

        <li>
          <strong>🔥 Conflagration Detection-</strong>
          <img
            src={"/assets/Blog Images/Conflagration Detector.jpg"}
            alt="Conflagration Detector"
            width="50%"
            className="floating-image"
          />
          <ul>
            <li>
              Fire and smoke detection employs color-based algorithms, texture
              analysis, deep learning models, and heat/motion sensors for
              precise identification.
            </li>
            <li>
              Integration of image processing and computer vision techniques
              revolutionizes fire detection, enabling swift and intelligent
              responses to emergencies.
            </li>
            <li>
              Challenges include differentiating fires from heat sources and
              ensuring robustness against false positives, driving ongoing
              research in the field.
            </li>
          </ul>
        </li>
      </ol>

      <p>
        Through these advanced technologies, we are dedicated to creating a
        sustainable and healthier future. We invite you to explore our services,
        engage with our AI-driven tools, and join us in safeguarding the
        environment and promoting harmony between humanity and nature.
      </p>

      <br />

      <center className="float-div">
        <strong>
          <div className="emoji">😊</div>
          <i>Thank You and have a great day ahead!</i>
        </strong>
      </center>
    </div>
  );
};
