export async function fetchCharacters() {
    try {
        const response = await fetch('https://swapi.tech/api/people');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const detailedCharacters = await Promise.all(
            data.results.map(async (character) => {
                const detailResponse = await fetch(character.url);
                const detailData = await detailResponse.json();
                return detailData.result.properties;
            })
        );

        return detailedCharacters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

export async function fetchHomeWorld(homeWorldUrl) {
    try {
        const response = await fetch(homeWorldUrl)
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data.result.properties;

    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}
