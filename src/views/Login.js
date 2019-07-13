import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import useForm from '../hooks/useForms';

const LOGIN = gql`
    mutation LOGIN($email: String!, $password: String!){
        login(email: $email, password: $password){
            token
        }
    }
`;


function Login({history}){

    const [sendLogin] = useMutation(LOGIN);

    const submitLogin = async (fields) => {
        const mutation = await sendLogin({
            variables: {...fields}
        }).catch(e => console.log('Error: ',e));

        if(mutation){
            const { login } = mutation.data;
            localStorage.setItem('rappiToken', login.token);
            history.push('/')
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(submitLogin);

    return (
        <>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <form className="login100-form validate-form" onSubmit={handleSubmit}>
                            <span className="login100-form-title p-b-45">
                                Rappi MID
                            </span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                    <Input name="email"
                                        label="Email"
                                        placeholder="Email"
                                        value={inputs.email}
                                        onChange={handleInputChange}
                                        type="email"
                                        className="input100"
                                        required/>
                                <span class="focus-input100"></span>
                                <span class="label-input100">Email</span>
                            </div>


                            <div class="wrap-input100 validate-input" data-validate="Password is required">
                                <Input type="password" 
                                                name="password"
                                                label="Password"
                                                placeholder="Password"
                                                onChange={handleInputChange}
                                                value={inputs.password}
                                                className="input100"
                                                required/>
                                <span class="focus-input100"></span>
                                <span class="label-input100">Password</span>
                            </div>
                            

                            <div className="flex-sb-m w-full p-t-15 p-b-20">
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input className="form-check-input" type="checkbox" value=""/> Remember me
                                        <span className="form-check-sign">
                                            <span className="check"></span>
                                        </span>
                                    </label>
                                </div>

                                <div>
                                    <a href="#" className="txt1">
                                        Forgot Password?
                                    </a>
                                </div>
                            </div>


                            <div className="container-login100-form-btn">
                                <button className="login100-form-btn">
                                    Login
                                </button>
                            </div>

                            <div className="text-center p-t-45 p-b-20">
                                <span className="txt2">
                                    <Link to={'/signup'} class="txt1">
                                        Sign Up
                                    </Link>
                                </span>
                            </div>


                        </form>

                        <div className="login100-more"></div>
                    </div>
                </div>
            </div>

        </>
    );

}

export default Login;