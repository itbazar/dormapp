import React, { useRef, useState, useEffect } from "react";
import { Loading } from "custom-components/Loading";
import Paging from "custom-components/Paging";
import { UserCombo } from "custom-components/UserTrafficTypeCombo";
import { TraficReportTypeCombo } from "custom-components/TraficReportTypeCombo";
import { getUserTrafic } from "services/dormService";
import { DatePickerField } from "components/DatePicker/DatePickerField";
import moment from "moment-jalaali";
import DormCombo from "custom-components/DormCombo";
import DormTypeCombo from "custom-components/DormTypeCombo";

export const TraficReport = () => {
  const pageItemCount = process.env.REACT_APP_PAGE_ITEM_COUNT;
  moment.locale("fa");
  moment.loadPersian();
  const jmoment = moment();
  const todayDate = jmoment.format("jYYYY-jMM-jDD");
  const curentUser = JSON.parse(localStorage.getItem("user"));
  const curentDormType = JSON.parse(localStorage.getItem("dorm-api"));
  // let day =  jmoment.jYear();
  // debugger;
  const [totalPage, setTotalPage] = useState(1);
  // const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState(curentUser);
  const [idNumber, setIdnumber] = useState(user.UserTypeId===3?user.IdNumber:0);
  const [dormId, setDormId] = useState(user.UserTypeId===3?user.Dorm:0);
  const [traficType, setTraficType] = useState(0);
  const [reportType, setReportType] = useState(4);
  const [dormType, setDormType] = useState(curentDormType);
  const [fromdate, setFromdate] = useState(todayDate);
  const [todate, setTodate] = useState(todayDate);
  // const [tblData, setTblData] = useState([]);
  const [currenttblData, setCurrenttblData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [changeIdNumber, setChangeIdNumber] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState(true);
  const [traficFilter, setTraficFilter] = useState();
  const isCompletedRef = useRef(false);
  const [needReload, setNeedReload] = useState(false);

  useEffect(() => {
    console.log("use1");
    setIsLoading(false);
    if (user.UserTypeId !== 3) setChangeIdNumber(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("dorm-api", JSON.stringify(dormType));
    // setIsLoading(true);
    setNeedReload(true);
  }, [dormType]);

  useEffect(async () => {
    // let dormidselected = dormId;
    //
    // if (idNumber !== "" ) {
    //   dormidselected = 0;
    //   // setIdnumber(0);
    // }

    let tempFilter = {
      fromDate: fromdate,
      toDate: todate,
      idnumber: idNumber,
      DormId: dormId,
      reportTyp: reportType,
      pageNumber: currentPage,
      pageSize: 10,
      orderby: "id",
      ordertype: "desc",
    };
    // debugger;
    console.log(
      "traficFilter changed --> " + updateData + JSON.stringify(tempFilter)
    );
    if (updateData) {
      setUpdateData(false);
      let res = await getUserTrafic(tempFilter);
      if (res && res.data) {
        const nowData = res.data;
        let totalCount = nowData[0] !== undefined ? nowData[0].TotalCount : 0;
        setTotalCount(totalCount ? totalCount : 0);
        setTotalPage(Math.ceil(totalCount / pageSize));
        setIsLoading(false);
        setCurrenttblData(() => {
          return nowData;
        });
        console.log(" getUserTrafic result" + JSON.stringify(nowData));
      } else {
        console.log("NO getUserTrafic result");
        setIsLoading(false);
      }
    } else {
      // debugger;
      // setIsLoading(false);
    }
  }, [
    currentPage,
    dormId,
    fromdate,
    idNumber,
    pageSize,
    reportType,
    todate,
    updateData,
  ]);

  const changePage = (i) => {
    // debugger;
    setIsLoading(true);
    setCurrentPage(i);
    setCurrenttblData(() => {
      return [];
    });
    setUpdateData(true);
    console.log("change: " + JSON.stringify(traficFilter));
    };
    
    const changeComboDorm = (dormId) => {
        // debugger;
        setDormId(dormId)
        setCurrentPage(1)
        setTotalPage(1)
        setCurrenttblData([])
      };

  const submitForm = async (event) => {
    event.preventDefault();
    // debugger;
    setIsLoading(true);
    setUpdateData(true);
    // updateFilter();
    console.log("change: " + JSON.stringify(traficFilter));
  };

  return (
    <div className="card">
      <div className="card-header">گزارش تردد </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            <form onSubmit={(event) => submitForm(event)}>
              <div className="form-group">
                <label>شماره دانشجویی : </label>
                {/* <input  type="text" name="idNumber" id="idNumber" className="form-control" /> */}
                <input
                  type="text"
                  name="idNumber"
                  id="idNumber"
                  className="form-control"
                  disabled={changeIdNumber}
                  value={idNumber}
                  onChange={(e) => {
                    setIdnumber(e.target.value ? +e.target.value : 0);
                  }}
                />
              </div>
              {/* <div className="form-group">
                                <label>شماره دانشجویی : </label>
                                <input type="text" name="idNumber" value={user.IdNumber} className="form-control" />
                            </div> */}
              {/* <div className="form-group">
                                <label>نوع تردد : </label>
                                <UserCombo changeItem={setTraficType} />
                            </div> */}

              <div className="form-group">
                <label>نوع گزارش : </label>
                <TraficReportTypeCombo
                  changeItem={setReportType}
                  userTypeId={user.UserTypeId}
                />
              </div>
              {user.UserTypeId !== 3 ? (
                <div className="form-group">
                  <label>نوع خوابگاه : </label>
                  <DormTypeCombo changeItem={setDormType} selected={dormType} />
                </div>
              ) : null}
              {/* display={user.UserTypeId === 3 ? 'none' : ''}  */}
              {user.UserTypeId !== 3 ? (
                <div className="form-group">
                  <label>خوابگاه : </label>
                  <DormCombo
                    setIsLoading={setIsLoading}
                    setNeedReload={setNeedReload}
                    changeItem={changeComboDorm}
                    needReload={needReload}
                    selectedDorm={dormId}
                  />
                </div>
              ) : null}

              <div className="form-group">
                <label>از تاریخ : </label>

                <DatePickerField
                  setFieldValue={setFromdate}
                  field={{
                    year: jmoment.jYear(),
                    month: jmoment.jMonth() + 1,
                    day: jmoment.jDate(),
                  }}
                />
              </div>
              <div className="form-group">
                <label>تا تاریخ : </label>
                <DatePickerField
                  setFieldValue={setTodate}
                  field={{
                    year: jmoment.jYear(),
                    month: jmoment.jMonth() + 1,
                    day: jmoment.jDate(),
                  }}
                />
              </div>
              {/* onClick={(event) => console.log("selected date:" + JSON.stringify(fromdate + todate))} */}
              {/* <button type="button" className="btn btn-primary" >تست</button> */}
              {isLoading ? <Loading /> : null}
              <button
                type="submit"
                disabled={isLoading ? "disabled" : ""}
                className="btn btn-primary btn-block"
              >
                نمایش
              </button>
              <label>تعداد کل رکوردها: {totalCount}</label>
            </form>
          </div>
          <div className="col">
            <div>
              <nav aria-label="...">
                <ul className="pagination table-responsive">
                  <Paging
                    pageCount={totalPage}
                    currentPage={currentPage}
                    changePage={changePage}
                  />
                  {/* {generatePagination(page, 1, changePage)} */}
                </ul>
              </nav>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-bordered ">
                <thead>
                  <tr>
                    <th> ردیف</th>
                    <th className="text-nowrap text-center"> نام</th>
                    <th className="text-nowrap text-center">شماره دانشجویی</th>
                    <th className="text-nowrap text-center">خوابگاه</th>
                    <th className="text-nowrap text-center"> اتاق</th>
                    <th className="text-nowrap text-center">موبایل </th>
                    <th className="text-nowrap text-center">تاریخ</th>
                    <th className="text-nowrap text-center">ساعت </th>
                    <th className="text-nowrap text-center">تردد </th>
                    <th className="text-nowrap text-center">دستگاه </th>
                    <th className="text-nowrap ext-center">تعداد روز</th>
                    <th className="text-nowrap text-center">کاربر </th>
                    <th className="text-nowrap text-center">توضیحات</th>
                  </tr>
                </thead>
                <tbody>
                  {currenttblData &&
                    currenttblData.map((item, index) => (
                      <tr
                        key={item.Radif}
                        className={item.completed ? "completed-row" : ""}
                      >
                        <td className="text-nowrap">{item.Radif}</td>
                        <td className="text-nowrap">{item.FLname}</td>
                        <td className="text-nowrap">{item.IdNumber}</td>
                        <td className="text-nowrap">{item.DormNumber}</td>
                        <td className="text-nowrap">{item.RoomNumber}</td>
                        {/* <td ><a className="text-nowrap stretched-link" href={`tel:09177366123`} >09177366123</a></td> */}
                        <td>
                          <a
                            className="text-nowrap stretched-link"
                            href={`tel:${item.Mobile}`}
                          >
                            {item.Mobile}
                          </a>
                        </td>
                        <td className="text-nowrap">{item.eventDate}</td>
                        <td className="text-nowrap">{item.eventTime}</td>
                        <td className="text-nowrap">{item.EventTitle}</td>
                        <td className="text-nowrap">{item.Title}</td>
                        <td className="text-nowrap">{item.DiffDate}</td>
                        <td className="text-nowrap">{item.Operator}</td>
                        <td className="text-nowrap">{item.Description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
