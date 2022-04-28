import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Standings = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [standings, setStandings] = useState({});
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    setLoading(true);

    const fetchStandingsData = async () => {
      const res = await fetch(`https://api-football-standings.azharimm.site/leagues/${selectedLeague}/standings?season=${selectedYear}`);
      const standingsData = await res.json();
      return standingsData.data
    }

    fetchStandingsData()
      .then((res) => {
        setStandings(res);
        setLoading(false);
        return res
      })
      .then((data) => console.log(data));
  },[selectedLeague, selectedYear])

  return (
    <div className="standings-container">
      <select 
        name="select-league" 
        id="select-league"
        onChange={(e) => setSelectedLeague(e.target.value)}
        defaultValue='def'>
          <option value="def" disabled>Select a league</option>
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
      <select 
        name="select-year" 
        id="select-year"
        onChange={(e) => setSelectedYear(e.target.value)}
        defaultValue='def'>
          <option value="def" disabled>Year</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
          <option value="2011">2011</option>
        </select>
        { loading && <InfinitySpin color='rgb(28, 27, 27)' />}
        {/* { standings !== {} && } */}
    </div>
  );
};

export default Standings;
