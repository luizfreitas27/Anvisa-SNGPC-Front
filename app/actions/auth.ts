"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE = "https://sngpc-api.anvisa.gov.br";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Usuário e senha são obrigatórios." };
  }

  let token: string;

  try {
    const res = await fetch(`${API_BASE}/v1/Authentication/GetToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const text = await res.text();

    console.log(`[auth] POST /v1/Authentication/GetToken → ${res.status} ${res.statusText}`);
    console.log("[auth] response body:", text);

    if (!res.ok) {
      return {
        error: `Falha na autenticação (${res.status}): ${text || "Credenciais inválidas."}`,
      };
    }

    token = text.replace(/"/g, "");
  } catch (err) {
    console.error("[auth] fetch error:", err);
    return {
      error: "Erro ao conectar com o servidor. Tente novamente.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("sngpc_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8h
    path: "/",
  });

  redirect("/dashboard");
}
