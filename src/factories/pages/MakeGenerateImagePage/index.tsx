"use client";

import React from "react";
import GenerateImagePage from "@/presentation/pages/GenerateImagePage";
import GenerateImageProvider from "@/presentation/contexts/GenerateImageProvider";

const MakeGenerateImagePage = () => {
  return (
    <GenerateImageProvider>
      <GenerateImagePage />
    </GenerateImageProvider>
  );
};

export default MakeGenerateImagePage;
