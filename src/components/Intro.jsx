import "./Intro.css"
import { Link } from "react-router-dom"

export default function Intro() {
    return (
        <section className="section-intro">
            <div className="intro-card">
                <h1 className="title">Proyect Rick & Morty</h1>
                <h2 className="subtitle">Welcome to Rick & Morty Proyect!</h2>
                <p className="intro-text">This proyect was made for practising React and to made a functional website</p>
                <p className="intro-text">In this website you can know information of the characters of this animated series.</p>
                <p className="intro-text">Also you can filter for diferent types of properties to find the character that you are looking for or send us a massage for any concern o sugestion</p>
                <span>Lets go!</span>
                <div className="intro-buttons">
                    <Link to={`/characters`} className="intro-button">
                        Characters
                    </Link>
                    <Link to={`/contact`} className="intro-button">
                        Contact
                    </Link>
                </div>

            </div>
        </section>
    )
}