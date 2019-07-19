import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import useForm from '../hooks/useForms';

const ACCEPT_DELIVERY_SERVICE = gql`
    mutation acceptDelivery ($delivery: ID!){
        acceptDelivery(delivery: $delivery)
    }

`;


function AcceptDeliveryServiceBtn({ deliveryID }) {
	const [sendPost, { error }] = useMutation(ACCEPT_DELIVERY_SERVICE);
	const catchDelivery = async () => {
		const acceptDeliveryServiceMutation = await sendPost({ variables: { delivery: deliveryID } });
		console.log('acceptDeliveryServiceMutation: ', acceptDeliveryServiceMutation);
		if (error) {
			console.log(error);
		}
	};
	const { inputs, handleInputChange, handleSubmit } = useForm(catchDelivery);

	return (
		<section className="mt-4">
			<div className="row">
				<form onSubmit={handleSubmit}>
					<button className="btn btn-primary">
						Accept Rappi Favor
					</button>
				</form>
			</div>
		</section>
	);
}

export default AcceptDeliveryServiceBtn;
