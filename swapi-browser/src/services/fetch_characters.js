export async function fetchCharacters() {
    try {
        const response = await fetch('https://swapi.tech/api/people?limit=10');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const detailedCharacters = await Promise.all(
            data.results.map(async (character) => {
                const detailResponse = await fetch(character.url);
                const detailData = await detailResponse.json();
                const props = detailData.result.properties;

                if(props.homeworld && props.homeworld.startsWith("http"))
                {
                    
                    try {
                        const homeworldResponse = await fetch(props.homeworld);
                        const homeworldData = await homeworldResponse.json();
                        
                        if (
                            homeworldData &&
                            homeworldData.result &&
                            homeworldData.result.properties &&
                            homeworldData.result.properties.name
                        ) {
                            props.homeworld = homeworldData.result.properties.name;
                        } else {
                            props.homeworld = "Unknown";
                        }
                    } catch (homeworldError) {
                        console.error("Failed to fetch homeworld:", homeworldError);
                        props.homeworld = "Unknown";
                    }

                } else {
                    props.homeworld = "unknown";
                }

                return props
            })
        );

        return detailedCharacters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}
