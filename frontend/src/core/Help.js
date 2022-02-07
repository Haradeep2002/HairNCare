import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from './Layout';
import './Help.css'


const Help = (props) => {
    const handleh1 = () => {
        props.history.push(`/Hairfall`);
    }
    const handleh2 = () => {
        props.history.push(`/Baldness`);
    }
    const handleh3 = () => {
        props.history.push(`/Dandruff`);
    }
    const handleh4 = () => {
        props.history.push(`/Thin`);
    }
    const handleh5 = () => {
        props.history.push(`/Split`);
    }
    const handleh6 = () => {
        props.history.push(`/Growth`);
    }

    return (
        <div>
            <Layout title="Help" description="Ecommerce" className='container-fluid'>
                <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                    <div className='card1' onClick={handleh1}>
                        <img src="https://tdhqaconsumer.tatahealth.com/v3/prod/css/landingPage/images/hairderma1.jpg?v=3.59" height={'300px'} width={'400px'}></img>
                        <h2 style={{ padding: '20px', marginLeft: '20%' }}>Hair Fall</h2>
                    </div >
                    <div className='card1' onClick={handleh2}>
                        <img src="https://tdhqaconsumer.tatahealth.com/v3/prod/css/landingPage/images/hairderma2.jpg?v=3.59" height={'300px'} width={'400px'}></img>
                        <h2 style={{ padding: '20px', marginLeft: '20%' }}>Male pattern Baldness</h2>
                    </div>
                    <div className='card1' onClick={handleh3}>
                        <img src="https://tdhqaconsumer.tatahealth.com/v3/prod/css/landingPage/images/hairderma3.jpg?v=3.59" height={'300px'} width={'400px'}></img>
                        <h2 style={{ padding: '20px', marginLeft: '20%' }}>Dandruff</h2></div>
                    <div className='card1' onClick={handleh4}>
                        <img src="https://tdhqaconsumer.tatahealth.com/v3/prod/css/landingPage/images/hairderma4.jpg?v=3.59" height={'300px'} width={'400px'}></img>
                        <h2 style={{ padding: '20px', marginLeft: '20%' }}>Hair Thinning</h2></div>
                    <div className='card1' onClick={handleh5}>
                        <img src="https://tdhqaconsumer.tatahealth.com/v3/prod/css/landingPage/images/hairderma5.jpg?v=3.59" height={'300px'} width={'400px'}></img>
                        <h2 style={{ padding: '20px', marginLeft: '20%' }}>Split ends</h2></div>
                    <div className='card1' onClick={handleh6} >            <img src="https://tdhqaconsumer.tatahealth.com/v3/prod/css/landingPage/images/hairderma6.jpg?v=3.59" height={'300px'} width={'400px'}></img>
                        <h2 style={{ padding: '20px', marginLeft: '20%' }}>Hair Growth</h2></div></div >
            </Layout >
        </div>

    )
}

export default withRouter(Help);