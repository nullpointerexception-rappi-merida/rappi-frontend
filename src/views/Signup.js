import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import Input from '../components/Input';
import useForm from '../hooks/useForms';

const ADD_AUTHOR = gql `
    mutation CreateAuthor($data:createAuthorInput!){
        createAuthor(data:$data){
            _id,
            first_name
        }
    }
`
function Signup({history}){

    const [sendSingup, {error}] = useMutation(ADD_AUTHOR);

    const cathSubmit = async (fields) => {
        if(fields.password === fields.confirm_password){
            delete fields.confirm_password
            await sendSingup({variables: {data: { ...fields }}});
            error ? alert('Theres an error') : history.push('/login');
        }else{
            alert("Passwords doesnt match");
        }
    }

    const {inputs, handleInputChange, handleSubmit} = useForm(cathSubmit)
    return(
        <>
             <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={handleSubmit}>

                            <span className="login100-form-title p-b-45">
                                Rappi MID
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="First Name is Required">
                                <Input name="first_name"
                                    label="First Name"
                                    placeholder="First Name"
                                    type="text"
                                    className="input100"
                                    value={inputs.first_name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="focus-input100"></span>
                                <span className="label-input100">First Name</span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="First Name is Required">
                                <Input name="last_name"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    type="text"
                                    className="input100"
                                    value={inputs.last_name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Last Name</span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Enter valid email address">
                                <Input name="email"
                                        label="Email"
                                        placeholder="Email"
                                        type="email"
                                        className="input100"
                                        value={inputs.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Email</span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <Input name="password"
                                        label="Password"
                                        placeholder="Password"
                                        type="password"
                                        className="input100"
                                        value={inputs.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Password</span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <Input name="confirm_password"
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        type="password"
                                        className="input100"
                                        value={inputs.confirm_password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                <span className="focus-input100"></span>
                                <span className="label-input100">Confirm Password</span>
                            </div>

                            <div className="flex-sb-m w-full p-t-15 p-b-20">
                                <div>
                                    <Link to={'/login'} class="txt1">
                                        Already Registered?
                                    </Link>
                                </div>
                            </div>


                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn" type="submit">  
                                    Register
                                </button>
                            </div>

                        </form>

                        <div className="login100-more"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;



           
