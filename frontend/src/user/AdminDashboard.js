import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { Link } from 'react-router-dom'
const AdminDashboard = () => {
  const { user: { name, email, role } } = isAuthenticated()
  const adminLinks = () => {
    return (
        <div className="card">
            <h4 className="card-header" style={{ backgroundColor: '#001233', color: '#EFE0CA', padding: '10px' }}>Admin Links</h4>
            <ul className="list-group">
                <li className="list-group-item"  style={{ backgroundColor: '#EFE0CA', color: '#001233' }}>
                    <Link style={{ backgroundColor: '#EFE0CA' }} className="nav-link" to="/create/category">Create Category</Link>
                </li>
                <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }} className="list-group-item">
                    <Link style={{ backgroundColor: '#EFE0CA' }} className="nav-link" to="/create/product">Create Product</Link>
                </li>
                <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }} className="list-group-item">
                    <Link style={{ backgroundColor: '#EFE0CA' }} className="nav-link" to="/admin/orders">View Orders</Link>
                </li>
                <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }} className="list-group-item">
                    <Link style={{ backgroundColor: '#EFE0CA' }} className="nav-link" to="/admin/products">Manage products</Link>
                </li>
            </ul>
        </div>
    )
  }

  const adminInfo = () => {
    return (<div className="card mb-5">
        <h3 style={{ backgroundColor: '#001233', color: '#EFE0CA' }}  className="card-header">User Information</h3>
        <ul className="list-group">
            <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }}  className="list-group-item">{name}</li>
            <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }}  className="list-group-item">{email}</li>
            <li style={{ backgroundColor: '#EFE0CA', color: '#001233' }}  className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
        </ul>
    </div>)
  }

    return(
      <Layout title="Dashboard" description={`Hello ${name}!`} className="container">
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )   
  }
  
  export default AdminDashboard;
  