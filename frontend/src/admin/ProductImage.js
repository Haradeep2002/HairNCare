import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { API } from '../config';
import Layout from "../core/Layout";
import { getCategories } from "./apiAdmin";
import './styles.css'

const ProductImage = () => {
    const [success,setsuccess]=useState(false)
    const [values, setValues] = useState({
        photo: '',
        formData: ''
    });
    const {
        formData
    } = values;
    const getProds = ( ) => {
        return fetch(`${API}/products`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values });
            } else {
                setValues({
                    ...values,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);
    
    const handleChange = name => event => {
        const value = event.target.files[0] 
        formData.set('photo', value);
        setValues({ ...values, 'photo': value });
    };

    const uploadPhoto = async (e) => {
        e.preventDefault()
        const { user,token } = isAuthenticated();
        const prodname=localStorage.getItem('product')
        let prod=null
        getProds().then((data) => {
            console.log(data)
            data.forEach(d => {
                if(d.name === prodname){
                    prod=d
                } 
            });
            console.log(prod)
            return fetch(`${API}/product/addPhoto/${prod._id}/${user._id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
                //need to send formdata
            })
            .then(response => {
                setsuccess(true)
            })
            .catch(err => {
                // localStorage.removeItem('product')
                    console.log(err);
                })
        }
        ).catch(err => {
            // localStorage.removeItem('product')
                console.log(err);
            })
    }
    return (
        <Layout title="Upload image of your product" description="Upload image">
        {!success && 
        <div className="container mx-auto mt-2 p-3 my-3" style={{color:'#EFE0CA',backgroundColor:'#001233'}}>
                <form className="mb-3" onSubmit={uploadPhoto}>
                    <div className="form-group">
                        <div className="container  p-3 my-3 " style={{color:'#EFE0CA',backgroundColor:'#001233'}}>
                        <input onChange={handleChange('photo')} required type="file" name="photo" accept="image/*" />
                        </div>
                        <div className="container p-3 my-3" style={{color:'#EFE0CA',backgroundColor:'#001233'}}>
                            <button className="btn btn-secondary">Add photo</button>
                        </div>
                    </div>
                </form >

        </div>
        }   
        {success && 
            <div className="container mx-auto mt-2 p-3 my-3">
                <h4 className="text-success">Product Added Successfully</h4>
                <br></br>
                <Link to="/admin/dashboard" style={{ border: '2px solid #000133', backgroundColor: '#EFE0CA', color: '#001233', textDecoration: 'none', padding: '10px' }}>
                    Back to Dashboard
                </Link>
            </div>
        
        }
        </Layout>
        
    )
}

export default ProductImage;

