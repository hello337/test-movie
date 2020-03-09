import React, { Fragment } from 'react';
import './error-indicator.sass';

const ErrorIndicator = () => {
	return (
		<Fragment>
			<h1>Error!</h1>
			<div className="error-icons">
				<i className="fas fa-bomb"></i>
				<h2>Something has gone wrong!</h2>
				<i className="fas fa-bomb"></i>
			</div>
		</Fragment>
	);
};

export default ErrorIndicator;