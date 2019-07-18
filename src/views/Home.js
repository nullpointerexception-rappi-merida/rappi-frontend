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
`

function Home(){

    const {data, loading, error} =  useQuery(MY_DELIVERYSERVICES);
    if(error){
        return <h4>Internal Server Error</h4>
    }else{
        return(
            <>
            
                <Navbar/>
                <div className="container-fluid">
                  <div className="row">
                    <Header/>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        
                       
                        <h2>Rappi favores</h2>
                        <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                <th scope="col">Origen</th>
                                <th scope="col">Destino</th>
                                <th scope="col">Favor</th>
                                <th scope="col">Repartidor</th>
                                </tr>
                            </thead>
                        {
                                    loading ? <h4>Loading ...</h4> 
                                        : data.listMyDeliveryServices.map( list => (
                                          
                                                <tbody>
                                                    <tr>
                                                        <td>{list.delivery.origin.reference}</td>
                                                        <td>{list.delivery.destinations.reference}</td>
                                                        <td>{list.delivery.observations}</td>
                                                        <td>Some body</td>
                                                    </tr>
                                                </tbody>
                                                
                                    ))
                                }
                           </table>
                        </div>
                        </main>
                   
                    </div>
                </div>
            </>
        )
    }
  
}

export default Home;