import React from "react";
import { Button as ButtonChakra, ButtonProps } from "@chakra-ui/react";

const Button = ({ ...props }: ButtonProps) => {
  return (
    <ButtonChakra
      {...props}
      _hover={{
        bgGradient: "linear(to-l, #7928CA, #FF0080)",
        color: "white",
      }}
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      size={"lg"}
    >
      Gerar Imagem
    </ButtonChakra>
  );
};

export default Button;
