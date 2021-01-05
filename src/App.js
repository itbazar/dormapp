import './App.css';
import logo from './assets/images/logo-nikamooz.png';
import { Switch, Route } from 'react-router-dom';
import { AdminLayout } from './layouts/admin-layout/AdminLayout';
import { Login } from './components/auth/Login';
import PrivateRoute from './utils/PrivateRoute';
import Header from './components/Header';

function App() {

  return (
    <>
    <Header />
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" component={AdminLayout} />
      </Switch>
    </>
  )
}

export default App;
