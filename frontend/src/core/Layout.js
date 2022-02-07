import Menu from "./Menu"
import "../styles.css"
import React from "react";
import ScrollToTop from "react-scroll-to-top";
import classes from './Layout.module.css';
const Layout = ({ title = 'Title', description = 'description', className1, children }) => {
    return (
        <React.Fragment>
            <div><Menu></Menu></div>

            <div className={` ${classes.myclass} container-fluid p-1 text-center`}>
                <h2 >{title}</h2>
                <p className="Lead">{description}...</p>
            </div>
            <div className="mt-3">
                <div className={className1} style={{ margin: '50px' }}>{children}</div></div>
            <ScrollToTop smooth />
            <footer className="footer bg-light mt-auto py-3">
                <div className="container">
                    <span className="text-muted">© 1996-2022, HairNCare.com, Inc. or its affiliates</span></div></footer>

        </React.Fragment>

    )
}

export default Layout;
