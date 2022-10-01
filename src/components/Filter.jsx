
import Select from './Select'

/**
 * Component to restrict articles to one or more categories
 * @param props Item informations (namely the list of categories and the list of selected categories) are passed in parameter (at props.elem) to increase the reusability of this component
 * @returns This component returns an event to its parent when a remove selected category button is clicked on (with props.remove) or when a category is selected (with props.filter)
 */
const Filter = (props) => (
    <div className="d-flex justify-content-start align-items-center">
        {/* Item to select a category to filter the items displayed */}
        <section style={styles.select}>
            <select onChange={props.filter} className="form-select" aria-label="Default select example">
                <option value="">Select a category</option>
                {/* List of existing and not already selected categories */}
                {props.elem.map(t=><option key={t} value={t}>{t}</option>)}
            </select>
        </section>
        {/* List of selected categories */}
        <section>
            {(props.select.length!==0) ?
                /* List of categories selected if there is at least one */
                <article className="d-flex justify-content-center flex-wrap"> 
                    {props.select.map(t=><Select remove={(e) => props.remove(e)} elem={t}/>)}
                </article>
                :
                /* Nothing to display as there are no categories selected */
                <div/>
            }
        </section>
    </div>
)

// CSS-In-JS style attributes (to have a completely autonomous component)
const styles = {
    select: {
        margin:"20px",
        marginRight:"30px",
    },
}

export default Filter
