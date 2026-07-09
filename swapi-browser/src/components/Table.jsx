import React, { useState, useEffect } from "react";
import { fetchCharacters, fetchHomeWorld } from "../services/fetch_characters";
import './Table.css';

function CharacterTable({ searchQuery }) {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [homeworld, setHomeworld] = useState(null);

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

    useEffect(() => {
        async function loadHomeworld() {
            if (selectedCharacter) {
                const planet = await fetchHomeWorld(selectedCharacter.homeworld);
                setHomeworld(planet);
            }
        }
        loadHomeworld();
    }, [selectedCharacter]);

    const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes((searchQuery || "").toLowerCase())
    );

    if (!characters || characters.length === 0) {
        return <p>no results</p>;
    }

    return (
        <div className="table-container">
            <h2>Character Table</h2>

            <table className="character-table">
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
                    {filteredCharacters.length > 0 ? (
                        filteredCharacters.map((character) => (
                            <tr key={character.url}>
                                <td
                                    id="character-name-cell"
                                    onClick={() => setSelectedCharacter(character)}
                                >
                                    {character.name}
                                </td>
                                <td onClick={() => setSelectedCharacter(null)}>{character.height}</td>
                                <td onClick={() => setSelectedCharacter(null)}>{character.mass}</td>
                                <td onClick={() => setSelectedCharacter(null)}>{character.birth_year}</td>
                                <td onClick={() => setSelectedCharacter(null)}>{character.gender}</td>
                            </tr>
                        ))
                    ) : (
                        <tr className="empty-row">
                            <td colSpan="5">
                                No characters match your search.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedCharacter && (
                <div className="details-panel">
                    <h3>Character Details</h3>
                    <p><strong>Name:</strong> {selectedCharacter.name}</p>
                    <p><strong>Height:</strong> {selectedCharacter.height}</p>
                    <p><strong>Weight:</strong> {selectedCharacter.mass}</p>
                    <p><strong>Birth Year:</strong> {selectedCharacter.birth_year}</p>
                    <p><strong>Gender:</strong> {selectedCharacter.gender}</p>
                    <p><strong>Eye Color:</strong> {selectedCharacter.eye_color}</p>
                    <p><strong>Hair Color:</strong> {selectedCharacter.hair_color}</p>
                    <p><strong>Skin Color:</strong> {selectedCharacter.skin_color}</p>
                    
                    {homeworld && (
                        <p><strong>Homeworld:</strong> {homeworld.name}</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default CharacterTable;
