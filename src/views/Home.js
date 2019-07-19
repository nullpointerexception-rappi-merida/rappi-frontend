import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Header from '../components/Header';
import payload from '../utils/payload';

const MY_DELIVERY_SERVICES = gql`
    query getMyDeliveryServices {
        listMyDeliveryServices {
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
                isActive
            }
            dealer {
                _id
                email
            }
        }
    }
`;

const MY_DELIVERY_SERVICES_AS_DEALER = gql`
    query listDeliveryServicesAsDealer{
        listDeliveryServicesAsDealer{
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
        }
    }
`;

function Home() {

	const isCustomer = payload().user.type === 'CUSTOMER';
	const MUTATION = isCustomer ? MY_DELIVERY_SERVICES : MY_DELIVERY_SERVICES_AS_DEALER;

	const { data, loading, error } = useQuery(MUTATION);
	if (error) {
		console.log('Error: ', error);
		return <h4>Internal Server Error</h4>;
	}
	if (loading) {
		return <h4>Loading...</h4>;
	}
	let deliveryServices = isCustomer ? data.listMyDeliveryServices : data.listDeliveryServicesAsDealer;
	return (
		<>

			<Navbar/>
			<div className="container-fluid">
				<div className="row">
					<Header/>
					<main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
						<section className="row">
							<div className="col">
								<h2>Rappi favores</h2>
							</div>
							{isCustomer ?
								<>
									<div className="col-auto">
										<Link to="/create" className="btn btn-primary">
											Agregar Rappi Favor
										</Link>
									</div>
								</> : ''
							}
						</section>
						<section className="row">
							<div className="table-responsive">
								<table className="table table-striped">
									<thead>
									<tr>
										<th scope="col">Origen</th>
										<th scope="col">Destino</th>
										<th scope="col">Favor</th>
										<th scope="col">{isCustomer ? 'Repartidor' : 'Cliente'}</th>
										<th scope="col">Opciones</th>
									</tr>
									</thead>
									<tbody>
									{
										deliveryServices.map((info, i) => (
											<tr key={i}>
												<td>{info.delivery.origin.reference}</td>
												<td>{info.delivery.destinations[0].reference}</td>
												<td>{info.delivery.observations}</td>
												{
													isCustomer ? <>
															<td>{info.dealer ? info.dealer.email : 'Has not been assigned yet'}</td>
															<td>
																<Link to={`/delivery/${info.delivery._id}`}>View</Link>
															</td>
														</> :
														<>
															<td>{info.customer.email}</td>
															<td>
																<Link to={`/delivery/${info.delivery._id}`}>View</Link>
															</td>
														</>
												}
											</tr>
										))
									}
									</tbody>

								</table>
							</div>
						</section>
					</main>

				</div>
			</div>
		</>
	);


}

export default Home;
