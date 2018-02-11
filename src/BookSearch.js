import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book.js';

class BookSearch extends Component{

	static propTypes={
		myBooks: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired
	};

    constructor(props) {
		super(props);
		this.state = {
			books : []
        };
    };
    
	maxResults = 10;

	changeShelf= (newShelf, book)=>{
		if(newShelf!==book.shelf){
			this.props.changeShelf(newShelf, book);
		};
	};


	handleChange(event) {
		if(event.target.value.trim()===""){
			this.setState({books: [] });
		}
		else
		{      
          BooksAPI.search(event.target.value, this.maxResults).then( (foundBooks) => 
              { 
                  foundBooks.error ? this.setState({books: [] }) : this.setState({books: foundBooks.map( (book) => 
						{	
                    		const myMatch = this.props.myBooks.filter( (my) => my.id===book.id);
                           			book.shelf = myMatch.length > 0 ? myMatch[0].shelf : "none";
                           	return book;
                    	}
				    )});
              }
          );
		};
	};
  
	render(){
		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link to="/" className="close-search" >Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" value={this.state.queryValue} onChange={(e) => this.handleChange(e)} />
					</div>
				</div>
				<div className="search-books-results">
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


export default BookSearch;

