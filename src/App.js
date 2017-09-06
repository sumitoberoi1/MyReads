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
    changeShelf = (book,shelf,isSearch) => {
        BooksAPI.update(book, shelf).then(() => {
            {
                isSearch ? this.setState((state)=>({
                        searchedBooks:state.searchedBooks.map((aBook) => {
                            if (aBook.id === book.id) {
                              aBook.shelf = shelf
                              state.shelfedBooks.push(aBook)
                            }
                            return aBook
                        })
                    }))
                 : this.setState((state)=>({
                    shelfedBooks: state.shelfedBooks.map((aBook) => {
                        (aBook.id === book.id) && (aBook.shelf = shelf)
                        return aBook
                    })
                }))

            }
        })

    }


    getAllBooks = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({
                shelfedBooks: books
            })
        })
    }

    updateSearchedBooks = (searchedBooks,query) => {
        if (query) {
            if (searchedBooks.length > 0) {

                this.setState({searchedBooks})
            }
        } else {
            this.setState({searchedBooks: []})
        }

    }

    getBooksAccordingToCategory = (books, category) => {
        return books.filter(book => book.shelf === category);
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
                <Route path = "/search" render = {() =>
                    (
                        <SearchResult shelfedBooks={shelfedBooks}
                                      searchBooks={searchedBooks}
                                      updateSearchBooks={this.updateSearchedBooks}
                                      changeShelf = {this.changeShelf}/>
                    )}
                />
            </div>
        )
    }
}

export default BooksApp
