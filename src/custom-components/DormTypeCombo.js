import React, { useState, useEffect } from 'react';
import { getDormList } from 'services/dormService';


const dormApiList = [

  {
    id: 1,
    url: "https://tgs.ui.ac.ir/api",
    title: "خوابگاه خواهران",
  },
  {
    id: 2,
    url: "https://tbs.ui.ac.ir/api",
    title: "خوابگاه برادران",
  }
]

const DormTypeCombo = ({
  changeItem,selected, className
}) => {

  // useEffect(() => {
   
  // }, [selected])

  return <select className="form-control"  onChange={event => changeItem(event.target.value)} value={selected} >
    { dormApiList && dormApiList.map(Dorm => <option key={Dorm.id} value={Dorm.url}>{Dorm.title}</option>)}
    {/* <option key="1" value="GIRLS">خوابگاه خواهران</option>
    <option key="2" value="BOYS">خوابگاه برادران</option> */}
  </select>;
};

export default DormTypeCombo;