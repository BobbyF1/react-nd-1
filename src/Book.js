import React, {Component} from 'react'
import PropTypes from 'prop-types';
import BookShelfChanger from './BookShelfChanger.js'

class Book extends Component{

	book : { };

	static propTypes = {
		book: PropTypes.object.isRequired,
		onChangeShelf: PropTypes.func.isRequired
    };

	//pass the call from the BookShelfChanger up to the parent component
  	changeShelf = (newShelf, book) => {
		this.props.onChangeShelf(newShelf, book);
    };

	//note: some books don't have an image and some don't have an author. Some have multiple authors...
    render(){
      	const {book} = this.props;
    	return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" 
						style={ 
      						book.imageLinks && book.imageLinks.smallThumbnail ?
      							{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` } 
      						:	{ width: 128, height: 193}}>
              		</div>
					<BookShelfChanger shelfId={book.shelf} bookId={book.id} onChangeShelf={(event) => this.changeShelf(event, book)} />
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors ? book.authors.join(" ") : ""}</div>
      	</div>
		);
	};
};


export default Book;
