import React from 'react'
import { useHistory, useParams, useLocation } from 'react-router-dom'
import * as QueryString from "query-string";

export const ProductDetails = () => {
    const history = useHistory();
    const { id } = useParams();
    const location = useLocation();
    const params = QueryString.parse(location.search);

    return (
        <div className="card">
            <div className="card-header">مشخصات محصول</div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h4>کد محصول : {id} - {params.id}</h4>
                        <h5>نام محصول : {params.title}</h5>
                        <button className="btn btn-secondary" onClick={() => history.goBack()}>بازگشت به لیست</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
