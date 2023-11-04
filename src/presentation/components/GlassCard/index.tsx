'use client'

import { Box } from "@chakra-ui/react";
import React from "react";
import { GlassCardProps } from "./types";

const GlassCard = ({
  children,
  ...props
}: GlassCardProps) => {
  return (
    <Box
      {...props}
      minH={"100%"}
      borderRadius={"12px"}
      backdropFilter={"blur(16px) saturate(180%)"}
      backgroundColor={"rgba(17, 25, 40, 0.75)"}
      border={"1px solid rgba(255, 255, 255, 0.125)"}
      paddingY={["1rem", "2rem"]}
      paddingX={["1rem", "2rem", "3rem", "4rem"]}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
