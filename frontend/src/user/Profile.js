import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';

const Profile = ({match}) => {
    const [values,setValues]= useState({
        name:'',
        password:'',
        error:false,
        success:false
    })
    const {token} = isAuthenticated()
    const {name,email,password,error,success} = values

    const init = (userId) => {
        // console.log(userId)
        read(userId,token).then((data) => {
            if(data.error)setValues({...values,error:true})
            else setValues({...values,name:data.name})
        })
    }

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/cart" />;
        }
    };

    const profileUpdate = (name, password) => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} required className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} required className="form-control" value={password} />
            </div>

            <button className="btn btn-primary">
                Submit
            </button>
        </form>
    );
    
    useEffect(() =>{
        init(match.params.userId)
    },[])

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, password)}
            {redirectUser(success)}
            {/* {JSON.stringify(values)} */}
        </Layout>
    );
}
export default Profile;