
import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import List from './List'

/**
 * Component managing the application and the various components that make it up
 * @returns Content of the application
 */
function App() {

  const url = 'http://localhost:3000/api/posts/' // Url of the api to fetch the articles
  const nbShow = 20 // Number of articles to display by default

  const [data,setData] = useState([]) // List containing all the articles
  const [dataShow,setDataShow] = useState([]) // List containing the articles to be displayed (depending on the number of data to be displayed and the different filters)
  const [category,setCategory] = useState([]) // List containing the not selected categories associated with the articles
  const [select,setSelect] = useState([]) // List containing the selected categories associated with the articles 
  const [detail,setDetail] = useState(true) // Boolean representing if the list component displays a detail or tiles
  const [length,setLength] = useState(nbShow) // Number of articles to display
  const [isLoading, setLoading] = useState(true) // Boolean representing whether the default content has been loaded
  const [isFull,setFull] = useState(false) // Boolean representing whether all available data are currently the ones displayed

  // CSS-In-JS style attributes (to have a completely autonomous component)
  const styles = {
    nav: {
      backgroundColor: "#24eba3",
      minHeight: "100px",
    }
  }

  /**
   * Returns a list of articles corresponding to categories (to be reused easily)
   * @returns The list of articles
   */
   function calcData() {
    let list = []
    for (let article of data) { // Each article
      for (let group of article.categories) { // Each category of the article
        for (let categoryName of select) { // Each category selected

          if (group.name === categoryName) { // The article is part of the selected category
            list.push(article)
          }
        }
      }
    }
    return Array.from(([new Set(list)])[0]) // Creation of a set to remove duplicates
  }

  /**
   * Manages the update of the articles to be displayed
   */
   function manageShowMore(listData) {
    setLength(length+nbShow);

    if (length >= listData.length) { // The number of articles to display exceeds the total number of articles
      setFull(true)
      setLength(listData.length)
    } 

    setDataShow(listData.slice(0,length))
  }

  /**
   * Increases the number of articles displayed
   */
  function showMore() {
    if (select.length!==0) { // At list one category is selected
      const saveData = calcData()
      manageShowMore(saveData)
    } else { // No category selected
      manageShowMore(data)
    }
  }
  
  /**
   * Manages the articles displayed (because used several times)
   */
  function manageShowData() {
    const save = calcData()

    if (save.length>=nbShow) { // Too many articles to display
      setFull(false)
      setDataShow(save.slice(0,length))
    } else { // All articles can be displayed directly
      setFull(true)
      setDataShow(save)
    }
  }

  /**
   * Filters the displayed articles according to the selected categories
   * @param elem New category to filter
   */
  function filter(elem) {
    setLength(nbShow)

    // Adds the newly selected category to the list that contains them
    let newSelect = select
    newSelect.push(elem.target.value)
    setSelect(newSelect)

    manageShowData()
    setCategory(category.filter(t=>select[select.length-1]!==t)) // Filter the constant category to remove the one that has just been selected
  }

  /**
   * Removes a category from the list that contains the categories
   * @param elem The category to be removed
   */
  function remove(elem) {
    // Removes the desired category from the list
    let newSelect = []
    select.filter(t=> {
      if (t!==elem) { // It is not the element that we want to remove
        newSelect.push(t)
      }
      return t
    })
    setSelect(newSelect)

    category.push(elem)

    if (newSelect.length === 0) { // No active filter
      setFull(false)
      setDataShow((data).slice(0,nbShow));
    } else { // Active filter
      manageShowData()
    }
  }


  // Retrieve of the various elements to be displayed when the component is loaded
  useEffect(() => {
    fetch(url)
      .then(resp => resp.json())
      .then(data2 => {

        setDataShow((data2.posts).slice(0,length)) // Saves the articles to be displayed by default
        setLoading(false); // Authorize the posting of articles
        
        (data2.posts).map(t => (t.categories).map(a=>{
            if (!category.includes(a.name)) { // If the category has not already been registered in the list
                category.push(a.name)
            }
            return t
        }))

        setData(data2.posts) // Stores all articles provided by the api (because the data constant will be changed)
      })
      // eslint-disable-next-line
  },[])

  return  (
    <div>
      {/* Application header bar (contains the filtering section) */}
      <header style={styles.nav} className="navbar navbar-light">
        <section>
          {isLoading ? 
            /* Nothing to display */
            <div/>
            : 
            /* Component dedicated to filtering  */
            <Filter filter={filter} elem={category} select={select} remove={remove}></Filter>
          }
        </section>
      </header>
      {/* Content of the application (article display) */}
      <section>
        {/* Main content of the application */}
        <article>
          {isLoading ? 
            /* Loading spinner (when the articles are not yet loaded) */ 
            <section className="d-flex justify-content-center">
              <div className="spinner-border m-5" role="status"></div>
            </section>
            : 
            /* Component managing the display of articles */
            <List detail={(detail) => {setDetail(detail)}} elem={dataShow}></List>
          }
        </article>
        {/* Management of the number of articles displayed */}
        <article className="d-flex justify-content-center">
          {(!isFull && !isLoading && detail) ? 
            /* Button to load more articles */
            <button onClick={showMore} type="button" className="btn btn-secondary btn-lg">More</button>
            :
            /* Nothing to display */
            <div/>
          }
        </article>
      </section>
    </div>
  )
}

export default App;
