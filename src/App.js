import React from 'react'
import { Route,Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import WelcomeHeader from './WelcomeHeader'
import SearchResult from './SearchResult'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        shelfedBooks:[],
        searchedBooks:[]
    }
    changeShelf = (book,shelf) => {
        BooksAPI.update(book, shelf).then(() => {
            this.getAllBooks()
        })
    }

    getAllBooks = () => {
        BooksAPI.getAll().then((books) => {
            console.log(books)
            this.setState({
                shelfedBooks: books
            })
        })
    }

    updateSearchedBooks = (searchedBooks) => {
        this.setState({
            searchedBooks: searchedBooks
        })
    }

    getBooksAccordingToCategory = (books,category) => {
        let filteredBookArray = books.filter((book) => {
            return book.shelf == category
        })
        return filteredBookArray
    }
    componentDidMount() {
        this.getAllBooks()
    }


    render() {
        let {shelfedBooks,searchedBooks}= this.state
        return (
            <div className="app">
                <Route exact path = "/" render = {() => (
                    <div className="list-books">
                        <WelcomeHeader/>
                        <div className="list-books-content">
                            <div>
                                <BookShelf books={this.getBooksAccordingToCategory(shelfedBooks,'currentlyReading')}
                                           bookShelfTitle='Currently Reading'
                                           changeShelf = {this.changeShelf}/>
                                <BookShelf books={this.getBooksAccordingToCategory(shelfedBooks,'wantToRead')}
                                           bookShelfTitle = 'Want To Read'
                                           changeShelf = {this.changeShelf} />
                                <BookShelf books={this.getBooksAccordingToCategory(shelfedBooks,'read')}
                                           bookShelfTitle = 'Read'
                                           changeShelf = {this.changeShelf}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search"> Add a book </Link>
                        </div>
                    </div>
                )} />
                <Route path = "/search" render = {({ history }) =>
                    (
                        <SearchResult shelfedBooks={shelfedBooks}
                                      searchBooks={searchedBooks}
                                      updateSearchBooks={this.updateSearchedBooks}
                                        push = {history.push}
                                        getAllBooks = {this.getAllBooks}/>
                    )}
                />
            </div>
        )
    }
}

export default BooksApp
