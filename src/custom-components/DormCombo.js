import React, { useState, useEffect } from 'react';
import { getDormList } from 'services/dormService';

const DormCombo = ({
  changeItem,needReload,selectedDorm,setIsLoading,setNeedReload
}) => {
  const [dormList, setDormList] = useState([]);
  // const [isLoadData, setIsLoadData] =  useState(false);

  // const [dormType, setDormType] = useState(curDormType);

  useEffect(() => {
    // setIsLoadData(true)
    console.log("curDormType")
    console.log(needReload)
    setDormList([])
    getDorms();

  }, [needReload]);
  
  useEffect(() => {

    // setIsLoading(false)
    // setNeedReload(false)

  }, [dormList]);

  const getDorms = async () => {
    // const apiUrl = "https://jsonplaceholder.typicode.com/users";
    // let user = JSON.parse(localStorage.getItem('user'));
    const result = await getDormList(); // debugger;
    if (result.status === "Success") setDormList(result.data); else setDormList('');
    setIsLoading(false)
    setNeedReload(false)
     //  fetch(apiUrl)
  };

  return <select className="form-control" onChange={event => changeItem(event.target.value)}  disabled={needReload ? "disabled" : ""} >
    
    <option key={0} value={0}>همه</option>
                            {dormList && dormList.map(Dorm => <option key={Dorm.Id} value={Dorm.Id}>{Dorm.Title}</option>)}
                      </select>;
};

export default DormCombo  ;