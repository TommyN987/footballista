import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Standings = ({ data, urlPart }) => {
  const [loading, setLoading] = useState(false);
  const [standings, setStandings] = useState([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState(urlPart || 'ger.1');
  const [selectedYear, setSelectedYear] = useState('2021');
  const [sortAsc, setSortAsc] = useState(false);
  const [sortName, setSortName] = useState(false);


  const sortByStat = (arr, stat, dir) => {
    const sorter = (a, b) => {
      if (dir) {
        return a.stats[stat].value - b.stats[stat].value;
      } else return b.stats[stat].value - a.stats[stat].value;
    };
    
    arr.sort(sorter);
    return arr;
  };

  const handleSortByStat = (indexInJson) => {
    if (!standings) return;    
    setSortAsc(sortAsc => !sortAsc);
    setStandings(sortByStat([...standings], indexInJson, sortAsc))
  };

  const sortByName = (arr, dir) => {
    const sorter = (a, b) => {
      if (dir) {
        return a.team.name.localeCompare(b.team.name);
      } else return b.team.name.localeCompare(a.team.name);
    }

    arr.sort(sorter);
    return arr;
  }

  useEffect(() => {
    setLoading(true);
    const fetchStandingsData = async () => {
      const res = await fetch(
        `https://api-football-standings.azharimm.site/leagues/${selectedLeagueId}/standings?season=${selectedYear}`
      );
      const standingsData = await res.json();
      setStandings(standingsData.data.standings);
      setLoading(false);
    };

    fetchStandingsData()
      .catch((error) => {
        alert('No available data for this year.')
      });

  }, [selectedLeagueId, selectedYear]);

  return (
    <div className="standings-container">
      <div className="select-container">
        <select
          name="select-league"
          id="select-league"
          defaultValue={selectedLeagueId}
          onChange={(e) => setSelectedLeagueId(e.target.value)}
        >
          {data.map((league) => {
            return (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            );
          })}
        </select>
        <select
          name="select-year"
          id="select-year"
          onChange={(e) => setSelectedYear(e.target.value)}
          defaultValue="2021"
        >
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
      </div>
      {loading ? <InfinitySpin color="rgb(28, 27, 27)" /> :
      (
        <div className="standings">
          <table>
            <thead>
              <tr className="row">
                <th onClick={() => handleSortByStat(8)}>Rank</th>
                <th onClick={() => {
                  setSortName(sortName => !sortName)
                  if (!standings) return;
                  setStandings(sortByName([...standings], sortName));
                  }}>Team</th>
                <th onClick={() => handleSortByStat(3)}>Games Played</th>
                <th onClick={() => handleSortByStat(0)}>Wins</th>
                <th onClick={() => handleSortByStat(1)}>Losses</th>
                <th onClick={() => handleSortByStat(2)}>Ties</th>
                <th onClick={() => handleSortByStat(4)}>Points for</th>
                <th onClick={() => handleSortByStat(5)}>Points against</th>
                <th onClick={() => handleSortByStat(9)}>Point diff</th>
              </tr>
            </thead>
            <tbody>
              {standings 
              ? 
              standings.map((team) => {
                return (
                  <tr key={team.stats[8].value}>
                    <td>{team.stats[8].value}</td>
                    <td>
                      <img
                        className="team-logo"
                        src={team.team.logos ? team.team.logos[0].href : 'https://4.bp.blogspot.com/-w1l1EOjfliY/XJFNrih6r1I/AAAAAAAAJO8/YHgJOsZIPVM6MPYgEL35aRNA-WQ7HAi8QCK4BGAYYCw/s1600/icon%2Bfootball%2Bsoccer%2Bball.png'}
                        alt="Logo"
                      />{team.team.name}
                    </td>
                    <td>{team.stats[3].value}</td>
                    <td>{team.stats[0].value}</td>
                    <td>{team.stats[1].value}</td>
                    <td>{team.stats[2].value}</td>
                    <td>{team.stats[4].value}</td>
                    <td>{team.stats[5].value}</td>
                    <td>{team.stats[9].value}</td>
                  </tr>
                );
              }) 
              : 
              <div className='error'>No data available for this season</div>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Standings;
