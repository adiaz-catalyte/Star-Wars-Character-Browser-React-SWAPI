import React, { useState, useEffect, useRef } from "react";
import { fetchCharacters } from "../services/fetch_characters";
import './Table.css';

function CharacterTable({ searchQuery }) {
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const loadedPagesRef = useRef(new Set());
    const loadingPagesRef = useRef(new Set());

    useEffect(() => {
        if (loadedPagesRef.current.has(page) || loadingPagesRef.current.has(page)) {
            return;
        }

        loadingPagesRef.current.add(page);

        async function loadCharacters() {
            setIsLoading(true);
            try {
                const fetched = await fetchCharacters(page);
                if (fetched.length === 0) {
                    setHasMore(false);
                    return;
                }

                setCharacters(prev => {
                    const mergedCharacters = new Map(prev.map(character => [character.url, character]));

                    fetched.forEach(character => {
                        if (!mergedCharacters.has(character.url)) {
                            mergedCharacters.set(character.url, character);
                        }
                    });

                    return Array.from(mergedCharacters.values());
                });
                loadedPagesRef.current.add(page);
            } catch (error) {
                console.error("Failed to load characters:", error);
            } finally {
                loadingPagesRef.current.delete(page);
                setIsLoading(false);
            }
        }

        loadCharacters();
    }, [page]);

    useEffect(() => {
        function handleScroll() {
            const bottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

            if (bottom && !isLoading && hasMore) {
                setPage(prev => prev + 1);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading, hasMore]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest("table")) {
                setSelectedCharacter(null);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const filteredCharacters = characters.filter((character) =>
        character.name.toLowerCase().includes((searchQuery || "").toLowerCase())
    );

    if (!characters || characters.length === 0) {
        return <p>no results</p>;
    }

    return (
        <div className="table-wrapper">
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
            </div>
            {isLoading && <p>Loading more characters...</p>}

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
                    <p><strong>HomeworldName:</strong> {selectedCharacter.homeworldName}</p>
                </div>
            )}
        </div>
    );
}

export default CharacterTable;