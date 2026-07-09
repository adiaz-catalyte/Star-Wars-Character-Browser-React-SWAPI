export const test_object = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    birth_year: "19BBY",
    gender: "male",
    url: "https://swapi.tech/api/people/1"
};

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
