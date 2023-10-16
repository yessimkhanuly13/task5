import { useState } from "react"
import InfiniteScrollTable from "./components/InfiniteScrollTable";
import { CSVLink } from "react-csv";

function App() {

  const [seed, setSeed] = useState(1);
  const [err, setErr] = useState(1);
  const [region, setRegion] = useState('');
  const [dataCsv, setDataCsv] = useState([]);

  const getRandomNumber = () =>{
    const number = Math.floor(Math.random() *  10000000);
    setSeed(number);
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
          <label htmlFor="inputfield"></label>
          <input className="p-2" id="inputfield" onChange={(e)=>{setErr(e.target.value)}} type="range" min='0' max='10'/>
        </div>
        <div>
          <label htmlFor="seed">Seed</label>
          <input className="text-center w-20 ml-2" id="seed" onChange={(e)=>{setSeed(e.target.value)}} type="number" value={seed}/>
          <button onClick={getRandomNumber} className="border p-2">Random</button>
        </div>
        <div className="mt-2">
          <CSVLink data={dataCsv}>Export</CSVLink>
        </div>
      </div>
      <InfiniteScrollTable seed={seed} err={err} region={region} setDataCsv={setDataCsv}/>
    </>
  )
}

export default App
