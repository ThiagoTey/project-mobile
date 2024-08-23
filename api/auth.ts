import CryptoJS from "crypto-js";
import Base64 from "base-64";

// Função que pega os dados das empresas da API
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

// Função para decodificar a parte do payload do JWT
function decodeJWT(jwt : string) {
  const [header, payload, signature] = jwt.split('.');

  // Decodificar o payload do formato Base64URL
  const decodedPayload = Base64.decode(payload.replace(/-/g, '+').replace(/_/g, '/'));

  // Converter para um objeto JSON
  return JSON.parse(decodedPayload);
}

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
  companyid: number,
  setError: (error: string) => void
) => {
  const url = new URL("http://config.ability.app.br/api/v1/users");

  // Dados a serem transformados em JWT
  const payload = {
    email: email,
    password: password,
    company_id: companyid,
  };

  // Chave secreta para assinar o JWT
  const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY;

  if(!secretKey){
    console.log("No secretKey");
    return
  }

  // Criar o JWT
  const jwt = createJWT(payload, secretKey);
  console.log("JWT:", jwt);

  url.searchParams.append("token", jwt);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
    });

    if (!response.ok) {
      setError("Falha na autenticação, verifique suas credenciais.");
      return;
    }

    const data = await response.json();

    if(data?.authentication_token) {
      const decodedData = decodeJWT(data.authentication_token);
      console.log('Dados Decodificados:', decodedData);
      return decodedData;
    } else {
      setError("Falha na autenticação, verifique suas credenciais.")
    }

  } catch (error) {
    setError("Erro ao tentar fazer login. Por favor, tente novamente.");
    throw error;
  }
};
