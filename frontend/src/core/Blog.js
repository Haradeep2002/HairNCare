import { useState } from "react";
import Layout from "./Layout";
import { createBlog } from "./apiCore";
import { isAuthenticated } from "../auth";

const Blog = () => {
    const [id,setId] = useState('')
    const {user,token} = isAuthenticated()
    const handleChange = event => {
        setId(event.target.value)
    };

    const clickSubmit = event => {
        event.preventDefault();
        console.log(user._id,token,id)
        createBlog(user._id,token,id).then(data => {
            // if(data.error)console.log(data.error)
            // else{
                console.log(data)
            // }/
        })
    };


    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Enter product Id</label>
                <input onChange={handleChange} type="text" className="form-control" value={id} />
            </div>

            <button onClick={clickSubmit} className="btn btn-primary mt-2">
                Submit
            </button>
        </form>
    );
    return(
        <Layout
        title="Signup"
        description="Signup to Node React E-commerce App"
        className="container col-md-8 offset-md-2"
    >
        {signUpForm()}
        {/* {redirectUser()} */}
    </Layout>
    )
}

export default Blog;