import { GoogleAuth } from "google-auth-library";
import { credentials } from "../ credentials";
import Jimp from "jimp";

export async function POST(request: Request) {
  const { prompt, negativePrompt, image64, strength, CFG, steps } =
    await request.json();

  let binary_string = atob(image64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }

  const buffer = Buffer.from(bytes.buffer);

  const imageReaded = await Jimp.read(buffer);

  const image64Resized = await imageReaded
    .crop(0, 0, 768, 768)
    .resize(768, 768)
    .quality(100)
    .getBase64Async(Jimp.MIME_JPEG);

  const image = image64Resized.split(",")[1];

  try {
    const auth = new GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const token = await auth.getAccessToken();

    const response = await fetch(process.env.IMAGE_TO_IMAGE_URL ?? "", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [
          {
            prompt,
            image,
            negative_prompt: negativePrompt,
            guindance_scale: CFG,
            num_inference_steps: steps,
            strength: strength / 100,
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
