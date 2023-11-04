export const getTextToImage = async (
  prompt: string,
  negativePrompt: string,
  CFG: number,
  steps: number
) => {
  try {
    const response = await fetch('/api/text-to-image', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        negativePrompt,
        CFG,
        steps,
      }),
    });
    return response.json();
  } catch (error) {
    console.log("error", error);
  }
};
