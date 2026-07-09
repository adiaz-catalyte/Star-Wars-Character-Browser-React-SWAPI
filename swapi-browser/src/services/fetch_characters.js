export async function fetchCharacters() {
    try {
        const firstPage = await fetch("https://swapi.tech/api/people?page=1&limit=10");
        const firstData = await firstPage.json();

        const totalPages = firstData.totalPages();

        let allCharacters = [...firstData.results];

        for (let page = 2; page <= totalPages; page++) {
            const result = await fetch(`https://swapi.tech/api/people?page=${page}&limit=10`)
            const data = await result.json();
            allCharacters = [...allCharacters, ...data.results];
        }

        const detailedCharacters = await Promise.all(
            allCharacters.map(async (character) => {
                const detailedResult = await fetch(character.url);
                const detailedData = await detailedResult.json();
                return detailedData.result.properties;
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
