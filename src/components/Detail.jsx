
/**
 * Component for displaying the detail of an article
 * @param props Item informations are passed in parameter (at props.elem) to increase the reusability of this component
 * @returns This component returns an event to its parent when the component or the button are clicked on (with props.list)
 */
const Detail = (props) => (
    <div onClick={props.list} style={styles.detail} className="card text-center">
        {/* Header of the article with information about the author */}
        <header className="card-header">
            <img width="130" height="130" alt="avatar" src={props.elem.author.avatar} />
            <h2 style={styles.author}>{props.elem.author.name}</h2>
        </header>
        {/* Basic information on the article */}
        <section style={styles.content}>
            <h1 style={styles.title}>{props.elem.title}</h1>
            <h2 style={styles.date}>{props.elem.publishDate}</h2>
            <hr/>
            <p style={styles.summary}>{props.elem.summary}</p>
        </section>
        {/* Additional elements namely the categories of the article and a button */}
        <footer className="card-footer">
            {/* List of categories */}
            <section>
                {(props.elem.categories).map(t=>
                    <h3 style={styles.category}>{t.name}</h3>
                )}
            </section>
            <button style={styles.button} onClick={props.list} type="button" className="btn btn-secondary btn-lg">Back</button>
        </footer>
    </div>
)

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
    detail: {
        margin:"20px",
        maxWidth: "800px",
        cursor: "pointer",
    },
    content: {
        margin: "20px",
    },
    title: {
        fontSize: "30px",
    },
    author: {
        color: "#5D5D5D",
    },
    date: {
        fontSize: "20px",
        color: "#5D5D5D",
    },
    summary: {
        fontSize: "22px",
        margin: "50px",
    },
    category: {
        fontSize: "20px",
        color: "#5D5D5D",
        margin: "20px",
    },
    button: {
        margin: "20px",
    }
}

export default Detail
