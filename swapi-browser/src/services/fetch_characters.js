const planetCache = new Map();

async function fetchHomeworldCached(url) {
    if (!url) return "Unknown";

    if (planetCache.has(url)) {
        return planetCache.get(url);
    }

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const name = data?.name || "Unknown";

        planetCache.set(url, name);

        return name;
    } catch (err) {
        console.error("Homeworld fetch failed:", err);
        return "Unknown";
    }
}

export async function fetchCharacters(page = 1) {
    try {
        const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const detailedCharacters = await Promise.all(
            (data.results || []).map(async (character) => ({
                name: character.name,
                height: character.height,
                mass: character.mass,
                birth_year: character.birth_year,
                gender: character.gender,
                eye_color: character.eye_color,
                hair_color: character.hair_color,
                skin_color: character.skin_color,
                homeworldName: await fetchHomeworldCached(character.homeworld),
                url: character.url,
            }))
        );

        return detailedCharacters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}