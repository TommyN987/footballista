const Leagues = ({data}) => {

  return (
    <div className="leagues-container">
      {data.map((league) => {
        return (
          <div key={league.id} className='league-div'>
            <img src={league.logos.light} alt="League Logo" />
            <h3>{league.name}</h3>
          </div>
        )
      })}
    </div>
  )
};

export default Leagues;