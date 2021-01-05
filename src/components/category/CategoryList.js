import React, { useEffect } from 'react'
import { Loading } from '../../custom-components/Loading'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export const CategoryList = () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const history = useHistory();

    //Class Coponent => ComponentDidMount => call api
    //Function Component => useEffect => DidMount => call api
    useEffect(() => {
        //DidMount
        getCategoriesWithAxios();
    }, [])

    const getCategories = () => {
        const apiUrl = 'http://apitester.ir/api/CategoriesWithTokenAuth';
        const token = localStorage.getItem('token');
        fetch(apiUrl, {
            headers:{
                'content-type':'application/json',
                'Authorization':`bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(
                (data) => {
                    console.log(data);
                    setItems(data);
                    setIsLoading(false);
                },
                (error) => {
                    alert('error');
                    setIsLoading(false);
                },
                // () =>{ //finally - تو هر شرایطی کدهای این بخش اجرا می شود
                //     setIsLoading(false);
                // }
            )
    }

    const getCategoriesWithAxios = () => {
        //const apiUrl = 'http://apitester.ir/api/CategoriesWithTokenAuth';
        const apiUrl = 'https://localhost:44326/api/Category';
        const token = localStorage.getItem('token');
        const request = axios.get(apiUrl, {
                    headers:{
                        'content-type':'application/json',
                        'Authorization':`bearer ${token}`
                    }
             });

             request.then(response => {
                console.log(response.data);
                setItems(response.data);
                setIsLoading(false);
            })
            .catch(error =>{
               const tokenData = {
                refreshToken: localStorage.getItem('refresh-token'),
                token: localStorage.getItem('token'),
              }
               axios.post('https://localhost:44326/api/Authenticate/refresh', tokenData)
               .then(response => {
                   localStorage.setItem('token', response.data.token);
                   localStorage.setItem('refresh-token', response.data.refreshToken);

                   request.then(response => {
                        console.log(response.data);
                        setItems(response.data);
                        setIsLoading(false);
                    });

               }).catch(error => {
                   localStorage.clear();
                   history.push('/');
               })

            })
    }

    return (
        <div className="card">
            <div className="card-header">گروه بندی محصولات</div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? <Loading /> :
                                 items.map(item =>
                                    <tr key={item.categoryId}>
                                        <td>{item.categoryId}</td>
                                        <td>{item.categoryName}</td>
                                        <td>{item.description}</td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
