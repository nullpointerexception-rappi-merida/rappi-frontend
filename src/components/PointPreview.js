import React from 'react';

function PointPreview({ point, customKey }) {
	return (
		<div className="row" key={customKey}>
			<div className="col-auto">
				<b>Referencia:</b>
			</div>
			<div className="col-auto">
				{point.reference}
			</div>
			<div className="col-auto">
				<b>Latitud:</b>
			</div>
			<div className="col-auto">
				{point.latitude}
			</div>
			<div className="col-auto">
				<b>Longitud:</b>
			</div>
			<div className="col-auto">
				{point.longitude}
			</div>
		</div>
	);
}

export default PointPreview;
