import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../assets/css/paper-dashboard.css';
import '../../assets/css/demo.css';
import { PageNotFount } from '../../components/page-not-found/PageNotFount';
import SimpleNavbar from './SimpleNavbar';
import { TraficReport } from '../../crud/TraficReport';
import { AddTrafic } from 'crud/AddTrafic';
export const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        {/* <Sidebar /> */}
        <div className="main-panel">
          <SimpleNavbar />
          <div className="content">
            <Switch>
              <Route path='/report' component={TraficReport} />
              <Route path='/addtrafic' component={AddTrafic} />
              <Route path='/profile' component={TraficReport} />
              <Route path="*" component={TraficReport} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  )
}
