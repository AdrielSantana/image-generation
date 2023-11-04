import { ReactNode } from "react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

export interface GenerateImageContextData {
  generatedImage: string;
  isFetching: boolean;
  errorMessage: string;
  prompt: string;
  steps: number;
  CFG: number;
  strength: number;
  imageToManipulatePreview: string;
  isDragActive: boolean;
  negativePrompt: string;
  setPrompt: (prompt: string) => void;
  setNegativePrompt: (negativePrompt: string) => void;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T
  removeImageToManipulate: () => void;
  setStrength: (strength: number) => void;
  setCFG: (CFG: number) => void;
  setSteps: (steps: number) => void;
  handleClickToGenerateImage: () => void;
}

export interface GenerateImageProviderProps {
  children: ReactNode;
}
