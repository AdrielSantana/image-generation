import { useGenerateImage } from "@/presentation/hooks/useGenerateImage";
import { AspectRatio, Heading, Image, Skeleton } from "@chakra-ui/react";
import React from "react";

const ImageContainer = () => {
  const { isFetching, generatedImage, prompt } = useGenerateImage();
  return (
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
        {!generatedImage && (
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
        {generatedImage && (
          <Image
            objectFit="cover"
            width={"100%"}
            borderRadius="1rem"
            src={generatedImage}
            alt={prompt}
          />
        )}
      </Skeleton>
    </AspectRatio>
  );
};

export default ImageContainer;
