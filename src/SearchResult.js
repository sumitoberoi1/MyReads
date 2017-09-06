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

        this.setState({
            query:query.trim()
        })
    }
    static propTypes = {
        shelfedBooks:PropTypes.array.isRequired,
        searchBooks:PropTypes.array.isRequired,
        updateSearchBooks:PropTypes.func.isRequired,
        changeShelf:PropTypes.func.isRequired
    }
    changeShelf = (book,shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.props.changeShelf(book,shelf,true)
        })
    }
    searchBooks = (query) => {
        const { shelfedBooks } = this.props
        if (query) {
            let delayTimer;
            clearTimeout(delayTimer)
            delayTimer = setTimeout(()=> BooksAPI.search(query).then((books) => {
                const searchBooks = books.map(book => {
                    const existingBook = shelfedBooks.find(v => v.id === book.id);
                    book.shelf = !!existingBook ? existingBook.shelf : 'none';
                    return book;
                })
                this.props.updateSearchBooks(searchBooks,query)
            }),1000)
        } else  {
            this.props.updateSearchBooks([],query)
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
                        <input type="text" placeholder="Search by title or author"
                               value={query} onChange={(event) => {
                            this.updateQuery(event.target.value)
                            this.searchBooks(event.target.value)
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