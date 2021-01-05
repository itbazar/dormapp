import React from 'react'
import { withRouter, useLocation } from "react-router-dom";

const TopNavbar = () => {
    //get data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const location = useLocation();

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
            <div className="container-fluid">
                <div className="navbar-wrapper">
                    <div className="navbar-toggle">
                        <button type="button" className="navbar-toggler">
                            <span className="navbar-toggler-bar bar1"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <a className="navbar-brand" href="javascript:;">
                        <img width="50px" style={{marginLeft:'8px'}} src={user != null  ? user.thumbnail : null}/>
                        {user != null ? user.fullName : null}
    <span style={{marginRight:20}}>({location.pathname})</span>
                    </a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                    <span className="navbar-toggler-bar navbar-kebab"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navigation">
                    <form>
                        <div className="input-group no-border">
                            <input type="text" value="" className="form-control" placeholder="جستجو" />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <i className="nc-icon nc-zoom-split"></i>
                                </div>
                            </div>
                        </div>
                    </form>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link btn-magnify" href="javascript:;">
                                <i className="nc-icon nc-layout-11"></i>
                                <p>
                                    <span className="d-lg-none d-md-block">Stats</span>
                                </p>
                            </a>
                        </li>
                        <li className="nav-item btn-rotate dropdown">
                            <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="nc-icon nc-bell-55"></i>
                                <p>
                                    <span className="d-lg-none d-md-block">Some Actions</span>
                                </p>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link btn-rotate" title="خروج" onClick={() => logout()}>
                                <i className="nc-icon nc-lock-circle-open"></i>
                                <p>
                                    <span className="d-lg-none d-md-block">Account</span>
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default TopNavbar;
//export default withRouter(TopNavbar);

//withRouter => اگر کامپوننتی با کلاس ویت روتر اکسپورت شود حساس به تغییر آدرس می باشد
//یعنی با تغییر آدرس کامپوننت مجدد آپدیت می شود
