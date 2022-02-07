import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup,authenticate } from '../auth';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });
    const [retype,setRetype] = useState('')

    const { name,email,password, loading, error, redirectToReferrer } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handlePassword = name => event => {
        if(password === event.target.value){
            setValues({ ...values, error: false});
            setRetype(event.target.value)
        }
        else{
            setValues({ ...values, error: 'Passwords dont match'});
            setRetype(event.target.value)
        }
    };

    const clickSubmit = event => {
        event.preventDefault();
        if(!error){
            setValues({ ...values, error: false, loading: true });
            signup({ name, email, password }).then(data => {
                //console.log(data)
                if (data.error) {
                    //console.log(data.error)
                    if (typeof data.error.message !== 'undefined')
                    setValues({ ...values, error: data.error.message, loading: false }) 
                    else 
                    setValues({ ...values, error: 'Validation failed', success: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true,

                        });
                    })
                }
            });
        }
        
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>

            <div className="form-group">
                <label className="text-muted">Retype Password</label>
                <input onChange={handlePassword()} type="password" className="form-control" value={retype} />
            </div>

            <button onClick={clickSubmit} className="btn btn-dark mt-2">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && <div className="alert alert-info" >
            Loading...
        </div>
    );
    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />
        }
    }
    return (
        <Layout
            title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signup;