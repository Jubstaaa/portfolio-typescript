export const fetcher = async <T>([url, params]: [
  string,
  Record<string, string>,
]): Promise<T> => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${url}?${queryString}`);

  if (!response.ok) {
    throw new Error("Veri çekme başarısız!");
  }

  return response.json();
};
