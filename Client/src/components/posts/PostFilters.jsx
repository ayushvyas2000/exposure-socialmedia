import React, { useState } from 'react'
import {  setFilters } from '../../features/post/postSlice'
import { useDispatch } from 'react-redux'
import {FaFilter} from 'react-icons/fa'
const PostFilters = () => {
    const [toggle, setToggle] = useState(false)
    const [sortBy, setSortBy] = useState('')
    const [searchBy, setSearchBy] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch=useDispatch()

    const reset=()=>{
        setSortBy('None')
        setSearchBy('None')
        setSearchTerm('')
        dispatch(setFilters({}))
      }
  return (<>
  <div  className="filter-toggle">
    <button onClick={()=>setToggle(!toggle)}>
    <FaFilter /> 
    <p>{toggle?' Hide ':' Expand '}filters</p>
    </button>
  </div>
    <section style={toggle?{display:'flex'}:{display:'none'}} className="query-menu">
          <div>
          <label htmlFor="sortBy">Sort By:</label>
          <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} name="sortBy" id="sortBy">
            <option selected hidden >Choose an option</option>
            <option value="-likesCount">Likes (High to low)</option>
            <option value="likesCount">Likes (Low to high)</option>
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest first</option>
            </select>
          </div>
          <div>
          <label htmlFor="searchBy">Search By:</label>
            <select value={searchBy} onChange={(e)=>setSearchBy(e.target.value)} name="searchBy" id="searchBy">
            <option selected hidden >Choose an option</option>
            <option value="tags">Tags</option>
            <option value="title">Title</option>
            </select>
            </div>
            <div>
              <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='search' />
              </div>
              <div>
                <button onClick={reset}>
                  Reset
                </button>
              </div>
            <div>
                <button onClick={()=>dispatch(setFilters({
                    sortBy,
                    searchBy,
                    searchTerm
                }))}>Done</button>
            </div>
        </section>
        </>
  )
}

export default PostFilters