import React from 'react';
import './spinner.sass';
import { CircleSpinner } from "react-spinners-kit";

const Spinner = () => {
	return (
		<div className="spinner">
			<CircleSpinner color={'#000'} size={60} />
		</div>
	);
};

export default Spinner;