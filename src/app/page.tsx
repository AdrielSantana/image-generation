"use client";

import {
  AspectRatio,
  Box,
  Button,
  Center,
  useColorModeValue,
  Icon,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  Textarea,
  VStack,
  Circle,
} from "@chakra-ui/react";

import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillFileAdd, AiFillDelete } from "react-icons/ai";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [imageToManipulate64, setImageToManipulate64] = useState("");
  const [imageToManipulatePreview, setImageToManipulatePreview] = useState("");
  const [image64, setImage64] = useState("");

  const textToImage = async (prompt: string) => {
    setIsFetching(true);
    try {
      const response = await fetch(process.env.TEXT_TO_IMAGE_URL ?? "", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instances: [{ prompt }],
        }),
      });
      const data = await response.json();
      setImage64(data.image64);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const imageToImage = async (prompt: string, image64: string) => {
    setIsFetching(true);
    try {
      const response = await fetch(process.env.IMAGE_TO_IMAGE_URL ?? "", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.API_KEY ?? "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instances: [{ prompt, image64 }],
        }),
      });
      const data = await response.json();
      setImage64(data.image64);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickToGenerateImage = () => {
    if (imageToManipulate64) {
      imageToImage(prompt, imageToManipulate64);
    } else {
      textToImage(prompt);
    }
  };

  const convertToDataUrl = (base64: string) => {
    return "data:image/jpeg;base64," + base64;
  };

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImageToManipulatePreview(result);
          const base64result = result.split(",")[1];
          setImageToManipulate64(base64result);
          console.log(base64result);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxFiles: 1,
    maxSize: 10485760,
    multiple: false,
  });

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  const dropText = isDragActive
    ? "Solte a imagem aqui ..."
    : "Arraste e solte uma imagem que queira manipular";

  const remove = () => {
    setImageToManipulate64("");
    setImageToManipulatePreview("");
  };

  return (
    <Box
      minH="100lvh"
      w="100%"
      px={["1rem", "2rem", "3rem", "5rem"]}
      py={["0.5rem", "2rem"]}
      backgroundImage='url("https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=100")'
      backgroundAttachment={"fixed"}
      backgroundPosition={"center"}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}
    >
      <Box
        minH={"100%"}
        borderRadius={"12px"}
        backdropFilter={"blur(16px) saturate(180%)"}
        backgroundColor={"rgba(17, 25, 40, 0.75)"}
        border={"1px solid rgba(255, 255, 255, 0.125)"}
        paddingY={["1rem", "2rem"]}
        paddingX={["1rem", "2rem", "3rem", "4rem"]}
      >
        <VStack gap={"3rem"}>
          <Heading
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
            textAlign={"center"}
          >
            MandAI
          </Heading>

          <Stack
            direction={["column", "column", "column", "row"]}
            gap={"4rem"}
            alignItems={["center", "center", "center", "flex-start"]}
            w={"100%"}
          >
            <VStack
              width={["100%", "100%", "100%", "50%"]}
              justifyContent={"space-between"}
              gap={"2rem"}
            >
              <Textarea
                value={prompt}
                colorScheme="purple"
                onChange={(e) => setPrompt(e.target.value)}
                color="white"
                borderColor={"gray.500"}
                placeholder="Insira um prompt"
                variant="outline"
              />
              <Center
                color={isDragActive ? "blackAlpha.800" : "whiteAlpha.800"}
                p={10}
                cursor="pointer"
                bg={isDragActive ? activeBg : "transparent"}
                _hover={{ bg: activeBg, color: "blackAlpha.800" }}
                transition="background-color 0.2s ease"
                borderRadius={4}
                border="3px dashed"
                borderColor={borderColor}
                {...getRootProps()}
                gap={"1rem"}
              >
                <input {...getInputProps()} />
                <Icon as={AiFillFileAdd} mr={2} />
                <p>{dropText}</p>
                {imageToManipulatePreview && (
                  <>
                    <Image
                      boxSize={150}
                      alt="Image to Manipulate"
                      src={imageToManipulatePreview}
                    />
                  </>
                )}
              </Center>
              {imageToManipulatePreview && (
                <Circle
                  onClick={() => {
                    remove();
                  }}
                  cursor={"pointer"}
                  size="32px"
                  bg="red.600"
                  color="white"
                >
                  <AiFillDelete />
                </Circle>
              )}
              <Button
                isDisabled={isFetching || prompt === ""}
                onClick={() => {
                  handleClickToGenerateImage();
                }}
                _hover={{
                  bgGradient: "linear(to-l, #7928CA, #FF0080)",
                  color: "white",
                }}
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                size={"lg"}
              >
                Gerar Imagem
              </Button>
              {errorMessage && (
                <Text color={"red.500"} fontSize={"sm"}>
                  {errorMessage}
                </Text>
              )}
            </VStack>
            <AspectRatio
              w={["100%", "100%", "100%", "50%"]}
              ratio={1}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              borderRadius={"1rem"}
            >
              <Skeleton
                isLoaded={!isFetching}
                startColor="#7928CA"
                endColor="#FF0080"
                fadeDuration={1}
                height={"100%"}
                width={"100%"}
                borderRadius={"1rem"}
              >
                {!image64 && (
                  <Heading
                    color={"whiteAlpha.800"}
                    fontWeight={"bold"}
                    fontSize={["lg", "2xl"]}
                    textAlign={"center"}
                  >
                    Gere sua imagem
                    <br /> a partir de texto
                  </Heading>
                )}
                {image64 && (
                  <Image
                    objectFit="cover"
                    width={"100%"}
                    borderRadius="1rem"
                    src={convertToDataUrl(image64)}
                    alt={prompt}
                  />
                )}
              </Skeleton>
            </AspectRatio>
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
}
