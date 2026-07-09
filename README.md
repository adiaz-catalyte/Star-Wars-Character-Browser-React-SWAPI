# Star Wars Character Browser

A polished, proof-of-concept React application that lets you browse Star Wars characters from the public SWAPI. Built for learning modern JavaScript and React, this project demonstrates component-based UI design, state management, asynchronous data fetching, client-side search, and graceful loading/error handling. Even the Empire would approve of this level of organization.

> A small but mighty app, forged in the fires of Vite and React, where the only thing more powerful than the Force is a well-structured table.

## Description

This project was created as a browser-based companion to a beginner-friendly JavaScript and React learning experience. Instead of relying on hardcoded data, the app fetches character information live from the SWAPI people endpoint and presents it in a searchable, responsive table.

The application is intentionally simple and focused on core concepts:

- Fetching remote JSON data with React hooks
- Rendering dynamic table rows from API results
- Filtering results client-side as the user types
- Displaying loading and error states without crashing the UI
- Organizing the app into reusable components rather than a single massive file

## Features

- Fetches character data from the SWAPI people endpoint on initial load
- Displays a loading message while data is being retrieved
- Shows a human-readable error message if the request fails
- Renders a table with the following columns: name, height, mass, birth year, and gender
- Supports case-insensitive client-side search filtering
- Shows a friendly “no results” message when no characters match the query
- Includes a light-touch character detail interaction when a row is selected
- Uses a component-based structure with separate UI pieces for layout, search, and table display

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js 18 or newer
- npm 9 or newer

You can verify your installation with:

```bash
node -v
npm -v
```

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Star-Wars-Character-Browser-React-SWAPI
```

2. Install dependencies:

```bash
cd swapi-browser
npm install
```

## Usage

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, typically:

```text
http://localhost:5173
```

Additional scripts:

```bash
npm run build
npm run lint
npm run preview
```

## Project Structure

The app is organized into a simple React + Vite structure:

```text
src/
  App.jsx
  main.jsx
  components/
    SearchBar.jsx
    Table.jsx
  services/
    fetch_characters.js
```

This separation keeps the UI logic manageable and avoids the dark side of one giant component file.

## Technical Notes

This project follows the learning goals set out for the browser-based version of the assignment:

- Uses React function components and hooks
- Passes data between parent and child components via props
- Uses client-side filtering rather than triggering a new request on every keystroke
- Handles network states gracefully instead of leaving the user staring at a blank void
- Avoids assuming all API fields are present and displays fallback values when needed

## Validation and Error Handling

The app is designed to handle the three great states of the network galaxy:

- Loading: a clear message is shown while the request is in flight
- Success: the table is populated with fetched results
- Error: a readable message is shown if the request fails

The fetch logic also checks for a successful HTTP response before attempting to parse the data, which prevents the app from falling into unnecessary chaos.

## Stretch Goals

Once the core experience is complete, future improvements could include:

- Resolving homeworld URLs into human-readable planet names
- Fetching all SWAPI pages instead of just the first page
- Adding sortable table columns
- Replacing the plain loading text with a visual skeleton
- Persisting the current search query in the URL
- Adding automated tests for the search and rendering behavior

## License

This project is intended for educational use and is not a production-grade application.

## Contributors
<a href="https://github.com/adiaz-catalyte/Star-Wars-Character-Browser-React-SWAPI/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=adiaz-catalyte/Star-Wars-Character-Browser-React-SWAPI" />
</a>
