import React, {  useState,useEffect } from 'react'
import { UserTrafficTypeCombo } from 'custom-components/UserTrafficTypeCombo'
import { insertTrafic } from 'services/dormService'
import moment from 'moment-jalaali'
import { useHistory } from 'react-router-dom'
import DormTypeCombo from 'custom-components/DormTypeCombo'
import { Loading } from 'custom-components/Loading'

export const AddTrafic = () => {
    const history = useHistory();
    const pageItemCount = process.env.REACT_APP_PAGE_ITEM_COUNT;
    const curentDormType = JSON.parse(localStorage.getItem('dorm-api'));

    moment.locale('fa');
    moment.loadPersian();
    const jmoment = moment();
    const todayDate = jmoment.format('jYYYY-jMM-jDD');
    const curentUser = JSON.parse(localStorage.getItem('user'));
    // let day =  jmoment.jYear();
    // debugger;
    const [user, setUser] = useState(curentUser);
    const [idNumber, setIdnumber] = useState(user.IdNumber);
    const [traficType, setTraficType] = useState(1);
    const [changeIdNumber, setChangeIdNumber] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [dormType, setDormType] = useState(curentDormType);
    

    useEffect( () => {
        let p =  localStorage.setItem('dorm-api', JSON.stringify(dormType));
        // setNeedReload(true)
        if (user.UserTypeId !== 3)
        setChangeIdNumber(false);

    }, [dormType])

    useEffect(() => {
        if (user.UserTypeId !== 3)
        setChangeIdNumber(false);
    }, [])
   
    const SaveTrafic = async (event) => {
        // debugger;
        //941810397001
        const newTrafic=
        {    "idnumber": idNumber,
            "trafficType": traficType
          }
        const result = await insertTrafic(newTrafic);
        setIsLoading(false);
        console.log(JSON.stringify(result.data[0].ReturnValue));
        // console.log(JSON.stringify(result.data[0].ReturnValue));
        if(result.data[0] !== undefined)
        alert(result.data[0].ReturnValue);
        else
        alert("خطا در ثبت اطلاعات");

    }

    const submitForm = (event) => {
        event.preventDefault();
        setIsLoading(true);
        SaveTrafic(event);
    }

    return (
        <div className="card">
            <div className="card-header">ثبت تردد </div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <form onSubmit={(event) => submitForm(event)}>
                            <div className="form-group">
                                <label>شماره دانشجویی : </label>
                                <input type="text" name="idNumber" id="idNumber" className="form-control" disabled={changeIdNumber} value={idNumber} onChange={(e) => { setIdnumber(e.target.value) }} />
                            </div>

                            {user.UserTypeId !== 3 ? <div className="form-group" >
                                <label>نوع خوابگاه : </label>
                                <DormTypeCombo changeItem={setDormType} selected={dormType}/>
                            </div> : null}

                            <div className="form-group">
                                <label>نوع تردد : </label>
                                <UserTrafficTypeCombo changeItem={setTraficType} />
                            </div>
                            {isLoading ? <Loading /> : null}
                            <button type="submit" disabled={isLoading ? 'disabled' : ''} className="btn btn-primary btn-block">ثبت تردد</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddTrafic;
