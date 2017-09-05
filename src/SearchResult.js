import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import BookItem from "./BookItem";
class SearchResult extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query:''
        }
    }
    updateQuery = (query) => {
        if (query) {
            this.props.updateSearchBooks([])
        }
        this.setState({
            query:query.trim()
        })
    }
    static propTypes = {
        shelfedBooks:PropTypes.array.isRequired,
        searchBooks:PropTypes.array.isRequired,
        updateSearchBooks:PropTypes.func.isRequired,
        push:PropTypes.func.isRequired,
        getAllBooks:PropTypes.func.isRequired
    }
    changeShelf = (book,shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.searchBooks(this.state.query)
            this.props.getAllBooks()
            this.props.push('/')

        })
    }
    searchBooks = (query) => {
        let { shelfedBooks } = this.props
        if (query.length > 0) {
            BooksAPI.search(query).then((books) => {
                if (books) {
                    books.map((book) => {
                        shelfedBooks.forEach((shelfedBook) => {
                            if (book.id === shelfedBook.id) {
                                book.shelf = shelfedBook.shelf
                            }
                        })
                        return book
                    })
                    this.props.updateSearchBooks(books)
                }
            })
        } else {
            console.log(`Empty array`)
            this.props.updateSearchBooks([])
        }
    }
    render() {
        let {query} = this.state
        let {searchBooks} = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className = "close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => {
                            this.updateQuery(event.target.value)
                            {(query) && this.searchBooks(query)}
                        }}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {(searchBooks) && (searchBooks.map((book) => (
                            <li key={book.id} className='contact-list-item'>
                                <BookItem book = {book} handleShelfChange={this.changeShelf}/>
                            </li>
                        )))}
                    </ol>
                </div>
            </div>
        )
    }
}
export default SearchResult