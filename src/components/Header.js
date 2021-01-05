import React from 'react'
import { withRouter, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();
    return (
        <div>
           Adderss : {location.pathname}
        </div>
    )
}

export default Header;
