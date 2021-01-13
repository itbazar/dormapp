import axios from 'axios';
const BaseApiUrl = `${process.env.REACT_APP_API_URL_GIRLS}`;

// export const insert = data => {
//   axios.post(BaseApiUrl, data).then(result => {
//     return result.data;
//   }).catch(error => {
//     return error;
//   });
// };
export const getbaseUrl=()=>{

  const curentBaseUrl = JSON.parse(localStorage.getItem('dorm-api'));
  if(curentBaseUrl)
  return curentBaseUrl;
  else
  alert("لطفا خوابگاه مورد نظر را انتخاب نمایید")

}

export const loginUser = async (values) => {
  // const loginUrl = `${process.env.REACT_APP_API_URL_GIRLS}/${process.env.REACT_APP_API_URL_LOGIN}`;
  const loginUrl = `${getbaseUrl()}/${process.env.REACT_APP_API_URL_LOGIN}`;
  const user = {
    username: values.username,
    password: values.password
  };
  const res = await axios.get(loginUrl, {
    params: user
  }).then(response => {
    // debugger;
    if (response.data.data[0].IdNumber === values.username) {
      return response.data.data[0];
    } else {
      alert(response.data.data[0].message);
      return undefined;
    }
  }).catch(error => {
    alert('خطا در برقراری ارتباط باسرور');
    // alert(JSON.stringify(error));
    return undefined;
  })
  return res;
};


export const insertTrafic = async (newTrafic) => {
  const insertUrl = `${getbaseUrl()}/${process.env.REACT_APP_API_URL_DORM_GETSETTRAFFIC}`;
  const response = await axios.get(insertUrl, {
    params: {
      idnumber: newTrafic.idnumber,
      traffictype:newTrafic.trafficType
    }
  }); // response.data = sampleDat
  // debugger;
  return response.data;
};

export const getDormList = async () => {
  const dormListApiUrl = `${getbaseUrl()}/Dorm_GetListDorm`;
  return await axios.get(dormListApiUrl).then(result => {
    return result.data;
  }).catch(error => {
    alert('خطا در برقراری ارتباط باسرور');
    // alert(JSON.stringify(error));
    return undefined;
  })
};

export const getUserTrafic = async (filter) => {
  const report = `${getbaseUrl()}/Dorm_ReportTraffic`; 
  const response = await axios.get( report, {
    params: filter
  }).catch(error => {
    alert('خطا در برقراری ارتباط باسرور');
    // alert(JSON.stringify(error));
    return undefined;
  })// response.data = sampleData;

  return response.data;
};
export const getAllTraficType = async userIdNumber => {
  const traficUrl = `${getbaseUrl()}/${process.env.REACT_APP_API_URL_DORM_GETSETTRAFFIC}`;
  const response = await axios.get(traficUrl, {
    params: {
      idnumber: userIdNumber
    }
  }).catch(error => {
    alert('خطا در برقراری ارتباط باسرور');
    // alert(JSON.stringify(error));
    return undefined;
  })
  return response.data;
};

export const getAllReportTrafic = async (userTypeId) => {
  // @ReportType smallint = 1, -- حاضرین = 1 / غایبین = 2 / غایبین موجه = 3 / کل ورود خروج ها = 4
  // حاضرین - غایبین - غیبت های موجه - تمام ورود و خروج ها
  const adminTraficType = [
    {
      "Id": 1,
      "Title": "حاضرین"
    },
    {
      "Id": 2,
      "Title": "غایبین"
    },
    {
      "Id": 3,
      "Title": "غیبت های موجه"
    },
    {
      "Id": 4,
      "Title": "تمام ورود و خروج ها"
    }
  ]

  const userTraficType = [
    {
      "Id": 4,
      "Title": "تمام ورود و خروج ها"
    }
  ]
switch (userTypeId) {
  case 3:
    return userTraficType;;
    break;
  default:
    return adminTraficType;;
}
  
  // await  axios.get(BaseApiUrl).then(result => {
  //   return result.data;
  // }).catch(error => {
  //   return error;
  // });
};