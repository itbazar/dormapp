import React, { useRef, useState, useEffect } from 'react'
import { Loading } from 'custom-components/Loading';
import Paging from 'custom-components/Paging';
import { UserCombo } from 'custom-components/UserCombo'
import { getAllAsync, insertAsync } from 'services/todoService'

export const AxiosCrud = () => {

    const pageItemCount = process.env.REACT_APP_PAGE_ITEM_COUNT;
    const [page , setPage] = useState(0);
    const [currentPage , setCurrentPage] = useState(1);
    const [user, setUserId] = useState();
    const [todos, setTodos] = useState([]);
    const [currentTodos, setCurrentTodos] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const isCompletedRef = useRef(false);
    const titleRef = useRef('');

    useEffect(async () => {
        const result = await getAllAsync();
        setTotalCount(result.data.length);
        setTodos(result.data);
        // debugger;
        setIsLoading(false);
        setPage(Math.ceil(result.data.length / pageItemCount)); // 193 / 10 => 19.3 => ceil(19.3) => 20
        setCurrentTodos(result.data.slice(0, pageItemCount));
      
    }, [])

    const changePage = (i) => {
        // debugger;
        setCurrentPage(i);
        const startItem = ((i - 1) * pageItemCount) + 1;
        setCurrentTodos(todos.slice(startItem , (pageItemCount * i) + 1))
    }

    const changeUser = (id) => {
        setUserId(id);
    }

    const save = (event) => {
        event.preventDefault();
    }

    return (
        <div className="card">
            <div className="card-header">مدیریت داده ها با Axios</div>
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
                                <UserCombo changeItem={changeUser} />
                            </div>
                            <div class="form-group">
                                <label>
                                    <input type="checkbox" ref={isCompletedRef} className="ml-2" />
                                    کامل شده
                                </label>
                            </div>
                            <button type="submit" disabled={isLoading ? 'disabled' : ''} class="btn btn-primary">ذخیره</button>
                        </form>
                    </div>
                    <div className="col">
                    <div>
                            <nav aria-label="...">
                                <ul class="pagination">
                                    <Paging pageCount={page} currentPage={currentPage} changePage={changePage} />
                                   {/* {generatePagination(page, 1, changePage)} */}
                                </ul>
                            </nav>
                        </div>
                        <div class="table-responsive">
                        <table className="table table-striped table-bordered ">
                            <thead>
                                <tr>
                                    <th>شماره ردیف</th>
                                    <th>IdNumber</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>FLname</th>
                                    <th>DormNumber</th>
                                    <th>BlockNumber</th>
                                    <th>RoomNumber</th>
                                    <th>event</th>
                                    <th>eventDate</th>
                                    <th>eventTime</th>
                                    <th>EventTitle</th>
                                    <th>Title</th>
                                    <th>DeviceId</th>
                                    <th>GroupDeviceId</th>
                                    <th>OperatorId</th>
                                    <th>Operator</th>
                                    <th>Mobile</th>
                                    <th>Phone</th>
                                    <th>Description</th>
                                    <th>DiffDate</th>
                                    <th>Selected</th>
                                    <th>Radif</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentTodos.map((item,index) =>
                                    <tr key={item.Radif} className={item.completed ? "completed-row" : ""}>
                                        <td>{index + ((currentPage - 1) * pageItemCount) + 1}</td>
                                        <td>{item.IdNumber}</td>
                                        <td>{item.FirstName}</td>
                                        <td>{item.LastName}</td>
                                        {/* <td>{item.completed ? <span>✓</span> : <span>×</span>}</td> */}
                                        <td>{item.FLname}</td>
                                        <td>{item.DormNumber}</td>
                                        <td>{item.BlockNumber}</td>
                                        <td>{item.RoomNumber}</td>
                                        <td>{item.event}</td>
                                        <td>{item.eventDate}</td>
                                        <td>{item.eventTime}</td>
                                        <td>{item.EventTitle}</td>
                                        <td>{item.Title}</td>
                                        <td>{item.DeviceId}</td>
                                        <td>{item.GroupDeviceId}</td>
                                        <td>{item.OperatorId}</td>
                                        <td>{item.Operator}</td>
                                        <td>{item.Mobile}</td>
                                        <td>{item.Phone}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.DiffDate}</td>
                                        <td>{item.Selected}</td>
                                        <td>{item.Radif}</td>
    
                                    </tr>)}
                            </tbody>
                            {isLoading ? <Loading /> : null}
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
