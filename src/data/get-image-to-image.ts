export const getImageToImage = async (
  prompt: string,
  negativePrompt: string,
  strength: number,
  image64: string,
  CFG: number,
  steps: number
) => {
  try {
    const response = await fetch("/api/image-to-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        negativePrompt,
        strength,
        image64,
        CFG,
        steps,
      }),
    });
    return response.json();
  } catch (error) {
    console.log("error", error);
  }
};
