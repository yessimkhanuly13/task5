import { useState } from "react"
import InfiniteScrollTable from "./components/InfiniteScrollTable";
import { CSVLink } from "react-csv";
import shuffle from './assets/shuffle.png'

function App() {

  const [seed, setSeed] = useState(0);
  const [err, setErr] = useState(0);
  const [region, setRegion] = useState('');
  const [users, setUsers] = useState([]);
  const [csvData, setCsvData] = useState([]);

  const getRandomNumber = () =>{
    const number = Math.floor(Math.random() *  10000000);
    setErr(0);
    setSeed(number);
  }

  const getCSV = () =>{
    users.forEach((user)=>{
      const csv = [user.name.title + ' '+user.name.first + " " + user.name.last, user.location.country + ", " + user.location.city + ", " + user.location.street.number + " " + user.location.street.name, user.phone];
      setCsvData((prev)=>[...prev, csv]);
    })


  }

  return (
    <>
      <div className="flex justify-around mt-2">
        <div>
          <label htmlFor="selectfield">Region</label>
          <select id="selectfield" onChange={(e)=>{setRegion(e.target.value)}} className="text-center p-2">
            <option value="us">USA</option>
            <option value="fr">France</option>
            <option value="gb">Great Britain</option>
          </select>
        </div>
        <div>
          <input id="inputfield" value={err} onChange={(e)=>{setErr(e.target.value)}} className="text-slate-950" type="range" min='0' max='10'/>
          <input className="w-20 ml-2" type="number" value={err} onChange={(e)=>setErr(e.target.value)}/>
        </div>
        <div className="inline-flex items-center">
          <label htmlFor="seed">Seed</label>
          <input className="text-center w-20 ml-2" id="seed" onChange={(e)=>{setSeed(e.target.value); setErr(0)}} type="number" value={seed}/>
          <button onClick={getRandomNumber} className="w-8 h-8"><img className="" src={shuffle} alt="shuffle" /></button>
        </div>
        <div className="mt-2">
          <CSVLink onClick={getCSV} data={csvData} filename={'list.csv'} headers={['Name', 'Location', 'Phone']}>Export</CSVLink>
        </div>
      </div>
      <InfiniteScrollTable seed={seed} err={err} region={region} users={users} setUsers={setUsers}/>
    </>
  )
}

export default App
