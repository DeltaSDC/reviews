import React, { Component } from 'react';

class AddReviewTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: false,
      width: false,
      comfort: false,
      quality: false,
      length: false,
      fit: false,
      characteristics: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.hideRows = this.hideRows.bind(this);
    this.updateReviewCharacteristics = this.props.updateReviewCharacteristics.bind(this);
  }

  componentDidMount() {
    fetch('reviews/15/meta')
      .then(res => res.json())
      .then((data) => {
        this.hideRows(data);
      });
  }

  handleClick(e) {
    const characteristics = {
      size: 1,
      width: 2,
      comfort: 3,
      quality: 4,
      length: 5,
      fit: 6,
    };
    let rating = e.target.value;
    // console.log('char rating', rating);
    let char = e.target.name;
    char = characteristics[char];
    // console.log('char id', char);
    let charObj = {
      [char]: rating,
    };
    // console.log(charObj);
    // this.setState({
    //   characteristics: charObj,
    // });
    this.updateReviewCharacteristics(charObj);
  }

  hideRows(data) {
    let dataKeys = Object.keys(data.characteristics);
    // console.log(dataKeys)
    let stateKeys = Object.keys(this.state);
    // console.log(stateKeys)
    for (let i = 0; i < dataKeys.length; i += 1) {
      if (stateKeys.includes(dataKeys[i].toLowerCase())) {
        this.setState({
          [dataKeys[i].toLowerCase()]: true,
        });
      }
    }
  }

  render() {
    let { size, width, comfort, quality, length, fit } = this.state;
    return (
      <table className="table table-lg">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr style={ size ? {display: 'block'} : {display : 'none'} }>
            <th scope="row">Size</th>
            <td>
            {/*one checkbox */}
            <div className="form-check">
              <input className="form-check-input" type="radio" value="1" id="materialUnchecked" name="size" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  A size too wide
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="2" id="materialUnchecked" name="size" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  1/2 a size too big
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="3" id="materialUnchecked" name="size" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Perfect
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="4" id="materialUnchecked" name="size" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  1/2 a size too small
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="5" id="materialUnchecked" name="size" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  A size too small
                </label>
            </div>
            </td>
          </tr>
          <tr style={ width ? {display: 'block'} : {display : 'none'} }>
            <th scope="row">Width</th>
            <td>
            {/*one checkbox */}
            <div className="form-check">
              <input className="form-check-input" type="radio" value="1" id="materialUnchecked" name="width" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Too wide
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="2" id="materialUnchecked" name="width" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Slightly wide
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="3" id="materialUnchecked" name="width" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Perfect
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="4" id="materialUnchecked" name="width" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Slightly narrow
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="5" id="materialUnchecked" name="width" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Too narrow
                </label>
            </div>
            </td>
          </tr>
          <tr style={ comfort ? {display: 'block'} : {display : 'none'} }>
          <th scope="row">Comfort</th>
            <td>
            {/*one checkbox */}
            <div className="form-check">
              <input className="form-check-input" type="radio" value="1" id="materialUnchecked" name="comfort" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Perfect
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="2" id="materialUnchecked" name="comfort" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Comfortable
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="3" id="materialUnchecked" name="comfort" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Ok
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="4" id="materialUnchecked" name="comfort" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Slightly uncomfortable
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="5" id="materialUnchecked" name="comfort" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Uncomfortable
                </label>
            </div>
            </td>
          </tr>
          <tr style={ quality ? {display: 'block'} : {display : 'none'} }>
            <th scope="row">Quality</th>
            <td>
            {/*one checkbox */}
            <div className="form-check">
              <input className="form-check-input" type="radio" value="1" id="materialUnchecked" name="quality" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Perfect
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="2" id="materialUnchecked" name="quality" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Pretty great
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="3" id="materialUnchecked" name="quality" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  What I expected
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="4" id="materialUnchecked" name="quality" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Below average
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="5" id="materialUnchecked" name="quality" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Poor
                </label>
            </div>
            </td>
          </tr>
          <tr style={ length ? {display: 'block'} : {display : 'none'} }>
            <th scope="row">Length</th>
            <td>
            {/*one checkbox */}
            <div className="form-check">
              <input className="form-check-input" type="radio" value="1" id="materialUnchecked" name="length" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Runs long
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="2" id="materialUnchecked" name="length" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Runs slightly long
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="3" id="materialUnchecked" name="length" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Perfect
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="4" id="materialUnchecked" name="length" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Runs slightly short
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="5" id="materialUnchecked" name="length" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Runs short
                </label>
            </div>
            </td>
          </tr>
          <tr style={ fit ? {display: 'block'} : {display : 'none'} }>
            <th scope="row">Fit</th>
            <td>
            {/*one checkbox */}
            <div className="form-check">
              <input className="form-check-input" type="radio" value="1" id="materialUnchecked" name="fit" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Runs long
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="2" id="materialUnchecked" name="fit" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Runs slightly long
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="3" id="materialUnchecked" name="fit" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Perfect
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="4" id="materialUnchecked" name="fit" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Runs slightly tight
                </label>
            </div>
            </td>
            <td>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="5" id="materialUnchecked" name="fit" onClick={this.handleClick}></input>
                <label className="form-check-label" htmlFor="materialUnchecked">
                  Runs tight
                </label>
            </div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default AddReviewTable;
