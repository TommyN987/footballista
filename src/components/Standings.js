import { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Standings = ({ data }) => {
  const [selectedLeague, setSelectedLeague] = useState('Select a league');
  console.log(data);

  return (
    <div className="standings-container">
      <select 
        name="select-league" 
        id="select-league"
        onChange={(e) => setSelectedLeague(e.target.value)}
        defaultValue={selectedLeague}>
          <option value="">{selectedLeague}</option>
          {data.map((league) => {
            return (
              <option 
                key={league.id} 
                value={league.id}>
                  {league.name}
              </option>
          );
        })}
      </select>
    </div>
  );
};

export default Standings;
