import React, { useState } from 'react';
import Logo from '../../assets/images/CullinanLogo.png';
const logout = () => {
  localStorage.clear();
  window.location.reload();
}

const TopNav = props => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
      <a className="navbar-brand text-info font-weight-bolder" href="/report">
        <img src={Logo} alt="Logo" width="36" height="36" className="vertical-align-middle" />
        <span className="font-weight-bolder" style={{padding:"15%"}}>تردد خوابگاه دانشگاه اصفهان</span>
      </a>
      <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse nav-item active`} id="navbarsExample09">
        <a className="nav-link text-info navbar-brand" href="/report">گزارش تردد</a>
        <a className="nav-link text-info navbar-brand" href="/addtrafic">ثبت تردد</a>
        {/* <a className="nav-link text-info" href="/profile">پروفایل</a> */}
        <a className="nav-link text-info navbar-brand" onClick={() => logout()}>خروج</a>
        {/* <a href="/request-demo" className="btn btn-sm btn-info nav-link text-white" >منوی کاربری</a> */}
      </div>
    </nav>
  );
}

export default TopNav;