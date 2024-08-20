import CryptoJS from "crypto-js";
import Base64 from "base-64";

export const fetchCompanies = async (email: string) => {
  try {
    const url = new URL(
      "http://config.ability.app.br/api/v1/companies_by_email"
    );
    url.searchParams.append("email", email);

    const response = await fetch(url.toString(), { method: "GET" });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch companys by email: ${response.statusText}`
      );
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

// Função para codificar em Base64URL
function toBase64URL(base64: string) {
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

// Função para criar o JWT
function createJWT(
  payload: { email: string; password: string; company_id: number },
  secretKey: string
) {
  // Cabeçalho do JWT
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  // Codificar o cabeçalho e o payload em Base64URL
  const encodedHeader = toBase64URL(Base64.encode(JSON.stringify(header)));
  const encodedPayload = toBase64URL(Base64.encode(JSON.stringify(payload)));

  // Criar a assinatura
  const signature = CryptoJS.HmacSHA256(
    `${encodedHeader}.${encodedPayload}`,
    secretKey
  );

  const encodedSignature = toBase64URL(
    CryptoJS.enc.Base64.stringify(signature)
  );

  // Concatenar tudo para formar o JWT
  const jwt = `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  return jwt;
}

export const loginAuth = async (
  email: string,
  password: string,
  companyid: number
) => {
  const url = new URL("http://config.ability.app.br/api/v1/users");
  // url.searchParams.append("email", email);

  // const encryptedJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbmZpZ0BhYmlsaXR5b25saW5lLmNvbS5iciIsInBhc3N3b3JkIjoiI0E3NSQmIiwiY29tcGFueV9pZCI6Mzh9.WFJ5_hx9eKwEqJpWwr66DNNxa2qUEEwJEf7xyk0iq64';
  // Dados a serem transformados em JWT
  const payload = {
    email: email,
    password: password,
    company_id: companyid,
  };

  // Chave secreta para assinar o JWT
  const secretKey = process.env.SECRET_KEY || "";

  // Criar o JWT
  const jwt = createJWT(payload, secretKey);
  console.log("JWT:", jwt);

  // let bytes = CryptoJS.AES.decrypt(encryptedJWT, secretKey);
  // let decryptedJWT = bytes.toString(CryptoJS.enc.Utf8);
  // console.log('JWT Descriptografado:', decryptedJWT);

  // try {
  //   const response = await fetch(url, {
  //     body: JSON.stringify({
  //       token : token
  //     })
  //   })
  // } catch (error) {
  //   throw error
  // }
};
