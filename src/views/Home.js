import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const MY_DELIVERYSERVICES = gql`
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

function Home() {

	const { data, loading, error } = useQuery(MY_DELIVERYSERVICES);
	if (error) {
		console.log('Error: ', error);
		return <h4>Internal Server Error</h4>;
	}
	if (loading) {
		return <h4>Loading...</h4>;
	} else {
		const { listMyDeliveryServices } = data;
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
								<div className="col-auto">
									<button type="button" className="btn btn-primary">Agregar Rappi Favor</button>
								</div>
							</section>
							<section className="row">
								<div className="table-responsive">
									<table className="table table-striped">
										<thead>
										<tr>
											<th scope="col">Origen</th>
											<th scope="col">Destino</th>
											<th scope="col">Favor</th>
											<th scope="col">Repartidor</th>
											<th scope="col">Opciones</th>
										</tr>
										</thead>
										<tbody>
										{
											listMyDeliveryServices.map((info, i) => (
												<tr key={i}>
													<td>{info.delivery.origin.reference}</td>
													<td>{info.delivery.destinations[0].reference}</td>
													<td>{info.delivery.observations}</td>
													<td>{info.dealer ? info.dealer.email : 'Have not been assigned yet'}</td>
													<td>
														View
													</td>
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

}

export default Home;
