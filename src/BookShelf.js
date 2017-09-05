import React from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'

const BookShelf = (props) => {
    const {books,bookShelfTitle,changeShelf} = props
    const handleShelfChange = (book,newShelf) => {
        changeShelf(book,newShelf,false)
    }
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{bookShelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book) => (
                        <li key={book.id} className='contact-list-item'>
                            <BookItem book={book} handleShelfChange={handleShelfChange}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}
BookShelf.PropTypes = {
    books:PropTypes.array.isRequired,
    bookShelfTitle:PropTypes.string.isRequired,
    changeShelf:PropTypes.func.isRequired
}

export default BookShelf