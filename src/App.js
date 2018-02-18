import React, {Component} from 'react';
import './App.css';
import Carousel from 'nuka-carousel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beers: [],
      curTime: new Date().toLocaleTimeString(),
      reportRunningTime: false
    }
  }

  tick() {
    this.setState({
      curTime: new Date().toLocaleTimeString()
    });
  }

  componentDidMount() {
    this.clockInterval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.clockInterval);
  }

  componentWillMount() {
    fetch(this.getAPIEndPoint())
      .then(results => results.json())
      .then(data => {
        this.setState(prevState => ({beers: data}));
      });
  }

  getAPIEndPoint() {
    const base_uri = "https://api.punkapi.com/v2/beers?per_page=10";

    // simulate tax report running time by getting 1 on 4 chance of it happening
    // randomly
    if (this.getRandomArbitrary(0, 4) === 0) {
      this.setState({reportRunningTime: true});
      return `${base_uri}&ibu_gt=50`;
    } else {
      this.setState({reportRunningTime: false});

      const now = new Date();
      if (this.isWeekday(now.getDay())) {
        switch (this.getPartOfDay(now.getHours())) {
          case "Morning":
            return `${base_uri}&ebc_lt=10&abv_lt=4`;
          case "Evening":
            return `${base_uri}&ebc_gt=30&abv_lt=4`;
          default:
            return `${base_uri}`;
        }
      } else {
        switch (this.getPartOfDay(now.getTime)) {
          case "Morning":
            return `${base_uri}&ebc_lt=10&abv_gt=6`;
          case "Evening":
            return `${base_uri}&ebc_gt=30&abv_gt=6`;
          default:
            return `${base_uri}`;
        }
      }
    }
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  isWeekday(day) {
    return day !== 0 && day !== 6;
  }

  getPartOfDay(hour) {
    return hour < 12
      ? "Morning"
      : "Evening";
  }

  render() {
    var items = this
      .state
      .beers
      .map(beer => {
        return <div className="wrapper" key={beer.id}>
          <div className="info-card">
            <div
              className="beer-image"
              style={{
              backgroundImage: "url(" + beer.image_url + ")",
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}></div>
            <div className="head-wrapper">
              <div className="beer-tagline">{beer.tagline}</div>
              <div className="beer-name">{beer.name}</div>
            </div>
            <div className="beer-description">
              {beer
                .description
                .substring(0, 260) + '...'}
            </div>

            <div className="beer-stats clearfix">
              <div className="one-third">
                <div className="stat">{beer.abv
                    ? beer.abv
                    : 'xx'}
                  <sup>%</sup>
                </div>
                <div className="stat-value">ABV</div>
              </div>

              <div className="one-third">
                <div className="stat">{beer.ibu
                    ? beer.ibu
                    : 'xx'}</div>
                <div className="stat-value">IBU</div>
              </div>

              <div className="one-third no-border">
                <div className="stat">{beer.ebc
                    ? beer.ebc
                    : 'xx'}</div>
                <div className="stat-value">EBC</div>
              </div>
            </div>
          </div>
        </div>
      });

    return (
      <div className="App">
        <div className="row">
          <div className="col-md-3 time">{this.state.curTime}</div>
          <div className="col-md-6 app-title">The Beerrousel</div>
          <div className="col-md-3"></div>
        </div>
        <div className="app-message">Which one is your favorite?</div>
        <div className="app-additional-message">{this.state.reportRunningTime
            ? "(Oh! Here's the bitter ones to go along with your tax reports!!)"
            : ""}
        </div>
        <div className="container">
          <Carousel>
            {items}
          </Carousel>
        </div>
      </div>
    )
  }
}

export default App;
