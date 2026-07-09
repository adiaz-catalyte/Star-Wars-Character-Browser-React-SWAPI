import React, { useState } from "react";
import CharacterTable from "./components/Table";
import SearchBar from "./components/SearchBar";

function App(){
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div style={{ padding: "20px" }}>
            <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
            <CharacterTable searchQuery={searchQuery} />
        </div>
    )   
}

export default App;