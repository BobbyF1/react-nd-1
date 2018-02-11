import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf.js';
import BookSearch from './BookSearch.js';
import { Link } from 'react-router-dom';
import shelves  from './Shelves.js';

class BooksApp extends React.Component {
  
    state = {
		books : []
    };

	populateBooks(){
		BooksAPI.getAll().then( (returnedBooks) => {
			this.setState( {books: returnedBooks} );
		});
    };

	componentDidMount(){
		this.populateBooks();
	};

	changeShelf = (newShelf, book) => {
		BooksAPI.update(book, newShelf);

		//I'm going to directly update what we've got stored instead of blindly refreshing via the API each time, which would
      	//be slower and a waste of resources. (The books list belongs to me so no-one else will be editing it on the server.)
		if(newShelf==="none"){
			//If they have set the Shelf to "none" on a book, I'm going to delete it from our state list. 
			this.setState(function(prevState) {
				return { books: prevState.books.length > 0 ? prevState.books.filter((b) => b.id !== book.id)  : [] } } );
             }
		else
		{	
          	//So it's a book being put on a "real" shelf. It could already be on a different shelf of course, so I will 
          	//remove it from the state if it's there, then add it to the state. 
          	book.shelf = newShelf;
			this.setState(function(prevState) {
				return { books: prevState.books.length > 0 ? prevState.books.filter((b) => b.id !== book.id).concat(book)  : [book] }
             })
		};
   
    };

	render() {
      
		return (
			<div className="app">
				<Route path="/search" render={( { history } ) => (
					<BookSearch myBooks={this.state.books} changeShelf={(s,b) => this.changeShelf(s,b)}/>
				)}
			/>
	
			<Route exact path="/" render={()=> (
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
       	    		<div className="list-books-content">
						<div>
							{ shelves.map( (shelf) => 
	          					<BookShelf key={shelf.id} shelf={shelf} 
										books={this.state.books.filter( (b) => b.shelf===shelf.id)} 
										changeShelf={(s,b) => this.changeShelf(s,b)}
								/>							
							)}
            			</div>
					</div>
            		<div className="open-search">
	                    <Link to='/search' className='open-search'>Add a book</Link>
            		</div>
      			</div>
        		)}
			/>
		
         </div>
		)
	}
}

export default BooksApp;
