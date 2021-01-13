import React, { useState, useEffect } from 'react';
import { getAllTraficType } from 'services/dormService';

export const UserTrafficTypeCombo = ({
  changeItem
}) => {
  const [traficType, setTraficType] = useState([]);
  useEffect(() => {
    // const apiUrl = `${process.env.REACT_APP_API_URL_GIRLS}/${process.env.REACT_APP_API_URL_GIRLS_DORM_GETSETTRAFFIC}`;
    getUsers();
  }, []);

  const getUsers = async () => {
    // const apiUrl = "https://jsonplaceholder.typicode.com/users";
    let user = JSON.parse(localStorage.getItem('user'));
    // debugger;
    const result = await getAllTraficType(user.IdNumber); // debugger;

    if (result.status === "Success") setTraficType(result.data);else setTraficType(''); //  fetch(apiUrl)
  };

  return <select className="form-control" onChange={event => changeItem(event.target.value)}>
                            {traficType && traficType.map(Event => <option key={Event.EventId} value={Event.EventId}>{Event.EventTitle}</option>)}
                      </select>;
};

export default UserTrafficTypeCombo ;