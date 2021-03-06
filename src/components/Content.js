import { useState, useEffect } from "react";
import Leagues from "./Leagues";
import Standings from "./Standings";

const Content = () => {

  const [activeTab, setActiveTab] = useState('leagues');
  const [urlPart, setUrlPart] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    
    const fetchData = async (url) => {
      const res = await fetch(url);
      const apiData = await res.json();
      return apiData.data;
    };

    fetchData('https://api-football-standings.azharimm.site/leagues')
      .then((result) => {
        setData(result);
      })
  }, [])

  return (
    <div className="content-container">
      <div className="tabs">
        <div 
          className="tab-leagues" 
          onClick={() => setActiveTab('leagues')} style={
          {
            color: activeTab === 'leagues' ? 'var(--secondary-color)' : null,
            backgroundColor: activeTab === 'leagues' ? 'var(--tertiary-color)' : null,
          }}>
          <h2>Leagues</h2>
        </div>
        <div 
          className="tab-standings" 
          onClick={() => setActiveTab('standings')}
          style={
            {
              color: activeTab === 'standings' ? 'var(--secondary-color)' : null,
              backgroundColor: activeTab === 'standings' ? 'var(--tertiary-color)' : null,
            }}>
          <h2>Standings</h2>
        </div>
      </div>
      {activeTab === 'leagues' ? <Leagues data={data} setUrlPart={setUrlPart} setActiveTab={setActiveTab} /> : <Standings data={data} urlPart={urlPart} />}
    </div>
  )
}

export default Content;