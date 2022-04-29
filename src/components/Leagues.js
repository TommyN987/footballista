const Leagues = ({ data, setUrlPart, setActiveTab }) => {

  return (
    <div className="leagues-container">
      {data.map((league) => {
        return (
          <div key={league.id} className='league-div' onClick={() => {
            setUrlPart(league.id)
            setActiveTab('standings')
            }}>
            <img src={league.logos.light} alt="League Logo" />
            <h3>{league.name}</h3>
          </div>
        )
      })}
    </div>
  )
};

export default Leagues;