"use client";
import React, { createContext, useState } from "react";
import { GenerateImageContextData, GenerateImageProviderProps } from "./types";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { convertBase64ToDataUrl } from "@/utils/convert-base64-to-data-url";
import { getTextToImage } from "@/data/get-text-to-image";
import { getImageToImage } from "@/data/get-image-to-image";

export const GenerateImageContext = createContext<GenerateImageContextData>(
  {} as GenerateImageContextData
);

const GenerateImageProvider = ({ children }: GenerateImageProviderProps) => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [strength, setStrength] = useState<number>(50);
  const [CFG, setCFG] = useState<number>(10);
  const [steps, setSteps] = useState<number>(100);
  const [isFetching, setIsFetching] = useState(false);
  const [imageToManipulate64, setImageToManipulate64] = useState("");
  const [imageToManipulatePreview, setImageToManipulatePreview] = useState("");
  const [image64, setImage64] = useState("");

  const textToImage = async () => {
    setIsFetching(true);
    try {
      const res = await getTextToImage(prompt, negativePrompt, CFG, steps);
      if (res.error) throw new Error(res.error.message);
      setImage64(res.data.predictions[0]);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const imageToImage = async () => {
    setIsFetching(true);
    try {
      const res = await getImageToImage(
        prompt,
        negativePrompt,
        strength,
        imageToManipulate64,
        CFG,
        steps
      );
      if (res.error) throw new Error(res.error.message);
      setImage64(res.data.predictions[0]);
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message);
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleClickToGenerateImage = () => {
    setErrorMessage("");
    if (imageToManipulate64) {
      imageToImage();
    } else {
      textToImage();
    }
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
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
    maxFiles: 1,
    maxSize: 1 * 1024 * 1024, //1.5mb
    multiple: false,
  });

  const removeImageToManipulate = () => {
    setImageToManipulate64("");
    setImageToManipulatePreview("");
  };

  return (
    <GenerateImageContext.Provider
      value={{
        generatedImage: convertBase64ToDataUrl(image64),
        CFG,
        errorMessage,
        getInputProps,
        getRootProps,
        handleClickToGenerateImage,
        imageToManipulatePreview,
        isDragActive,
        isFetching,
        negativePrompt,
        prompt,
        removeImageToManipulate,
        setCFG,
        setNegativePrompt,
        setPrompt,
        setSteps,
        setStrength,
        steps,
        strength,
      }}
    >
      {children}
    </GenerateImageContext.Provider>
  );
};

export default GenerateImageProvider;
