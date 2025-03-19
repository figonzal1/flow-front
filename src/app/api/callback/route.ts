/**
 * Recibir callback de flow post-registro de tarjeta
 * @param req
 * @returns
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const contentType = req.headers.get("content-type");

    let data: Record<string, any>;

    if (contentType && contentType.includes("application/json")) {
      data = await req.json();
    } else if (
      contentType &&
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const text = await req.text(); // Leer como texto
      data = Object.fromEntries(new URLSearchParams(text)); // Convertir a objeto
    } else {
      return Response.json({ error: "Formato no soportado" }, { status: 415 });
    }
    console.log("Callback recibido:", data);

    return Response.redirect(
      `https://enormously-rapid-duckling.ngrok-free.app/result?token=${data.token}`,
      308
    );
  } catch (error) {
    console.log("Error al procesar el callback:", error);
    return Response.json(
      { error: "Error al procesar el callback" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json(
    { message: "Esta ruta solo acepta POST" },
    { status: 405 }
  );
}
