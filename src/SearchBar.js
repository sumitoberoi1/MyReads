import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query:''
        }
    }
    updateQuery = (query) => {
        this.setState({
            query:query.trim()
        })
    }
    searchBooks = (query) => {
        BooksAPI.search()
    }

    render() {

        let {query} = this.state
        return (
            <div className="search-books-bar">
            <a className="close-search">Close</a>
            <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => {
                    this.updateQuery(event.target.value)
                }}/>
            </div>
        </div>
        )
    }
}
export default SearchBar