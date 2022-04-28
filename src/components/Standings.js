import { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const Standings = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [standings, setStandings] = useState([]);
  const [selectedLeagueId, setSelectedLeagueId] = useState('ger.1');
  const [selectedYear, setSelectedYear] = useState('2021');

  useEffect(() => {
    setLoading(true);

    const fetchStandingsData = async () => {
      const res = await fetch(
        `https://api-football-standings.azharimm.site/leagues/${selectedLeagueId}/standings?season=${selectedYear}`
      );
      const standingsData = await res.json();
      setStandings(standingsData.data.standings);
      return standingsData.data.standings;
    };

    fetchStandingsData().then((res) => {
      setLoading(false);
      console.log(res)
      return res;
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
      {loading && <InfinitySpin color="rgb(28, 27, 27)" />}
      {!loading && (
        <table className='standings'>
          <thead>
            <tr className='row'>
              <th>Rank</th>
              <th>Logo + Team</th>
              <th>Games Played</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Ties</th>
              <th>Points for</th>
              <th>Points against</th>
              <th>Point diff</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => {
              return (
                <tr key={team.stats[8].value}>
                  <td>{team.stats[8].value}</td>
                  <td><img className='team-logo' src={team.team.logos[0].href} alt="Logo" /> {team.team.name}</td>
                  <td>{team.stats[3].value}</td>
                  <td>{team.stats[0].value}</td>
                  <td>{team.stats[1].value}</td>
                  <td>{team.stats[2].value}</td>
                  <td>{team.stats[4].value}</td>
                  <td>{team.stats[5].value}</td>
                  <td>{team.stats[9].value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Standings;
