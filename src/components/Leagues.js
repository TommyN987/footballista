import { useEffect, useState } from "react";

const Leagues = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    
    const fetchData = async (url) => {
      const res = await fetch(url);
      const apiData = await res.json();
      return apiData.data;
    };

    fetchData('https://api-football-standings.azharimm.site/leagues')
      .then((result) => {
        setData(result)
        console.log(data)
      })
  }, [])

  console.log(data)

  return (
    <div className="leagues-container">
      {data.map((league) => {
        return (
          <div key={league.id} className='league-div'>
            <img src={league.logos.light} alt="" />
          </div>
        )
      })}
    </div>
  )
};

export default Leagues;