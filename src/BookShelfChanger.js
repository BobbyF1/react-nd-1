import React, {Component} from 'react'

const BookShelfChanger = (props) => (
          <div className="book-shelf-changer">
            <select defaultValue={props.shelfId} >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>      
		)

export default BookShelfChanger
  