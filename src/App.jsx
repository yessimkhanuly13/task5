import { useEffect, useState } from "react"
import axios from "axios"
import InfiniteScrollTable from "./components/InfiniteScrollTable";

function App() {

  const [seed, setSeed] = useState(1);
  const [err, setErr] = useState(0);
  const [region, setRegion] = useState('');


  useEffect(()=>{
    axios.get('https://randomuser.me/api/')
      .then((res)=>{
        console.log(res.data);
      })
      .catch((e)=>{
        console.log(e);
      })
  },[])

  return (
    <>
      <div className="flex justify-around">
        <div>
          Region:
          <select className="text-center">
            <option value="US">USA</option>
            <option value="FR">France</option>
            <option value="GB">Great Britain</option>
          </select>
        </div>
        <div>
          Errors:
          <input type="range" min='0' max='10'/>
        </div>
        <div>
          Seed:
          <input type="number"/>
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
