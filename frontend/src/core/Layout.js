import Menu from "./Menu"
import "../styles.css"
const Layout = ({title='Title',description='description',className,children}) => {
    return(
        <div>
            <Menu></Menu>
            <div className="container-fluid p-3 my-3 bg-dark text-white">
                <h2>{title}</h2>
                <p className="Lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </div>

    )
  }
  
  export default Layout;
  