import React, {Component} from 'react'
import BookShelfChanger from './BookShelfChanger.js'
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

class BookShelf extends Component {

  static propTypes={
  	shelf: PropTypes.object.isRequired,
  	books: PropTypes.array.isRequired,
  	changeShelf: PropTypes.func.isRequired
	}

state = {
      books : []
  	}

    shelf : { id: "", title: ""}

  constructor(props)
  {
    super(props)
    this.shelf = props.shelf 
  }

	componentWillRemount(props){
      	console.log("component will remount")
    }

	componentWillReceiveProps(props){
      console.log("PROPS ----------------------------")
      console.log(props)
      this.setState({books: props.books})
    }

	changeShelf(newShelf, book){
      if(newShelf!==this.shelf.id){
        	this.props.changeShelf(newShelf, book)
    	}
    }

  render(){

    console.log("ShelfRender")
    console.log(this.state)
    
    return (
      	<div className="bookshelf">
      		<h2 className="bookshelf-title">{this.shelf.title}</h2>
      		<div className="bookshelf-books">
      			<ol className="books-grid">
      				{this.state.books.map( (book) => (
      					<li key={book.id}>
      						<div className="book">
      							<div className="book-top">
      								<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + book.imageLinks.smallThumbnail+'")'  }}></div>
      								<BookShelfChanger key={this.shelf.id} shelfId={this.shelf.id} bookId={book.id} onChangeShelf={(event) => this.changeShelf(event, book)} />
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


