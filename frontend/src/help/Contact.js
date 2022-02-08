import React, { useState, useEffect } from 'react';

import Layout from '../core/Layout';

const Contact = (props) => {
    return (<div style={{ paddingRight: '100px' }}>
        <h1 style={{ backgroundColor: '#001233', color: '#EFE0CA', padding: '20px', marginLeft: '50px', width: '96%' }}>Contact Doctor</ h1>
        <div className='container' style={{ padding: '50px', border: '2px solid #001233', width: '100%', margin: '50px', backgroundColor: '#EFE0CA' }}>

            <h1 style={{ paddingLeft: '100px', color: '#EFE0CA', backgroundColor: '#001233', padding: '20px' }}>{props.title}</h1>
            <img style={{ padding: '40px', color: '#001233' }} height='490px' width='450px' src={props.photo}></img>
            <h4 style={{ padding: '40px', color: '#001233' }}  >{props.desc}</h4>
        </div>
    </div >
    )
}

export default Contact;
