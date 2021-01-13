import React, { useState, useEffect } from 'react';
import { getAllReportTrafic } from 'services/dormService';

const TraficReportTypeCombo = ({
  changeItem,userTypeId
}) => {
  const [reportType, setTraficType] = useState([]);
  useEffect(() => {
    // const apiUrl = `${process.env.REACT_APP_API_URL_GIRLS}/${process.env.REACT_APP_API_URL_GIRLS_DORM_GETSETTRAFFIC}`;
    getReportType(userTypeId);
  }, []);

  const getReportType = async (userTypeId) => {
    const result = await getAllReportTrafic(userTypeId); // debugger;
    setTraficType(result);
    // if (result.status === "Success") setTraficType(result.data); else setTraficType(''); //  fetch(apiUrl)
  };

  return <select className="form-control" onChange={event => changeItem(event.target.value)}>
   
    {reportType.map(report => <option key={report.Id} value={report.Id}>{report.Title}</option>)}
  </select>;
};

export { TraficReportTypeCombo };