import React, {Component} from 'react'

class BookShelfChanger extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      shelf: this.props.shelf
    }
  }   
  
  render(){
    return(
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              <option selected={this.state.shelf === "currentlyReading" && "selected" } value="currentlyReading">Currently Reading</option>
              <option selected={this.state.shelf === "wantToRead" && "selected" } value="wantToRead">Want to Read</option>
              <option selected={this.state.shelf === "read" && "selected" } value="read">Read</option>
              <option selected={this.state.shelf === "none" && "selected" } value="none">None</option>
            </select>
          </div>      
		)
      }
  }
export default BookShelfChanger
  