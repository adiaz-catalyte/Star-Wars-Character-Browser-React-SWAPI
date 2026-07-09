const homeworldCache = new Map();

async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, retries = 2) {
    const normalizedUrl = url.replace("https://www.swapi.tech", "https://swapi.tech");
    const urlObject = new URL(normalizedUrl);
    const hosts = ["https://swapi.dev", "https://swapi.py4e.com", "https://swapi.tech"];
    const candidates = hosts.map((host) => new URL(urlObject.pathname + urlObject.search, host).toString());

    let lastError;

    for (const candidate of candidates) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const response = await fetch(candidate);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return await response.json();
            } catch (error) {
                lastError = error;
                if (attempt < retries) {
                    await wait(300 * (attempt + 1));
                }
            }
        }
    }

    throw lastError || new Error(`Failed to fetch ${normalizedUrl}`);
}

async function fetchHomeworldName(homeworldUrl) {
    if (!homeworldUrl || !homeworldUrl.startsWith("http")) {
        return "Unknown";
    }

    if (homeworldCache.has(homeworldUrl)) {
        return homeworldCache.get(homeworldUrl);
    }

    const planetIdMatch = homeworldUrl.match(/\/planets\/(\d+)\/?/);
    if (!planetIdMatch) {
        homeworldCache.set(homeworldUrl, "Unknown");
        return "Unknown";
    }

    const planetId = planetIdMatch[1];

    try {
        const data = await fetchJson(`https://swapi.dev/api/planets/${planetId}/`, 1);
        const planetName = data.name || data.result?.properties?.name;

        if (planetName) {
            homeworldCache.set(homeworldUrl, planetName);
            return planetName;
        }
    } catch (error) {
        console.warn("Failed to resolve homeworld:", error.message);
    }

    homeworldCache.set(homeworldUrl, "Unknown");
    return "Unknown";
}

export async function fetchCharacters() {
    try {
        const firstPage = await fetchJson("https://swapi.dev/api/people/?page=1", 2);
        const totalPages = firstPage?.count ? Math.ceil(firstPage.count / 10) : 1;

        let allCharacters = [...(firstPage?.results || [])];

        const additionalPages = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, index) => index + 2).map(async (page) => {
                try {
                    const data = await fetchJson(`https://swapi.dev/api/people/?page=${page}`, 1);
                    return data?.results || [];
                } catch (error) {
                    console.warn(`Failed to load page ${page}:`, error.message);
                    return [];
                }
            })
        );

        allCharacters = allCharacters.concat(...additionalPages);

        const detailedCharacters = await Promise.all(
            allCharacters.map(async (character) => {
                try {
                    const detailedData = await fetchJson(character.url, 1);
                    const properties = detailedData.result?.properties || detailedData;
                    const props = { ...properties };

                    props.homeworld = await fetchHomeworldName(props.homeworld);
                    return props;
                } catch (error) {
                    console.warn(`Failed to load details for ${character.name || "character"}:`, error.message);
                    return {
                        name: character.name || "Unknown",
                        url: character.url,
                        homeworld: "Unknown",
                        height: "Unknown",
                        mass: "Unknown",
                        birth_year: "Unknown",
                        gender: "Unknown",
                        eye_color: "Unknown",
                        hair_color: "Unknown",
                        skin_color: "Unknown"
                    };
                }
            })
        );

        return detailedCharacters;
    } catch (error) {
        console.error("Error fetching characters:", error);
        return [];
    }
}
