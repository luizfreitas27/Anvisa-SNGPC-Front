"use server";

const API_BASE = "https://sngpc-api.anvisa.gov.br";

export type UploadXmlState = {
  success: boolean;
  message?: string;
  error?: string;
};

export type ConsultaXmlState = {
  success: boolean;
  data?: string;
  error?: string;
};

export async function uploadXmlAction(
  _prevState: UploadXmlState,
  formData: FormData
): Promise<UploadXmlState> {
  const token = formData.get("token") as string;
  const file = formData.get("arquivo") as File;

  if (!token) {
    return { success: false, error: "Token de autenticação não encontrado. Faça login novamente." };
  }

  if (!file || file.size === 0) {
    return { success: false, error: "Selecione um arquivo XML válido." };
  }

  if (!file.name.endsWith(".xml")) {
    return { success: false, error: "Apenas arquivos .xml são aceitos." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = Buffer.from(arrayBuffer).toString("base64");

    const res = await fetch(`${API_BASE}/v1/FileXml/EnviarArquivoXmlSNGPC`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bytes),
    });

    const text = await res.text();

    console.log(`[xml:upload] POST /v1/FileXml/EnviarArquivoXmlSNGPC → ${res.status} ${res.statusText}`);
    console.log("[xml:upload] response body:", text);

    if (!res.ok) {
      return {
        success: false,
        error: `Erro no envio (${res.status}): ${text || "Falha ao enviar arquivo."}`,
      };
    }

    return {
      success: true,
      message: text.replace(/"/g, "") || "Arquivo enviado com sucesso!",
    };
  } catch (err) {
    console.error("[xml:upload] fetch error:", err);
    return {
      success: false,
      error: "Erro ao conectar com o servidor. Tente novamente.",
    };
  }
}

export async function consultaXmlAction(
  _prevState: ConsultaXmlState,
  formData: FormData
): Promise<ConsultaXmlState> {
  const token = formData.get("token") as string;
  const email = formData.get("email") as string;
  const cnpj = formData.get("cnpj") as string;
  const hash = formData.get("hash") as string;

  if (!token) {
    return { success: false, error: "Token de autenticação não encontrado. Faça login novamente." };
  }

  if (!email || !cnpj || !hash) {
    return { success: false, error: "Email, CNPJ e Hash são obrigatórios." };
  }

  try {
    const res = await fetch(
      `${API_BASE}/v1/FileXml/ConsultaDadosArquivoXml/${encodeURIComponent(email)}/${encodeURIComponent(cnpj)}/${encodeURIComponent(hash)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const text = await res.text();

    console.log(`[xml:consulta] GET /v1/FileXml/ConsultaDadosArquivoXml → ${res.status} ${res.statusText}`);
    console.log("[xml:consulta] response body:", text);

    if (!res.ok) {
      return {
        success: false,
        error: `Erro na consulta (${res.status}): ${text || "Nenhum dado encontrado."}`,
      };
    }

    return { success: true, data: text.replace(/"/g, "") };
  } catch (err) {
    console.error("[xml:consulta] fetch error:", err);
    return {
      success: false,
      error: "Erro ao conectar com o servidor. Tente novamente.",
    };
  }
}
