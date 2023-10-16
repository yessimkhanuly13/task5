import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function InfiniteScrollTable({seed, err, region, setDataCsv, users, setUsers}) {
    
    const [page, setPage] = useState(1);

    const fetchMoreUsers = () =>{
        axios.get(`https://randomuser.me/api?inc=name,nat,login,location,phone&nat=${region}&results=10&page=${page + 1}`)
            .then((res)=>{
                setUsers((prevUsers)=>[...prevUsers, ...res.data.results]);
                setPage(page+1);
            })
            .catch((e)=>{
                console.log(e);
            })
    }
    
    useEffect(()=>{
        axios.get(`https://randomuser.me/api?inc=name,nat,login,location,phone&nat=${region}&results=30&page=1&seed=${seed}`)
            .then((res)=>{
                setUsers(res.data.results)
                console.log(users);
            })
            .catch((e)=>{
                console.log(e);
            })
    },[seed, region])
    return (
      <div>
            <InfiniteScroll
                dataLength={users.length}
                next={fetchMoreUsers}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <table className='border w-screen mt-4'>
                    <tbody className='border'>
                        {users.map((user, index) => {

                            return (
                            <tr className='odd:bg-white even:bg-slate-100 text-center' key={index}>
                                <td>{user.login.uuid}</td>
                                <td>{user.name.title + ' '+user.name.first + " " + user.name.last}</td>
                                <td>{user.location.country + ", " + user.location.city + ", " + user.location.street.number + " " + user.location.street.name}</td>
                                <td>{user.phone}</td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </InfiniteScroll>
      </div>
    );
  }

export default InfiniteScrollTable