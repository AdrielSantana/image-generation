import React from "react";
import { PromptProps } from "./types";
import { Textarea } from "@chakra-ui/react";

const Prompt = ({ ...props }: PromptProps) => {
  return (
    <Textarea
      colorScheme="purple"
      color="white"
      borderColor={"gray.500"}
      variant="outline"
      {...props}
    />
  );
};

export default Prompt;
