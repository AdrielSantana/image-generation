import React from "react";
import { Heading as ChakraHeading } from "@chakra-ui/react";
import { HeadingProps } from "./types";

const Heading = ({ children, ...props }: HeadingProps) => {
  return (
    <ChakraHeading
      {...props}
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
      fontSize="6xl"
      fontWeight="black"
      textAlign={"center"}
    >
      {children}
    </ChakraHeading>
  );
};

export default Heading;
