import React from 'react';

import StarBars from './StarBars.jsx';
import AttributeGraph from './AttributeGraph.jsx';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ratings: {},
      recommended: {},
      recommend: '100%',
      averageRating: 0,
      starPercentage: '0',
      starBarPercentages: {},
    };
    this.averageStarRating = this.averageStarRating.bind(this);
    this.updateEachStarBar = this.updateEachStarBar.bind(this);
    this.checkForReco = this.checkForReco.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3004/reviews/15/meta')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          ratings: data.ratings,
          recommended: data.recommended,
        });
      })
      .then((moarData) => {
        this.checkForReco();
        this.averageStarRating();
        this.updateEachStarBar();
      });
  }

  checkForReco() {
    let posRecs = this.state.recommended['1'];
    let totalRecs = posRecs + this.state.recommended['0'];
    let percentage = Math.round((posRecs / totalRecs) * 100);
    let percentageText = `${percentage}%`;
    console.log('percentagetext from checkforreco', percentageText);
    this.setState({
      recommend: percentageText,
    });
  }

  averageStarRating() {
    let ratings = this.state.ratings;
    let ratingsValues = Object.keys(ratings);
    let totalRating = 0;
    let numRating = 0;
    for (let i = 0; i < ratingsValues.length; i += 1) {
      totalRating += (ratingsValues[i] * ratings[ratingsValues[i]]);
      numRating += ratings[ratingsValues[i]];
    }
    console.log('total num ratings from avstar', totalRating, numRating);
    let averageRating = totalRating / numRating;
    console.log(averageRating);
    const starPercentage = (averageRating / 5) * 100;
    this.setState({
      starPercentage,
      averageRating,
    });
  }

  updateEachStarBar() {
    let ratings = this.state.ratings;
    let ratingsValues = Object.keys(ratings);
    let numOfRatings = Object.values(ratings);
    let overallNumRatings = 0;
    let numRating = 0;
    for (let i = 0; i < numOfRatings.length; i += 1) {
      overallNumRatings += numOfRatings[i];
    }
    console.log('total num ratings from updateeach', overallNumRatings);
    let starBars = {};
    for (let j = 1; j < 6; j += 1) {
      if (ratings[j] === undefined) {
        starBars[j] = '';
      } else {
        let num = ratings[j];
        console.log(num);
        let percent = (num / overallNumRatings) * 100;
        console.log('percent', percent);
        starBars[j] = `${percent}%`;
      }
    }
    this.setState({
      starBarPercentages: starBars,
    });
  }

  render() {
    let widthStyle = {
      width: `${this.state.starPercentage}%`,
    };
    let { starBarPercentages } = this.state;
    let { hide5Stars, hide4Stars, hide3Stars, hide2Stars, hide1Stars, style } = this.props;
    console.log('starBarpercentages', this.state.starBarPercentages);
    return (
      <div id="sidebar">
        <div className="sidebar-header"><div className="sidebarTitle">{`Ratings & Reviews`}</div></div>
        <ul className="list-unstyled components">
          <li>
            <div className="sb-starsParent">
              <p className="sidebarStarNum">{(this.state.averageRating).toFixed(1)}</p>
              <div className="sb-stars-outer">
                <div className="sb-stars-inner" style={widthStyle}></div>
              </div>
              <span className="sb-number-rating"></span>
            </div>
            <div className="sidebarRecommend">
              {this.state.recommend} of reviews recommend this product
            </div>

            <StarBars
              starBarPercentages={starBarPercentages}
              filter={this.props.filter}
              removeFilter={this.props.removeFilter}
              hide5Stars={hide5Stars}
              hide4Stars={hide4Stars}
              hide3Stars={hide3Stars}
              hide2Stars={hide2Stars}
              hide1Stars={hide1Stars}
              style={style}
            />
            <AttributeGraph />
          </li>
        </ul>
        <div id="content">
          {/* <p>Content</p> */}
        </div>
      </div>
    );
  }
}

export default Sidebar;
