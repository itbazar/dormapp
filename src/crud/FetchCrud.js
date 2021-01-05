import React, {useRef, useState, useEffect} from 'react'
import { UserCombo } from '../custom-components/UserCombo'
import {insert, insertAsync, getAllAsync, removeAsync} from '../services/postService'

export const FetchCrud = () => {
    const titleRef = useRef();
    const bodyRef = useRef();
    const [userId, setUserId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const result = await getAllAsync();
        setPosts(result);
    }, [])

    const changeUser = (id) => {
        setUserId(id);
    }

    //async - await

    const save = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const post = {
            title:titleRef.current.value,
            body:bodyRef.current.value,
            userId:userId,
        };
        //insert(post);
        const result = await insertAsync(post);
        console.log('result :');
        console.log(result);
        setIsLoading(false);
    }

    const removeItem = async(id) => {
        const result = await removeAsync(id);
        if(result){
            setPosts([...posts.filter(q => q.id != id)]);
        }
    }

    return (
        <div className="card">
            <div className="card-header">مدیریت داده ها با Fetch</div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <form onSubmit={(event) => save(event)}>
                            <div class="form-group">
                                <label>عنوان : </label>
                                <input ref={titleRef} type="text" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>کاربر : </label>
                                <UserCombo changeItem={changeUser}/>
                            </div>
                            <div class="form-group">
                                <label>توضیح : </label>
                               <textarea ref={bodyRef} className="form-control"></textarea>
                            </div>
                            <button type="submit" disabled={isLoading ? 'disabled' : ''} class="btn btn-primary">ذخیره</button>
                        </form>
                    </div>
                    <div className="col">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>کد</th>
                                <th>عنوان</th>
                                <th>کاربر</th>
                                <th>متن</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map(item => 
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.userId}</td>
                                    <td>{item.body}</td>
                                    <td>
                                        <button onClick={()=> removeItem(item.id)} className="btn btn-danger btn-sm">
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
