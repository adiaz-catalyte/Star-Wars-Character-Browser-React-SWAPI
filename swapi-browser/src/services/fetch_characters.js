const planetCache = new Map();

async function fetchHomeworldCached(url) {
    if(!url) return "Unknown";

    if (planetCache.has(url)) {
        return planetCache.get(url);
    }

    try {
        const res = await fetch(url);
        const data = await res.json();

        const name = data?.result?.properties?.name || "Unknown";

        planetCache.set(url, name);

        return name;
    } catch (err) {
        console.error("Homewold fetch failed:", err);
        return "Unknown";
    }
}

export async function fetchCharacters() {
    try {
        const response = await fetch('https://swapi.tech/api/people?limit=5');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const detailedCharacters = await Promise.all(
            data.results.map(async (character) => {
                const detailResponse = await fetch(character.url);
                const detailData = await detailResponse.json();
                const props = detailData.result.properties;

                const homeworldName = await fetchHomeworldCached(props.homeworld);

                props.homeworldName = homeworldName;

                return props;
            })
        );

        return detailedCharacters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}
