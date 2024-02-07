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



    function shouldFetch(filters) {
        const availableFilters = ["status", "gender"];
        for (const filter of filters) {
            const [key] = filter.split('=');
            if (availableFilters.includes(key)) {
                return true;
            }
        }
        return false;
    }


    useEffect(() => {


            (async () => {
                if (characters.length > 0) {
                    if (shouldFetch(filters)) {
                        console.log(filters)
                        const res = await fetch(`https://rickandmortyapi.com/api/character?${filters.join('&')}`)
                        const data = await res.json()
                        setError("")
                        setCharacters(data.results)
                    }
                } else {
                    const characters = await getCharacters()
                    if (characters) {
                        setCharacters(characters.results)
                    }
                }
            })();


    }, [filters, characters.length])

    const handleChange = event => {
        const { value, checked } = event.target;
        const filterKey = value.split('=')[0];

        if (checked) {
            setFilters(prevFilters => {
                if (!prevFilters.some(filter => filter.startsWith(filterKey))) {
                    setError(null);
                    return [...prevFilters, value];
                } else {
                    setError('Two filters of the same type are already checked.');
                    return prevFilters;
                }
            });
        } else {
            setFilters(prevFilters => prevFilters.filter(filter => !filter.startsWith(filterKey)));
            setError(null);
        }
    };

    return (
        <main className="main-page">
            <div className="filters">
                <div className="filter">
                    <input type="checkbox" role="radio" value={"status=alive"} onChange={handleChange} />
                    <label>Character Alive</label>
                </div>
                <div className="filter">
                    <input type="checkbox" role="radio" value={"status=dead"} onChange={handleChange} />
                    <label>Character Dead</label>
                </div>
                <div className="filter">
                    <input type="checkbox" role="radio" value={"gender=female"} onChange={handleChange} />
                    <label>Female</label>
                </div>
                <div className="filter">
                    <input type="checkbox" role="radio" value={"gender=male"} onChange={handleChange} />
                    <label>Male</label>
                </div>
                <div className="filter">
                    <input type="checkbox" role="radio" value={"status=unknown"} onChange={handleChange} />
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