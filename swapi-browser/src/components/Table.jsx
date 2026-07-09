import React, { useState, useEffect } from "react";
import { fetchCharacters, test_object } from "../services/fetch_characters";

function CharacterTable() {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        async function loadCharacters() {
            try {
                const fetched = await fetchCharacters();
                setCharacters(fetched);
            } catch (error) {
                console.error("Failed to load characters:", error);
            }
        }

        loadCharacters();
    }, []);

    useEffect(() => {

        function handleClickOutside(event) {
            if(!event.target.closest("table")) {
                setSelectedCharacter(null);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    },[]);

    if (!characters || characters.length === 0) {
        return <p>no results</p>;
    }
    return (
        <div style={{ padding: '20px' }}>
            <h2>Character Table</h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Birth Year</th>
                        <th>Gender</th>
                    </tr>
                </thead>

                <tbody>
                    {characters.map((character) => (
                        <tr key={character.url}>
                            <td
                                id="character-name-cell"
                                onClick={() => setSelectedCharacter(character)}
                                style={{ cursor: "pointer" }}
                            >
                                {character.name}
                            </td>
                            <td>{character.height}</td>
                            <td>{character.mass}</td>
                            <td>{character.birth_year}</td>
                            <td>{character.gender}</td>
                        </tr>
                    ))}
                </tbody>

                {selectedCharacter && (
                    <div style={{ marginTop: "20px"}}>
                        <h3>Character Details</h3>
                        <p><strong>Name:</strong>{selectedCharacter.name}</p>
                        <p><strong>Height:</strong>{selectedCharacter.height}</p>
                        <p><strong>Weight:</strong>{selectedCharacter.mass}</p>
                        <p><strong>Birth Year:</strong>{selectedCharacter.birth_year}</p>
                        <p><strong>Gender:</strong>{selectedCharacter.gender}</p>
                        <p><strong>Eye Color:</strong>{selectedCharacter.eye_color}</p>
                        <p><strong>Hair Color:</strong>{selectedCharacter.hair_color}</p>
                        <p><strong>Skin Color:</strong>{selectedCharacter.skin_color}</p>
                    </div>
                )}
            </table>
        </div>
    );
}

export default CharacterTable;