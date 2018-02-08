import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelfChanger from './BookShelfChanger.js'
import { Link } from 'react-router-dom'

class BookSearch extends Component{

  constructor(props) {
    super(props);
    this.state = {
      books : []
	};
  }
    
  maxResults = 10


	changeShelf(newShelf, book){
      if(newShelf!==book.shelf){
        	this.props.changeShelf(newShelf, book)
    	}      
    }


    handleChange(event) {

      if(event.target.value.trim()===""){
      	this.setState({books: [] })
		}
		else
		{
      
          BooksAPI.search(event.target.value, this.maxResults).then( (foundBooks) => 
              { 
                  foundBooks.error ? this.setState({books: [] }) : this.setState({books: foundBooks.map( (book) => 
						{	
                    		const myMatch = this.props.myBooks.filter( (my) => my.id===book.id)
                           	book.shelf = myMatch.length > 0 ? myMatch[0].shelf : "none"
                           	return book
                    	}
				    )})
              }
          )
		}
	}
  
  
  	render(){
      
      return(
          <div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search" >Close</Link>
				<div className="search-books-input-wrapper">
                	<input type="text" placeholder="Search by title or author" value={this.state.value} onChange={(e) => this.handleChange(e)} />
              	</div>
            </div>
            <div className="search-books-results">
      			<ol className="books-grid">
      				{this.state.books.map( (book) => (
      					<li key={book.id}>
      						<div className="book">
      							<div className="book-top">
      								<div className="book-cover" 
											style={ 
                                              book.imageLinks && book.imageLinks.smallThumbnail ? { width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.smallThumbnail+'")'  } :	{ width: 128, height: 193}}>
									</div>
      								<BookShelfChanger shelfId={book.shelf} bookId={book.id} onChangeShelf={(event) => this.changeShelf(event, book)} />
      							</div>
      							<div className="book-title">{book.title}</div>
      							<div className="book-authors">{book.authors ? book.authors.join(" ") : ""}</div>
                           	</div>
                       	</li>
       				))}
  				</ol>
            </div>
          </div>
        )
	}
}

export default BookSearch

