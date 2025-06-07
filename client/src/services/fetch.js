


export default async function fetchData(apiName, body, method) {
    const baseURL = "http://localhost:8080/";

    try {
         console.log(baseURL + apiName);
         console.log(JSON.stringify(body));
        const response = await fetch(baseURL + apiName, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: method ?? "GET",
            body: JSON.stringify(body)
        });
       
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error);
        throw error;
    }


}