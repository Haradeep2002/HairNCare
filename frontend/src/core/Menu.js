import React from "react";
import { Link,withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import { itemTotal } from "./cartHelper";

const isActive = (history,path) =>{
    if(history.location.pathname === path ){
        return {color:'#ff9900'}
    }
    else{
        return{color:'#ffffff'}
    }
}

const Menu = (props) => {
    return(<div>
        <ul className="nav nav-tabs bg-primary justify-content-start" style={{float:'left', width:'50%',margin:0,padding:0}}>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(props.history,'/')} to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(props.history,'/shop')} to="/shop">Shop</Link>
            </li>
            {isAuthenticated() &&
            <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, "/cart")} to="/cart">Cart <sup><small className='cart-badge'> {itemTotal()}</small></sup></Link>
            </li> 
            }
            {!isAuthenticated() &&
            <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, "/cart")} to="/signin">Cart <sup><small className='cart-badge'> {itemTotal()}</small></sup></Link>
            </li> 
            }
            {isAuthenticated() && isAuthenticated().user.role === 0 &&
                    (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(props.history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                        </li>
                    )
                }
                {isAuthenticated() && isAuthenticated().user.role === 1 &&
                    (
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(props.history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
                        </li>
                    )
                }
                </ul>
                <ul className="nav nav-tabs bg-primary justify-content-end mt-0" style={{float:'right', width:'50%',margin:'0',padding:'0'}}>
            {!isAuthenticated() && 
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,'/signin')} to="/signin">Signin</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history,'/signup')} to="/signup">Signup</Link>
                </li>
            </React.Fragment>
            }
            {isAuthenticated() && 
            <li className="nav-item" >
                <span className="nav-link" style={{cursor:'pointer',color:'#ffffff'}} onClick={
                    ()=>
                        signout(() => {
                            props.history.push("/")
                        })
                    }>Signout</span>
            </li>
            }
        </ul>
        </div>
    )
}
  
export default withRouter(Menu);
  