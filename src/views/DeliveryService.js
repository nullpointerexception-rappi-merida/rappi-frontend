import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import payload from '../utils/payload';

import Navbar from '../components/Navbar2';
import PointPreview from '../components/PointPreview';
import AcceptDeliveryServiceBtn from '../components/AcceptDeliveryServiceBtn';
import Sidebar from '../components/Sidebar';

const GET_DELIVERY_SERVICE_BY_ID = gql`
    query getDeliveryService($id: ID!)  {
        getDeliveryService(id: $id) {
            delivery {
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
            customer {
                _id
                email
            }
            dealer {
                _id
                email
            }
        }
    }
`;

function DeliveryService({ match }) {
	const { id } = match.params;
	const { data, loading, error } = useQuery(GET_DELIVERY_SERVICE_BY_ID, { variables: { id } });
	const isCustomer = payload().user.type === 'CUSTOMER';
	if (error) {
		return <h4>Something went wrong</h4>;
	}
	if (loading) {
		return <h4>Loading...</h4>;
	}
	const { getDeliveryService } = data;
	return (
		<>
			<Navbar/>
			<Sidebar isCustomer={isCustomer}/>
			<div id="wrapper">
				<div id="content-wrapper">
					<div className="container">
						<div className="row">
						<main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
					{/*Origin*/}
					<section>
						<div className="row">
							<h4>Origen</h4>
						</div>
						<PointPreview point={getDeliveryService.delivery.origin}
									customKey="9438787"/>
					</section>

					{/*Destinations*/}
					<section className="mt-4">
						<div className="row">
							<h4>Destinos</h4>
						</div>
						{
							getDeliveryService.delivery.destinations.map((info, i) => (
								<PointPreview point={info}
											customKey={i}/>
							))
						}
					</section>

					{/*Dealer:*/}
					{
						isCustomer ?  
						
						getDeliveryService.dealer !== null ? (
								<>
									<div className="row mt-4">
										<h4>El repartidor asignado es: </h4>
									</div>
									<div className="row">
										<div className="col">
											{getDeliveryService.dealer.email}
										</div>
									</div>
								</>
							) : <></>
						
						: <AcceptDeliveryServiceBtn
						deliveryID={getDeliveryService.delivery._id}/>
					}
					<section>

					</section>

				</main>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DeliveryService;
