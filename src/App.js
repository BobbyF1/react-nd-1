import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelfChanger from './BookShelfChanger.js'
import BookShelf from './BookShelf.js'

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

	changeShelf = (newShelf, bookId) => {
        this.setState(function (state,props) {
          	{ return {books: (state.books.map (book => book.id===bookId ? 
      				{...book, shelf: newShelf} : book ))}}
    	  })
    }

  render() {
    
    console.log("APP render")
    console.log(this.state)
    
    return (
      <div className="app">
        {this.state.showSearchPage ? (
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
                <input type="text" placeholder="Search by title or author"/>
		    	  <BookShelfChanger />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
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
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
