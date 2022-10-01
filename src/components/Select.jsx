
import React, { useState } from 'react'

/**
 * Component for displaying a selected category
 * @param props Item informations are passed in parameter (at props.elem) to increase the reusability of this component
 * @returns This component returns an event to its parent on click (with props.remove)
 */
function Select(props) {

    const [isHover, setIsHover] = useState(false); // Manage animations when moving the mouse over a tile (to replace the :hover of CSS)

    // CSS-In-JS style attributes (to have a completely autonomous component)
    const styles = {
        detail: {
            padding:"5px",
            cursor: "pointer",
            backgroundColor: isHover ? "rgb(238, 238, 238)" : "#F4F4F4",
            margin: "5px",
        },
        category: {
            paddingTop: "12px",
            paddingLeft: "10px",
            paddingRight: "10px",
        }
    }

    return (
        <div style={styles.detail} onMouseEnter={() => {setIsHover(true)}} onMouseLeave={() => {setIsHover(false)}} className="d-flex flex-row card text-center">
            <button onClick={() => {props.remove(props.elem)}} type="button" className="btn btn-danger">🗑</button>
            <p style={styles.category}>{props.elem}</p>
        </div>
    )
}

export default Select
