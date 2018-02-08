import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import BookShelf from './BookShelf.js'
import BookSearch from './BookSearch.js'
import { Link } from 'react-router-dom'

class BooksApp extends React.Component {

  constructor(props){
    super(props)
  }
  
  state = {
	books : [],
	showSearchPage: false
  }

	shelves = [
      {	id: "currentlyReading", title: "Currently Reading"},
      { id: "wantToRead", title: "Want to Read"},
      { id: "read", title: "Already Read"} 
    ]

	componentDidMount(){
		BooksAPI.getAll().then( (returnedBooks) => {
      		this.setState({books: 	
      				returnedBooks.map(b => Object.assign({}, b, { image: 'url("' + b.imageLinks.smallThumbnail+'")' }))
			})
		})
	}

	changeShelf = (newShelf, book) => {
      
      	console.log(newShelf)
      	console.log(book)
      
		BooksAPI.update(book, newShelf)
		
      	if(newShelf==="none"){
          //If they set the new Shelf to "none" I'm going to delete it from our list. This will make it simpler to 
          //add it again if they want to via the Search.
          
			this.setState(function(prevState) {
              return { books: prevState.length > 0 ? prevState.filter((b) => b.id !== book.id)  : [] } } )
         }
      else
      {
          this.setState(function (state,props) {
                  { return {books: (state.books.map (b => b.id===book.id ? 
                          {...b, shelf: newShelf} : b ))}}
                })
      }
    }

  render() {

    console.log("APP RENDER")
    console.log(this.state.books)
    
    
    return (
    	<div className="app">
     		<Route path="/search" render={( { history } ) => (
            	<BookSearch myBooks={this.state.books} changeShelf={this.changeShelf}/>
				)}
			/>
	
			<Route exact path="/" render={()=> (
             	<div className="list-books">
	            	<div className="list-books-title">
    	          		<h1>MyReads</h1>
        	    	</div>
       	    		<div className="list-books-content">
       					<div>
          					{ this.shelves.map( (shelf) => 
	          					<BookShelf key={shelf.id} shelf={shelf} books={this.state.books} changeShelf={this.changeShelf}/>
							)}
            			</div>
          			</div>
            		<div className="open-search">
	                    <Link to='/Search'  className='open-search'>Add a book</Link>
            		</div>
      			</div>
        	)}
			/>
		
         </div>
		)
	}
}

export default BooksApp
