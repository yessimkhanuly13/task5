import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

function InfiniteScrollTable({seed, err, region, users, setUsers}) {
    
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

    const introduceErrors = (user, errorCount) => {
        errorCount = errorCount ;
        for (let i = 0; i < errorCount; i++) {
            const data = ['name', 'location', 'id', 'phone'];

            const dataType = Math.floor(Math.random() * 4);
            const errorType = Math.floor(Math.random() * 3) + 1;

            if(data[dataType] === 'name'){
                const names = ['first', 'last', 'title'];
                const index = Math.floor(Math.random() * names.length);
                switch (errorType) {
                    case 1:
                        const position = Math.floor(Math.random() * user.name[names[index]].length);
                        user.name[names[index]] = user.name[names[index]].slice(0, position) + user.name[names[index]].slice(position + 1);
                        break;
                    case 2:
                        const positionToAdd = Math.floor(Math.random() * user.name.length);
                        const randomCharacter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                        user.name[names[index]] = user.name[names[index]].slice(0, positionToAdd) + randomCharacter + user.name[names[index]].slice(positionToAdd);
                        break;
                    case 3:
                        const positionToSwap = Math.floor(Math.random() * (user.name[names[index]].length - 1));
                        user.name[names[index]] = user.name[names[index]].slice(0, positionToSwap) + user.name[names[index]].charAt(positionToSwap + 1) + user.name[names[index]].charAt(positionToSwap) + user.name[names[index]].slice(positionToSwap + 2);
                        break;
                    default:
                        break;
                }
            }else if(data[dataType] === 'location'){
                const locations = ['country', 'city'];
                const index = Math.floor(Math.random() * locations.length);
                switch (errorType) {
                    case 1:
                        const position = Math.floor(Math.random() * user.location[locations[index]].length);
                        user.location[locations[index]] = user.location[locations[index]].slice(0, position) + user.location[locations[index]].slice(position + 1);
                        break;
                    case 2:
                        const positionToAdd = Math.floor(Math.random() * user.location.street.name.length);
                        const randomCharacter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                        user.location.street.name = user.location.street.name.slice(0, positionToAdd) + randomCharacter + user.location.street.name.slice(positionToAdd);
                        break;
                    case 3:
                        const positionToSwap = Math.floor(Math.random() * (user.location[locations[index]].length - 1));
                        user.location[locations[index]] = user.location[locations[index]].slice(0, positionToSwap) + user.location[locations[index]].charAt(positionToSwap + 1) + user.location[locations[index]].charAt(positionToSwap) + user.location[locations[index]].slice(positionToSwap + 2);
                        break;
                    default:
                        break;
                }
            }else if(data[dataType] === 'id'){
                switch (errorType) {
                    case 1:
                        const position = Math.floor(Math.random() * user.login.uuid.length);
                        user.login.uuid = user.login.uuid.slice(0, position) + user.login.uuid.slice(position + 1);
                        break;
                    case 2:
                        const positionToAdd = Math.floor(Math.random() * user.login.uuid.length);
                        const randomCharacter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                        user.login.uuid = user.login.uuid.slice(0, positionToAdd) + randomCharacter + user.login.uuid.slice(positionToAdd);
                        break;
                    case 3:
                        const positionToSwap = Math.floor(Math.random() * (user.login.uuid.length - 1));
                        user.login.uuid = user.login.uuid.slice(0, positionToSwap) + user.login.uuid.charAt(positionToSwap + 1) + user.login.uuid.charAt(positionToSwap) + user.login.uuid.slice(positionToSwap + 2);
                        break;
                    default:
                        break;
                }
            }else if(data[dataType] === 'phone'){
                switch (errorType) {
                    case 1:
                      const position = Math.floor(Math.random() * user.phone.length);
                      user.phone = user.phone.slice(0, position) + user.phone.slice(position + 1);
                      break;
                    case 2:
                      const positionToAdd = Math.floor(Math.random() * user.phone.length);
                      const randomCharacter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                      user.phone = user.phone.slice(0, positionToAdd) + randomCharacter + user.phone.slice(positionToAdd);
                      break;
                    case 3:
                      const positionToSwap = Math.floor(Math.random() * (user.phone.length - 1));
                      user.phone = user.phone.slice(0, positionToSwap) + user.phone.charAt(positionToSwap + 1) + user.phone.charAt(positionToSwap) + user.phone.slice(positionToSwap + 2);
                      break;
                    default:
                      break;
                }
            }
        }
      }
    
    useEffect(()=>{
        axios.get(`https://randomuser.me/api?inc=name,nat,login,location,phone&nat=${region}&results=30&page=1&seed=${seed}`)
            .then((res)=>{
                setUsers(res.data.results)
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
                            introduceErrors(user, err);
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