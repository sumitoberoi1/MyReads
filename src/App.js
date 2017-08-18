import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import WelcomeHeader from './WelcomeHeader'
import SearchBar from './SearchBar'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
      books:[]
  }
  showSearchPage = () => {
      this.setState({ showSearchPage: false })
  }
  getBooksAccordingToCategory = (books,category) => {
      console.log(`Books ${books}`)
      for (var i in books) {
        console.log(`Book Shelf ${books[i].shelf}`)
      }
      let filteredBookArray = books.filter((book) => {
          return book.shelf == category
      })
      return filteredBookArray
  }
  componentDidMount() {
    BooksAPI.getAll().then((books)=>{
      console.log(books)
      this.setState({
          books:books
      })
    })
  }
  render() {
    let {books}= this.state
    return (

      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <SearchBar showSearchPage = {this.showSearchPage}/>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <WelcomeHeader/>
            <div className="list-books-content">
              <div>
                <BookShelf books={this.getBooksAccordingToCategory(books,'currentlyReading')} bookShelfTitle='Currently Reading'/>
                <BookShelf books={this.getBooksAccordingToCategory(books,'wantToRead')} bookShelfTitle = 'Want To Read'/>
                <BookShelf books={this.getBooksAccordingToCategory(books,'read')} bookShelfTitle = 'Read'/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
