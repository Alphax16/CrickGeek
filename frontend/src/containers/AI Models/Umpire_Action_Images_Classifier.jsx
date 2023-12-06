import React, { useEffect, useState } from "react";
import { Box, Button, Center, Image, Input, Text, Flex, VStack } from "@chakra-ui/react";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swal from "sweetalert2";
import instance from "../../api";


const  Umpire_Action_Images_Classifier = ({ mode='dev' }) => {
  const [file, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [resImgURL, setResImgURL] = useState("");
  const [loading, setLoading] = useState(false);

  const decisionFormatter = {
    'no_ball': 'No Ball',
    'out': 'Out',
    'sixes': 'Six',
    'wide': 'Wide',
    'no_action': 'No Action (At ease)',
  }

  useEffect(() => {
    if (mode !== 'dev') {
      Swal.fire({
        title: `Apologies...😔. Service not available!`,
        // text: `Confidence: ${Math.round(response.data.confidence * 100)}%`,
        html: `<strong>NOTE</strong> : This is a resource consuming image processing AI model requiring extensive computation power and RAM. Our budget being limited, we had to <strong>disable this service in our production build</strong>. <strong>Sorry :'(</strong>`,
        icon: "warning",
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (file && mode === 'dev') {
      setLoading(true);
      handleSubmit();
    } else {
      Swal.fire({
        title: `Apologies...😔. Service not available!`,
        // text: `Confidence: ${Math.round(response.data.confidence * 100)}%`,
        html: `<strong>NOTE</strong> : This is a resource consuming image processing AI model requiring extensive computation power and RAM. Our budget being limited, we had to <strong>disable this service in our production build</strong>. <strong>Sorry :'(</strong>`,
        icon: "warning",
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const chooseImageButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = async () => {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await instance.post(
          "/Umpire-Action-Decision-Classifier",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded:", response.data);
        // console.log(Math.round(parseFloat(response.data.confidence + Number.EPSILON) * 100) / 100)
        const approxConfidence = Math.round(parseFloat(response.data.confidence + Number.EPSILON) * (100**2)) / 100;
      
        Swal.fire({
          title: `Action Decision: ${decisionFormatter[response.data.decision]}`,
          // text: `Confidence: ${Math.round(response.data.confidence * 100)}%`,
          text: `Confidence: ${approxConfidence.toFixed(2)}%`,
          icon: "success",
        });

        setResImgURL(response.data.url);
      } catch (err) {
        console.error("Error uploading file:", err);
      } finally {
        setLoading(false);
      }
  };

  const downloadResImage = () => {
    if (resImgURL) {
      fetch(resImgURL).then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "OilSpill_Segmented_Image.png";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
    }
  };

  return (
    <Box>
        <Box p={32} h="max-content" bg="primary.oceanBlue" color="#fff" minW={"100vw"} minH={"130vh"}>

        <Box textAlign={'center'}>
            <Text
                fontSize={{ base: "3xl", lg: "4xl" }}
                fontWeight={"bold"}
                pb={"20"}
                color={"#fff"}
            >
                Umpire Action Images Classification
            </Text>
        </Box>

        <Center>
            <LoadingSpinner isOpen={loading} />
            <Box
                border={"2px dashed #cccccc"}
                padding={"40px"}
                cursor={"pointer"}
                // maxW="40vw"
                maxW="380px"
                minH="60vh"
                textAlign={"center"}
                bgColor={"primary.oceanBlue"}
                color={"#ffffff"}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}>
                
                <VStack>
                    <Center>
                        <Box
                            // w="300px"
                            h={{ base: "150px", lg: "250px" }}
                            mt={4}>
                            {imagePreview ? (
                                <Image maxW="100%" maxH="100%" src={imagePreview} alt="Preview" />
                            ) : (
                                <Box>
                                    <Image src="/assets/AI-Models/misc/Dropbox_Logo.png" alt="No-Img" />
                                    <Text textAlign="center" mt={2}>
                                        Drag and drop your image here
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Center>

                    <Text textAlign="center">Or</Text>

                    <Input type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="fileInput"
                        display="none"/>
                    
                        {imagePreview ? (
                            <Button colorScheme="teal" mt={2} onClick={chooseImageButtonClick}>Choose Again</Button>
                        ) : (
                            <Button colorScheme="teal" mt={2} onClick={chooseImageButtonClick}>Choose Image</Button>
                        )}

                        {file && (
                            <Box>
                                <Text style={{ textAlign: "center", margin: "2rem 0" }}>Selected Image: {file.name}</Text>
                                <Button
                                    colorScheme="teal"
                                    onClick={handleUpload}
                                    style={{ display: "block", margin: "0 auto" }}>
                                    Upload
                                </Button>
                            </Box>
                        )}

                        {/* {resImgURL && (
                            <Box>
                                <Image
                                    src={resImgURL}
                                    alt="No Response-Img"
                                    style={{ margin: "2rem auto" }}
                                />
                            </Box>
                        )} */}
                </VStack>
            </Box>
        </Center>
        </Box>
    </Box>
  );
};

export default Umpire_Action_Images_Classifier;
