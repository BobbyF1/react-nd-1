import React, {Component} from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import Book from './Book.js';

class BookShelf extends Component {

	static propTypes={
		shelf: PropTypes.object.isRequired,
		books: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired
	};

	//pass the call from the Book up to the parent component	
	changeShelf = (newShelf, book) => {
		if(newShelf!==this.props.shelf.id){
			this.props.changeShelf(newShelf, book);
		}
    }

    render(){
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.shelf.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.books.sort(sortBy('title')).map( (book) => (
      					<li key={book.id}>
							<Book book={book} onChangeShelf={this.changeShelf} />
						</li>
       					))}
					</ol>
				</div>
			</div>
		)
	}  
}

export default BookShelf;
