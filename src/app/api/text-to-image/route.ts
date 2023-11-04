export async function POST(request: Request) {
  const { prompt, negativePrompt, CFG, steps } = await request.json();
  try {
    const response = await fetch(`${process.env.API_URL}/text-to-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SECRET}`,
      },
      body: JSON.stringify({
        prompt,
        negativePrompt,
        CFG,
        steps,
      }),
    });
    const data = await response.json();
    return Response.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message });
    }
  } finally {
    return Response.json({ message: "prompt enviado" });
  }
}
