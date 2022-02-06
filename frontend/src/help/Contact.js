import React, { useState, useEffect } from 'react';

import Layout from '../core/Layout';

const Contact = (props) => {
    return (<div className='container' style={{ padding: '50px', width: '35%', margin: '50px', backgroundColor: 'gray' }}>

        <h1 style={{ paddingLeft: '130px' }}>{props.title}</h1>
        <img height='490px' width='450px' src={props.photo}></img>
        <h4 >{props.desc}</h4>
    </div>
    )
}

export default Contact;
