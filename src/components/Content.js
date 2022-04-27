import { useState } from "react";
import Leagues from "./Leagues";
import Standings from "./Standings";

const Content = () => {

  const [activeTab, setActiveTab] = useState('leagues');

  return (
    <div className="content-container">
      <div className="tabs">
        <div className="tab-leagues" onClick={() => setActiveTab('leagues')}>
          <h2>Leagues</h2>
        </div>
        <div className="tab-standings" onClick={() => setActiveTab('standings')}>
          <h2>Standings</h2>
        </div>
      </div>
      {activeTab === 'leagues' ? <Leagues /> : <Standings />}
    </div>
  )
}

export default Content;