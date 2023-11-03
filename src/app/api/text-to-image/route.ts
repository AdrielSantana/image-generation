import { GoogleAuth } from "google-auth-library";
import { credentials } from "../ credentials";

export async function POST(request: Request) {
  const { prompt, negativePrompt, CFG, steps } = await request.json();
  try {
    const auth = new GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const token = await auth.getAccessToken();

    const response = await fetch(process.env.TEXT_TO_IMAGE_URL ?? "", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [
          {
            prompt,
            negative_prompt: negativePrompt,
            guindance_scale: CFG,
            num_inference_steps: steps,
          },
        ],
      }),
    });
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
  }
}
