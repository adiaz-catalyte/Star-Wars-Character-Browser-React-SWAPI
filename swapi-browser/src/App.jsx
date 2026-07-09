/*
    This is where are main api logic needs to happen
*/
import React, {useState, useEffect} from "react";
import { test_object } from "./fetch_characters";


function CharecterTable() {

    const characters = [test_object];

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
                        <tr>
                            <td>{character.name}</td>
                            <td>{character.height}</td>
                            <td>{character.mass}</td>
                            <td>{character.birth_year}</td>
                            <td>{character.gender}</td>
                        </tr>
                    ))}
                </tbody>
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