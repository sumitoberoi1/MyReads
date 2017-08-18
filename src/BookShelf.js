import React from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'

const BookShelf = (props) => {
    const {books,bookShelfTitle} = props
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookShelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id} className='contact-list-item'>
                            <BookItem book={book}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
BookShelf.PropTypes = {
    books:PropTypes.array.isRequired,
    bookShelfTitle:PropTypes.string.isRequired
}

export default BookShelf