import { useContext } from 'react'
import { GenerateImageContext } from '../contexts/GenerateImageProvider'
import { GenerateImageContextData } from '../contexts/GenerateImageProvider/types'

export function useGenerateImage(): GenerateImageContextData {
  const context = useContext(GenerateImageContext)

  if (Object.keys(context).length <= 0) {
    throw new Error(
      'O hook useGenerateImage só pode ser usado em componentes abaixo do GenerateImageProvider.'
    )
  }

  return context
}
