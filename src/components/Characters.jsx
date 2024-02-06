import { useState } from "react"
import { useEffect } from "react"
import "./Characters.css"

export default function Characters() {
    const [characters, setCharacters] = useState([])
    const [filters, setFilters] = useState([])
    const [Error, setError] = useState("")

    const getCharacters = async () => {
        const res = await fetch('https://rickandmortyapi.com/api/character')
        const data = await res.json()
        return data
    }

    useEffect(() => {
        (async () => {
            if (filters.length === 0) {
                const characters = await getCharacters()
                if (characters) {
                    setCharacters(characters.results)
                }
            }
        })();
    }, [filters])

    function shouldFetch(filters) {
        const availableFilters = ["name", "status", "gender"];
        for (const filter of filters) {
            const [key] = filter.split('=');
            if (availableFilters.includes(key)) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        if (filters.length > 0) {

            (async () => {
                if (characters.length > 0) {
                    if (shouldFetch(filters)) {
                        const res = await fetch(`https://rickandmortyapi.com/api/character?${filters.join('&')}`)
                        const data = await res.json()
                        setError("")
                        setCharacters(data.results)
                    }
                }
            })();
        }
    }, [filters])

    const handleChange = event => {
        const { value, checked } = event.target;

        if (checked) {
            setFilters(prevFilters => {
                if (!prevFilters.some(filter => filter.startsWith(value.split('=')[0]))) {
                    setError(null);
                    return [...prevFilters, value];
                } else {
                    setError('Two filters of the same type are already checked.');
                return prevFilters;
                }
            });
        } else {
            setFilters(prevFilters => prevFilters.filter(filter => filter !== value));
            setError(null);
        }
    };

    return (
        <main className="main-page">
            <div className="filters">
                <div className="filter">
                    <input type="checkbox" role="switch" value={"status=alive"} onChange={handleChange} />
                    <label>Character Alive</label>
                </div>
                <div className="filter">
                    <input type="checkbox" role="switch" value={"status=dead"} onChange={handleChange} />
                    <label>Character Dead</label>
                </div>
                <div className="filter">
                    <input type="checkbox" role="switch" value={"gender=female"} onChange={handleChange} />
                    <label>Female</label>
                </div>
                <div className="filter">
                    <input type="checkbox" role="switch" value={"gender=male"} onChange={handleChange} />
                    <label>Male</label>
                </div>
                <div className="filter">
                    <input type="checkbox" role="switch" value={"status=unknown"} onChange={handleChange} />
                    <label>Origin Unknown</label>
                </div>

            </div>

            {
                !Error ?
                <div className="card-container">
                    {characters.map((data, i) => (
                        <div key={i} className="character-card">
                            <img src={data.image} alt={data.name} />
                            <p>{data.name}</p>
                            <button>Know more...</button>
                        </div>
                    ))}
                    </div> :
                    <div>
                        <p>{Error}</p>
                    </div>
            }
        </main>
    )
}