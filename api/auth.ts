export const fetchCompanies = async (email: string) => {
  try {
    const url = new URL("http://config.ability.app.br/api/v1/companies_by_email");
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
