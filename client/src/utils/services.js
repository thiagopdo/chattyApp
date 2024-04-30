export const baseUrl = "http://localhost:5000/api";

export async function postRequest(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    message = data?.message ? data.message : data;
    return { error: true, message };
  }

  return data;
}

/**
 * get request function
 * @param {URL} url 
 * @returns 
 */
export async function getRequest(url) {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    const message = data?.message ? data.message : "An error occurred";

    return { error: true, message };
  }

  return data;
}
