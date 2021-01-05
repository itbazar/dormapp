import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/images/logo-nikamooz.png'

export const Sidebar = () => {
    return (
        <div className="sidebar" data-color="white" data-active-color="danger">
            <div className="logo">
                <NavLink className="simple-text logo-normal" to="/">
                    <img src={logo} width="64%" />
                </NavLink>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li>
                        <NavLink exact activeClassName="active" className="simple-text logo-normal" to="/">
                            <i className="nc-icon nc-bank"></i>
                        داشبورد
                    </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/user-posts">
                            <i className="nc-icon nc-tile-56"></i>
                   پست های کاربر
                    </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/categories">
                            <i className="nc-icon nc-tile-56"></i>
                        گروه بندی محصولات
                    </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/products">
                            <i className="nc-icon nc-tile-56"></i>
                        محصولات
                    </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/formdata">
                            <i className="nc-icon nc-diamond"></i>
                        نمونه فرم
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/react-hook-form">
                            <i className="nc-icon nc-diamond"></i>
                        نمونه فرم با React Hook
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/formik-sample">
                            <i className="nc-icon nc-diamond"></i>
                       Formik
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/form-with-ref">
                            <i className="nc-icon nc-diamond"></i>
                       Form With Ref
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/fetch">
                            <i className="nc-icon nc-diamond"></i>
                            Fetch Sample
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/axios">
                            <i className="nc-icon nc-diamond"></i>
                            Axios Sample
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" className="simple-text logo-normal" to="/react-strap-modal">
                            <i className="nc-icon nc-diamond"></i>
                            ReactStrap Modal
                        </NavLink>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}
