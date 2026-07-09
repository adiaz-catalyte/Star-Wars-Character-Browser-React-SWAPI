/*
    This is where are main api logic needs to happen
*/
import React, {useState, useEffect} from "react";
import { test_object } from "./fetch_characters";




function CharecterTable() {

    const characters = [test_object];
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        function handleCLickOutside(event) {
            if(!event.target.closest("table")) {
                setSelectedCharacter(null);
            }
        }

        document.addEventListener("click", handleCLickOutside);
        return () => document.removeEventListener("click", handleCLickOutside);
    }, []);

    if (!characters || characters.length === 0) {
        return <p>No Characters Found!</p>;
    }
    return (
        <div style={{ padding: '20px' }}>
            <h2>Character Table</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px'}}>
                {/* Table Headers */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Birth Year</th>
                        <th>Gender</th>               
                    </tr>
                </thead>

                {/* Table Body with Dynamic Rows */}
                <tbody>
                    {characters.map((character) => (
                        <tr
                            key={character.url}
                            onClick = {() => setSelectedCharacter(character)}
                            style={{ cursor: "pointer"}}
                        >
                            <td>{character.name}</td>
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
    )
}

function App() {
    return (
        <div>
            <CharecterTable />
        </div>
    )
}

export default App;