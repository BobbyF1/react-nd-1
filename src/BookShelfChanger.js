import React from 'react';
import shelves from './Shelves.js';
import PropTypes from 'prop-types';

const BookShelfChanger = (props) => (
	<div className="book-shelf-changer">
		<select defaultValue={props.shelfId} onChange={ (event) => props.onChangeShelf(event.target.value)}>
			<option value="none" disabled>Move to...</option>
				{ shelves.map( (shelf ) => 
                 	<option key={shelf.id} value={shelf.id}>{shelf.title}</option> 
				)}
			<option value="none">None</option>
		</select>
	</div>      
);

BookShelfChanger.propTypes={
	shelfId: PropTypes.string.isRequired,
	onChangeShelf: PropTypes.func.isRequired
};

export default BookShelfChanger;
  