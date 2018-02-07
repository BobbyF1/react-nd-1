import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelfChanger from './BookShelfChanger.js'

class BookSearch extends Component{

  constructor(props) {
    super(props);
    this.state = {
      books : []
	};

  }
  
  maxResults = 10

    handleChange(event) {

      if(event.target.value.trim()===""){
      	this.setState({books: [] })
		}
		else
		{
      
          console.log("Searching for [" + event.target.value + "]")
          
          BooksAPI.search(event.target.value, this.maxResults).then( (foundBooks) => 
              { 
                  foundBooks.error ? this.setState({books: [] }) : this.setState({books: foundBooks })
              }
          )
		}
}
  
  
  	render(){
      
      return(
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
      								<BookShelfChanger shelfId="none" bookId={book.id} onChangeShelf={(event) => this.changeShelf(event, book)} />
      							</div>
      							<div className="book-title">{book.title}</div>
      							<div className="book-authors">{book.authors? book.authors.join(" ") : ""}</div>
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

