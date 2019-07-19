import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

import useForm from '../hooks/useDeliveryForm';
import Input from '../components/Input';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import isAuthenticated from '../utils/IsAuthenticated';

const CREATE_DELIVERY_SERVICE = gql`
    mutation createDeliveryService($data: createDeliveryServiceInput!) {
        createDeliveryService(data: $data) {
            _id
            origin {
                _id
                latitude
                longitude
                reference
            }
            destinations {
                _id
                latitude
                longitude
                reference
            }
            observations
            roundTrip
        }
    }
`;

function Create({ history }) {
	const [sendPost, { error }] = useMutation(CREATE_DELIVERY_SERVICE);

	const catchDelivery = async (fields) => {
		const customFields = {
			origin: {
				latitude: '20.947086',
				longitude: '-89.5949307,15z',
				reference: 'Acuaparque'
			},
			destinations: [
				{
					latitude: '20.9541398',
					longitude: '-89.6317521,15z',
					reference: 'Parque de La Ermita de Santa Isabel'
				},
				{
					latitude: '20.9649602',
					longitude: '-89.6362153,15z',
					reference: 'Parque Zoológico del Centenario'
				}
			],
			observations: 'From the web!',
			roundTrip: false
		};
		const createDeliveryServiceMutation = await sendPost({ variables: { data: { ...customFields } } });
		if (createDeliveryServiceMutation) {
			history.push(`/delivery/${createDeliveryServiceMutation.data.createDeliveryService._id}`);
		}
		if (error) {
			console.log(error);
		}
	};

	const { inputs, handleInputChange, handleSubmit } = useForm(catchDelivery);

	return (
		<>
			<Navbar/>
			<Header/>
			<main className="container mt-4">
				<section className="row">
					<div className="col-lg-8 col-md-10 mx-auto">
						<form onSubmit={handleSubmit}>
							<h3>Origin</h3>
							<div className="form-group">

								<Input name="origin.reference"
								       label="Reference"
								       type="text"
								       placeholder="Reference"
								       value={inputs.origin.reference}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>


								<Input name="origin.latitude"
								       label="Latitude"
								       type="text"
								       placeholder="Latitude"
								       value={inputs.origin.latitude}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>

								<Input name="origin.longitude"
								       label="Longitude"
								       type="text"
								       placeholder="Longitude"
								       value={inputs.origin.longitude}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>
							</div>

							<h3>First destination</h3>


							<div className="form-group">
								<Input name="destinations[0].reference"
								       label="Reference"
								       type="text"
								       placeholder="Reference"
								       value={inputs.destinations[0].reference}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>


								<Input name="destinations[0].latitude"
								       label="Latitude"
								       type="text"
								       placeholder="Latitude"
								       value={inputs.destinations[0].latitude}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>

								<Input name="destinations[0].longitude"
								       label="Longitude"
								       type="text"
								       placeholder="Longitude"
								       value={inputs.destinations[0].longitude}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>
							</div>

							<h3>Second destination</h3>

							<div className="form-group">
								<Input name="destinations[1].reference"
								       label="Reference"
								       type="text"
								       placeholder="Reference"
								       value={inputs.destinations[1].reference}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>


								<Input name="destinations[1].latitude"
								       label="Latitude"
								       type="text"
								       placeholder="Latitude"
								       value={inputs.destinations[1].latitude}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>

								<Input name="destinations[1].longitude"
								       label="Longitude"
								       type="text"
								       placeholder="Longitude"
								       value={inputs.destinations[1].longitude}
								       onChange={handleInputChange}
								       className="form-control"
								       isRequired={true}/>
							</div>

							<div className="control-group">
								<div className="form-group controls">
								       <textarea name="observations"
								                 id="observations"
								                 onChange={handleInputChange}
								                 value={inputs.observations}
								                 cols="60"
								                 rows="10">
								       </textarea>
								</div>
							</div>


							<button className="btn btn-primary mt-4">
								Save
							</button>

						</form>
					</div>
				</section>

			</main>
		</>
	);

}


export default isAuthenticated(Create);
