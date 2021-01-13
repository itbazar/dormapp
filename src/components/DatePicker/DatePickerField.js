import React, { useState, useEffect, useMemo } from "react";
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { utils } from 'react-modern-calendar-datepicker';
import moment from "moment-jalaali";

// import DatePicker from "react-datepicker";
// import { useLang } from "../../../i18n/Basei18n";
// import { useFormikContext } from "formik";
// import {
//   formatDateString,
//   convertDateStringToLocal,
//   initDatePickerValue,
// } from "../DatePicker/DateFormaterHelpers";

const getFieldCSSClasses = (touched, errors) => {
  const classes = ["form-control"];
  if (touched && errors) {
    classes.push("is-invalid");
  }

  if (touched && !errors) {
    classes.push("is-valid");
  }

  return classes.join(" ");
};



export const setDatepickerValue = ({
  val,
  field,
  setFieldValue,
  locale,
  setSelectedDay,
}) => {
  let utcDate = null;
  // debugger;
  if (locale === "fa") {
    utcDate = moment(`${val.year}/${val.month}/${val.day}`, "jYYYY/jM/jD");
   let apiDate = moment(`${val.year}-${val.month}-${val.day}`, "jYYYY/jM/jD").format('jYYYY-jMM-jDD');
    setFieldValue(apiDate);
    // debugger
  } else {
    utcDate = moment(`${val.year}-${val.month}-${val.day}`, "YYYY-MM-DD");
    let apiDate =  moment(`${val.year}-${val.month}-${val.day}`, "YYYY-MM-DD").format('jYYYY-jMM-jDD');;
    setFieldValue(apiDate);
  }
  // console.log("utcDate 1980 " + JSON.stringify(utcDate));
  let newValue = utcDate.format("YYYY-MM-DDTHH:mm:ss");
  // console.log("newValue 1980 " + JSON.stringify(newValue));
  // setFieldValue(field.name, newValue);
  // setdefaultDate(defaultValue);
  setSelectedDay(val);
};



  function setDfaultDateValue  ( field ) {
    const defaultDate1 = {
      year: field.year,
      month: field.month,
      day:field.day,
    };
    // return defaultDate1;
    const defaultDate2 = {
      year: "1399",
      month: "11",
      day: "11",
    };
    if (field) {
      // setSelectedDay(defaultDate1)
      return defaultDate1;
    } else {
      // setSelectedDay(defaultDate1)
      return defaultDate2;
    }
  };

export function DatePickerField({ ...props }) {
  // const { setFieldValue, errors, touched } = useFormikContext();
  // debugger;
  const { field } = props;
  const { setFieldValue } = props;
  const locale = 'fa';
  const [selectedDay, setSelectedDay] = useState();
 
  useEffect(() => {
    setSelectedDay(setDfaultDateValue(field))
  }, [])
 // setSelectedDay(field);
  // const [defaultDate, setdefaultDate] = useState({
  //   year: "1400",
  //   month: "01",
  //   day: "01",
  // });





  return (
    <>
      {props.label && <label>{props.label}</label>}
      <br />
      {
        <DatePicker
          className={getFieldCSSClasses(
            // touched[field.name],
            // errors[field.name]
          )}
          style={{ width: "100%" }}
          {...field}
          {...props}
          value={selectedDay}
          locale={locale}
          onChange={(val) => {
            setDatepickerValue({
              val,
              field,
              locale,
              setFieldValue,
              setSelectedDay,
            });
          }}
          shouldHighlightWeekends
        />
      }

    </>
  );
}
