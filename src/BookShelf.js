import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger.js'

class BookShelf extends Component {
  
  	state = {
      books : []
  	}

    shelf : { id: "", title: ""}

  constructor(props)
  {
    super(props)
    this.shelf = props.shelf 
  }

	componentWillReceiveProps(props){
      this.setState({books: props.books})
    }

	changeShelf(newShelf, book){
      if(newShelf!==this.shelf.id){
        	this.props.changeShelf(newShelf, book)
    	}
    }

  render(){

    return (
      	<div className="bookshelf">
      		<h2 className="bookshelf-title">{this.shelf.title}</h2>
      		<div className="bookshelf-books">
      			<ol className="books-grid">
      				{this.state.books.filter( (book) => ( book.shelf===this.shelf.id) ).map( (book) => (
      					<li key={book.id}>
      						<div className="book">
      							<div className="book-top">
      								<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.image }}></div>
      								<BookShelfChanger shelfId={this.shelf.id} bookId={book.id} onChangeShelf={(event) => this.changeShelf(event, book)} />
      							</div>
      							<div className="book-title">{book.title}</div>
      							<div className="book-authors">{book.authors.join(', ')}</div>
                           	</div>
                       	</li>
       				))}
  				</ol>
			</div>
		</div>
      )
  }
  
}

export default BookShelf


