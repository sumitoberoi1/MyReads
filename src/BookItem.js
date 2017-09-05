import React from 'react'
import PropTypes from 'prop-types'

const BookItem = (props) => {
    const {book,handleShelfChange} = props
    const handleOnChange = (event) => {
        handleShelfChange(book, event.target.value)
    }
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select value={(book.shelf) ? book.shelf:"none"} onChange={handleOnChange}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{(book.authors) && (book.authors.join(','))}</div>
        </div>
    )
}
BookItem.PropTypes = {
    book:PropTypes.object.isRequired,
    handleShelfChange:PropTypes.func.isRequired
}

export default BookItem