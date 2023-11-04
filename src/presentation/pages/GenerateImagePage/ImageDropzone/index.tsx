import {
  Center,
  Circle,
  Icon,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { ImageDropzoneProps } from "./types";
import { AiFillDelete, AiFillFileAdd } from "react-icons/ai";
import { useGenerateImage } from "@/presentation/hooks/useGenerateImage";

const ImageDropzone = ({ ...props }: ImageDropzoneProps) => {
  const {
    isDragActive,
    getRootProps,
    getInputProps,
    imageToManipulatePreview,
    removeImageToManipulate,
  } = useGenerateImage();

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  const dropText = isDragActive
    ? "Solte a imagem aqui ..."
    : "Arraste e solte uma imagem que queira manipular";

  return (
    <>
      <Center
        {...props}
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
            removeImageToManipulate();
          }}
          cursor={"pointer"}
          size="32px"
          bg="red.600"
          color="white"
        >
          <AiFillDelete />
        </Circle>
      )}
    </>
  );
};

export default ImageDropzone;
