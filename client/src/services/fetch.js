


export default async function fetchData(url, body) {

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(body)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }

}