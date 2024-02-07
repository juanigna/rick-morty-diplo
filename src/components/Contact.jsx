import "./Contact.css"

export default function Contact() {
    return (
        <section className="contact-section">
            <div className="contact-card">
                <h1>Contact</h1>
                <h2>Leave us your information so we can contact you</h2>
                <form>
                    <div className="top-form">
                        <div className="top-inputs">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div className="top-inputs">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" />
                        </div>
                    </div>
                    <div>
                        <textarea className="input-textarea" rows={10}>

                        </textarea>
                    </div>
                    <button className="form-button">Send</button>
                </form>
            </div>
        </section>
    )
}