# FOOTBALLISTA

## A REACT APPLICATION

[Live Version](https://footballista-app.netlify.app/)

Footballista is a fully responsive React application for football (soccer) statistics. It offers 20 leagues from around the globe and 10 years of standings statistics. I'm getting the data from the [Football Standings API](https://github.com/azharimm/football-standings-api). I did not utilize any UI library for the app's styles, all CSS is custom-built.

### LEAGUES

I used CSS grid for the basic layout of the Leagues tab. The league cards are rendered upon mapping of the data retrieved from the API.

![landing](https://user-images.githubusercontent.com/96293671/175395328-53b367db-89da-4944-af9d-08a65378ea50.png)

### STANDINGS

If the user does not choose a league from the league cards, but clickes on the Standings tab, the default league to display is the 2021 season of the German Bundesliga. The user can change both the league, and the season with the select dropdown menu. Each standings table is sortable by any of the available stats as well as alphabetically.

![bundesliga2021](https://user-images.githubusercontent.com/96293671/175396078-9398cad5-5d8e-4a58-91cc-a697f6ebca2f.png)

![premier2018](https://user-images.githubusercontent.com/96293671/175396097-0db91ead-37ce-47c2-b778-847c5a98e6d9.png)
