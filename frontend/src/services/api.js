export async function sendGraphRequest(apiUrl, data) {
  const endpoint = `${apiUrl.replace(/\/+$/, '')}/bfhl`;
  
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error ${res.status}`);
  }

  return await res.json();
}
