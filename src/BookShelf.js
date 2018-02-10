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

	state = {
        books : []
  	};

    shelf : { 
		id: "", 
		title: ""
    };

	constructor(props){
		super(props)
		this.shelf = props.shelf 
	}

	componentWillReceiveProps = (props) => {
		this.setState({books: props.books});
    }

	changeShelf = (newShelf, book) => {
		if(newShelf!==this.shelf.id){
			this.props.changeShelf(newShelf, book);
		}
    }

    render(){
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.shelf.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.state.books.map( (book) => (
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
