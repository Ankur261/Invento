export default async function fetchData(url, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}