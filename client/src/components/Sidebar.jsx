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
      reviews: [],
      averageRating: 0,
      starPercentage: '0',
      barPercents: [],
      stars: [
        { name: 1, count: 0 },
        { name: 2, count: 0 },
        { name: 3, count: 0 },
        { name: 4, count: 0 },
        { name: 5, count: 0 },
      ],
    };
    this.averageStarRating = this.averageStarRating.bind(this);
    this.updateEachStarBar = this.updateEachStarBar.bind(this);
    this.checkForReco = this.checkForReco.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3004/reviews/5/meta')
    // fetch(' http://localhost:3004/reviews/5/list')
      .then(res => res.json())
      .then((data) => {
        this.checkForReco(data);
        this.averageStarRating(data);
      });
      // .then(data => this.setState({
      //   ratings: data.ratings,
      //   recommended: data.recommended,
      //   // reviews: data.results,
      // }))
      // .then(moarData => this.averageStarRating())
      // .then(smoreData => this.updateEachStarBar())
      // .then(smoreSmoreData => this.checkForReco());

    fetch('http://localhost:3004/reviews/5/list')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          reviews: data.results,
        });
      })
      .then((smoreData) => {
        this.updateEachStarBar(smoreData);
      });
  }

  // checkForReco() {
  //   let recommends = 0;
  //   for (let i = 0; i < this.state.reviews.length; i++) {
  //     recommends += this.state.reviews[i].recommend
  //   }
  //   let percentage = (recommends / this.state.reviews.length) * 100
  //   let percentageText = `${percentage}%`
  //   this.setState({
  //     recommend: percentageText,
  //   })
  // }

  checkForReco(data) {
    let posRecs = data.recommended['1'];
    let totalRecs = posRecs + data.recommended['0'];
    let percentage = Math.round((posRecs / totalRecs) * 100);
    let percentageText = `${percentage}%`;
    console.log(percentageText);
    this.setState({
      recommend: percentageText,
    });
  }

  // averageStarRating() {
  //   const { reviews } = this.state;
  //   let ratingSum = 0;
  //   for (let i = 0; i < reviews.length; i++) {
  //     ratingSum += reviews[i].rating;
  //   }
  //   if (ratingSum) {
  //     const averageRating = ratingSum / reviews.length;
  //     const starPercentage = (averageRating / 5) * 100;
  //     this.setState({
  //       starPercentage,
  //       averageRating,
  //     });
  //   }
  // }

  averageStarRating(data) {
    let ratings = data.ratings;
    let ratingsValues = Object.keys(ratings);
    let totalRating = 0;
    let numRating = 0;
    for (let i = 0; i < ratingsValues.length; i += 1) {
      totalRating += (ratingsValues[i] * ratings[ratingsValues[i]]);
      numRating += ratings[ratingsValues[i]];
    }
    console.log('total', totalRating);
    let averageRating = totalRating / numRating;
    console.log(averageRating);
    const starPercentage = (averageRating / 5) * 100;
    this.setState({
      starPercentage,
      averageRating,
    });
  }

  // updateEachStarBar() {
  //   const { reviews, stars } = this.state;
  //   let ratingCounter = 0;
  //   for (let i = 0; i < reviews.length; i++) {
  //     let currentRating = reviews[i].rating;
  //     for (let j = 0; j < stars.length; j++) {
  //       if (stars[j].name === currentRating) {
  //         ratingCounter++
  //         let oldState = stars;
  //         let updateState = stars[j].count += 1
  //         oldState[j].count = updateState;
  //         this.setState({
  //           stars: oldState,
  //         });
  //       }
  //     }
  //   }
  //   let barPercents = [];
  //   for (let k = 0; k < stars.length; k++) {
  //     let percentage = ((stars[k].count / ratingCounter) * 100).toFixed(1);
  //     barPercents.push(`${percentage}%`);
  //   }
  //   this.setState({
  //     barPercents,
  //   });
  // }

  updateEachStarBar(data) {
    const { reviews, stars } = this.state;
    let ratingCounter = 0;
    for (let i = 0; i < reviews.length; i++) {
      let currentRating = reviews[i].rating;
      for (let j = 0; j < stars.length; j++) {
        if (stars[j].name === currentRating) {
          ratingCounter++
          let oldState = stars;
          let updateState = stars[j].count += 1
          oldState[j].count = updateState;
          this.setState({
            stars: oldState,
          });
        }
      }
    }
    let barPercents = [];
    for (let k = 0; k < stars.length; k++) {
      let percentage = ((stars[k].count / ratingCounter) * 100).toFixed(1);
      barPercents.push(`${percentage}%`);
    }
    this.setState({
      barPercents,
    });
  }

  render() {
    let widthStyle = {
      width: `${this.state.starPercentage}%`,
    };
    let { barPercents } = this.state;
    let { hide5Stars, hide4Stars, hide3Stars, hide2Stars, hide1Stars, style } = this.props;
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
              barPercents={barPercents}
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
