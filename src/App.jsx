import { useEffect, useState } from "react"
import axios from "axios"
import InfiniteScrollTable from "./components/InfiniteScrollTable";

function App() {

  const [seed, setSeed] = useState(1);
  const [err, setErr] = useState(0);
  const [region, setRegion] = useState('');

  return (
    <>
      <div className="flex justify-around">
        <div>
          Region:
          <select onChange={(e)=>{setRegion(e.target.value)}} className="text-center">
            <option value="us">USA</option>
            <option value="fr">France</option>
            <option value="gb">Great Britain</option>
          </select>
        </div>
        <div>
          Errors:
          <input onChange={(e)=>{setErr(e.target.value)}} type="range" min='0' max='10'/>
        </div>
        <div>
          Seed:
          <input onChange={(e)=>{setSeed(e.target.value)}} type="number"/>
          <button>Random</button>
        </div>
        <div>
          <button>Export</button>
        </div>
      </div>
      <InfiniteScrollTable seed={seed} err={err} region={region}/>
    </>
  )
}

export default App
