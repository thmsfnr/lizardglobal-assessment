
import React, { useState } from 'react'

/**
 * Component for displaying the most important informations of an article
 * @param props Item informations are passed in parameter (at props.elem) to increase the reusability of this component
 * @returns This component returns an event to its parent when the component is clicked on (with props.list)
 */
function Tile(props) {

    const [isHover, setIsHover] = useState(false); // Manage animations when moving the mouse over a tile (to replace the :hover of CSS)

    // CSS-In-JS style attributes (to have a completely autonomous component)
    const styles = {
        tile: {
            margin:"20px",
            maxWidth: "400px",
            minWidth: "400px",
            minHeight: "400px",
            transition: "0.7s",
            cursor: "pointer",
            transform: isHover ? "translateX(10px) translateY(-10px)" : "",
            backgroundColor: isHover ? "rgb(238, 238, 238)" : "",
        },
        content: {
            padding:"10px",
        },
        title: {
            fontSize: "35px",
        },
        author: {
            marginTop: "10px",
            fontSize: "25px",
        }
    }

    /**
     * Sends the current element to the father (the one the user has clicked on)
     */
    function send() {
        props.list(props.elem)
    }

    return(
        <div onClick={send} style={styles.tile} onMouseEnter={() => {setIsHover(true)}} onMouseLeave={() => {setIsHover(false)}} className="card text-center">
            {/* Tile header, with the author's name and avatar */}
            <header className="card-header">
                <img width="100" height="100" alt="author's avatar" src={props.elem.author.avatar} />
                <h2 style={styles.author}>{props.elem.author.name}</h2>
            </header>
            {/* Content of the tile with the title of the article */}
            <section style={styles.content}>
                <h1 style={styles.title}>{props.elem.title}</h1> 
            </section>
        </div>
    )
}

export default Tile
