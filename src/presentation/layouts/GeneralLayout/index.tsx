"use client";

import { Box } from "@chakra-ui/react";
import React from "react";
import BackgroundAnimation from "./BackgroundAnimation";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <BackgroundAnimation />
      <Box
        minH="100lvh"
        w="100%"
        px={["1rem", "2rem", "3rem", "5rem"]}
        py={["0.5rem", "2rem"]}
      >
        {children}
      </Box>
    </>
  );
};

export default GeneralLayout;
