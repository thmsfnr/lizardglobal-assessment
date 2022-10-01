
import React, { useState } from 'react'
import Tile from './Tile'
import Detail from './Detail'

/**
 * Component that displays a list of tiles by default, or the details of an item if the user has clicked on a tile (the detail component is in this one in order to display later a list of detailed articles)
 * @param props The detailed list of all items to be displayed, different from the list of all items in order to simply reuse this component after filtering or when loading more data
 */
function List(props) {

    const [isList,setList] = useState(true) // Boolean to manage the display between the tile list and the detail
    const [detail,setDetail] = useState([]) // Element representing the selected article (possibly none)

    // CSS-In-JS style attributes (to have a completely autonomous component)
    const styles = {
        list: {
            margin:"40px",
        },
    }

    /**
     * Manages the display change
     * @param elem The element on which the user has clicked
     */
    function displayChange(elem) {
        setList(!isList)
        setDetail(elem)
        props.detail(!isList)
    }

    return (
        <div style={styles.list} className="d-flex justify-content-center flex-wrap">
            {isList ? 
                /* List of articles */
                <section className="d-flex justify-content-center flex-wrap">
                    {props.elem.map(t=><Tile list={(select) => {displayChange(select)}} key={t.id} elem={t}/>)}
                </section>
                :
                /* Detailled article */
                <section>
                    <Detail list={displayChange} elem={detail}/>
                </section>
            }
        </div>
    )  
}

export default List
