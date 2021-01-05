import React, {useEffect, useState} from 'react'
import { Loading } from '../../custom-components/Loading';
import { PostInfo } from './PostInfo';

export const UserPost = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = () => {
        const apiUrl = "https://jsonplaceholder.typicode.com/users";
        fetch(apiUrl)
        .then(response => response.json())
        .then((data) => {
            setUsers(data);
        }, 
        (error) => {
            alert('error in get users');
        })
    }

    const changeUser = (event) => {
        setIsLoading(true);
        const userId = event.target.value;
        const apiUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
        fetch(apiUrl)
        .then(response => response.json())
        .then( (data) => {
            setPosts(data);
            setIsLoading(false);
        }, (error) => {
            setIsLoading(false);
            alert('error in get user posts');
        })
    }

    return (
        <div className="card">
            <div className="card-header">لیست پست های کاربران</div>
            <div className="card-body">
                <div className="row">
                  <div className="col">
                      <label>کاربر مورد نظر : </label>
                      <select className="form-control" onChange={(event) => changeUser(event)}>
                            <option>انتخاب کنید</option>
                            {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                      </select>
                  </div>
                </div>
                <div className="row">
                      {isLoading ? <Loading /> : posts.map(item => <PostInfo key={item.id} info={item} />)}
                </div>
            </div>
        </div>
    )
}
