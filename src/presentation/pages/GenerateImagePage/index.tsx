"use client";

import React from "react";
import {
  Box,
  Stack,
  Text,
  VStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useGenerateImage } from "@/presentation/hooks/useGenerateImage";
import GlassCard from "@/presentation/components/GlassCard";
import Heading from "@/presentation/components/Heading";
import Prompt from "@/presentation/components/Prompt";
import ImageDropzone from "./ImageDropzone";
import Button from "@/presentation/components/Button";
import ImageContainer from "./ImageContainer";

const GenerateImagePage = () => {
  const {
    CFG,
    errorMessage,
    isFetching,
    negativePrompt,
    prompt,
    steps,
    strength,
    setCFG,
    setNegativePrompt,
    setSteps,
    setStrength,
    handleClickToGenerateImage,
    setPrompt,
  } = useGenerateImage();

  return (
    <GlassCard>
      <VStack gap={"3rem"}>
        <Heading>MandAI</Heading>
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
            <Prompt
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Insira um prompt"
            />
            <Prompt
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="Insira o prompt negativo (opcional)"
            />
            <ImageDropzone />
            <Stack
              gap={"1rem"}
              direction={[
                "column",
                "column",
                "column",
                "column",
                "column",
                "row",
              ]}
            >
              <Box>
                <Text color={"whiteAlpha.700"}>
                  Força da manipulação:{" "}
                  <Text as="span" fontWeight="bold">
                    {strength}%
                  </Text>
                </Text>
                <Slider
                  step={10}
                  value={strength}
                  colorScheme="purple"
                  onChange={(val) => setStrength(val)}
                  width={200}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Box>
                <Text color={"whiteAlpha.700"}>
                  Guia do prompt (CFG):{" "}
                  <Text as="span" fontWeight="bold">
                    {CFG}
                  </Text>
                </Text>
                <Slider
                  step={1}
                  value={CFG}
                  colorScheme="purple"
                  min={1}
                  max={30}
                  onChange={(val) => setCFG(val)}
                  width={200}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
              <Box>
                <Text color={"whiteAlpha.700"}>
                  Passos:{" "}
                  <Text as="span" fontWeight="bold">
                    {steps}
                  </Text>
                </Text>
                <Slider
                  step={10}
                  value={steps}
                  colorScheme="purple"
                  max={150}
                  min={10}
                  onChange={(val) => setSteps(val)}
                  width={200}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            </Stack>
            <Button
              isDisabled={isFetching || prompt === ""}
              onClick={() => {
                handleClickToGenerateImage();
              }}
            >
              Gerar Imagem
            </Button>
            {errorMessage && (
              <Text color={"red.500"} fontSize={"sm"}>
                {errorMessage}
              </Text>
            )}
          </VStack>
          <ImageContainer />
        </Stack>
      </VStack>
    </GlassCard>
  );
};

export default GenerateImagePage;
