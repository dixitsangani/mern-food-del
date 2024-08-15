import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

export default function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className="footer-contend">
                <div className="footer-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam eaque ducimus quidem nulla adipisci ea consectetur accusantium, aspernatur sunt autem dolorem optio quaerat officia facere cupiditate nihil quam! In, unde.</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-center">
                    <h2>COMPANY</h2>

                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privecy Policy</li>
                    </ul>

                </div>
                <div className="footer-right">

                    <h2>GET IN TOUCH</h2>

                    <ul>
                        <li>+1-212-456-7890</li>
                        <li>contact@tometo.com</li>
                    </ul>

                </div>
            </div>
            <hr />
            <p className="food-copyright">Copyright 2024 @ Tometo  - All Right Reserved. </p>

        </div>
    )
}
