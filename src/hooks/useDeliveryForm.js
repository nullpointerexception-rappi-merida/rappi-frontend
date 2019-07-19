import { useState } from 'react';

function useForm(callback) {

	const [inputs, setInputs] = useState({
		origin: {
			latitude: '',
			longitude: '',
			reference: ''
		},
		destinations: [
			{
				latitude: '',
				longitude: '',
				reference: ''
			},
			{
				latitude: '',
				longitude: '',
				reference: ''
			}
		],
		observations: '',
		roundTrip: false
	});

	const handleSubmit = (event) => {
		if (event) {
			event.preventDefault();
		}
		callback(inputs);
	};

	const handleInputChange = (event) => {
		event.persist();
		event.preventDefault();
		const { name, value } = event.target;
		if (name === 'origin.reference') {
			setInputs(fields => ({ ...fields, origin: { reference: value } }));
		} else if (name === 'origin.latitude') {
			setInputs(fields => ({ ...fields, origin: { latitude: value } }));
		} else if (name === 'origin.longitude') {
			setInputs(fields => ({ ...fields, origin: { longitude: value } }));
		} else if (name === 'destinations[0].reference') {
			setInputs(fields => {
					const destination = {
						...fields.destinations[0]
					};
					destination.reference = value;
					return ({
						...fields,
						destinations: [
							destination, fields.destinations[1]
						]
					});
				}
			);
		} else if (name === 'destinations[0].latitude') {
			setInputs(fields => {
				const destination = {
					...fields.destinations[0]
				};
				destination.latitude = value;
				return ({
					...fields,
					destinations: [
						destination, fields.destinations[1]
					]
				});
			});
		} else if (name === 'destinations[0].longitude') {
			setInputs(fields => {
				const destination = {
					...fields.destinations[0]
				};
				destination.longitude = value;
				return ({
					...fields,
					destinations: [
						destination, fields.destinations[1]
					]
				});
			});
		} else if (name === 'destinations[1].reference') {
			setInputs(fields => {
				const destination = {
					...fields.destinations[1]
				};
				destination.reference = value;
				return ({
					...fields,
					destinations: [
						fields.destinations[0], destination
					]
				});
			});
		} else if (name === 'destinations[1].latitude') {
			setInputs(fields => {
				const destination = {
					...fields.destinations[1]
				};
				destination.latitude = value;
				return ({
					...fields,
					destinations: [
						fields.destinations[0], destination
					]
				});
			});
		} else if (name === 'destinations[1].longitude') {
			setInputs(fields => {
				const destination = {
					...fields.destinations[1]
				};
				destination.longitude = value;
				return ({
					...fields,
					destinations: [
						fields.destinations[0], destination
					]
				});
			});
		} else {
			setInputs(fields => ({ ...fields, [name]: value }));
		}
	};

	return {
		inputs,
		handleSubmit,
		handleInputChange
	};
}

export default useForm;
