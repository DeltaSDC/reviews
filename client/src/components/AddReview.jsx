import React from 'react';
import AddReviewTable from './AddReviewTable';
import AddReviewStars from './AddReviewStars';

class AddReview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      // productName: '',
      currentBodyLength: 0,
      photoShowId: '',
      photoShowIds: [],
      rating: 0,
      summary: '',
      body: '',
      recommend: '',
      name: '',
      email: '',
      photos: [],
      characteristics: {},
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeTextBody = this.onChangeTextBody.bind(this);
    this.submitImage = this.submitImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.updateReviewCharacteristics = this.updateReviewCharacteristics.bind(this);
  }

  // componentDidMount() {
  //   fetch('http://52.26.193.201:3000/products/30/')
  //     .then(response => response.json())
  //     .then(data => this.setState({
  //       productName: data.name
  //     }))
  //     .catch(err => console.log(err));
  // }

  onSubmit(e) {
    e.preventDefault();
    let { rating, summary, body, recommend, name, email, photos } = this.state;
    console.log('submitted', rating, summary, body, recommend, name, email, photos, this.state[1], this.state[2], this.state[3], this.state[4], this.state[5], this.state[6]);
    let charObj = {};
    for (let i = 1; i < 7; i += 1) {
      if (this.state[i]) {
        charObj[i] = this.state[i];
      }
    }
    console.log(charObj);
    let data = {
      rating,
      summary,
      body,
      recommend,
      name,
      email,
      photos,
      characteristics: charObj,
    };
    console.log(data);
    fetch('http://localhost:3004/reviews/15', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('success', data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  onChangeTextBody(e) {
    if (e.target.value.length <= 50) {
      this.setState({
        currentBodyLength: e.target.value.length,
      });
    }
    console.log('change', e.target.value);
    this.setState({
      body: e.target.value,
    });
  }

  handleChange(event) {
    // console.log('change', event.target.value);
    const key = event.target.name;
    const value = event.target.value;
    this.setState({
      [key]: value,
    });
  }

  submitImage(e) {
    this.setState({
      photoShowId: e.target.files[0],
    });
    // let fileExt = e.target.files[0].name.split('.')[1];
    // let okExtensions = ['png', 'jpeg', 'jpg', 'gif', 'bmp', 'jfif'];
    // if (!okExtensions.includes(fileExt)) {
    //   alert("Sorry, you can only upload images! Allowed: png, jpeg, gif, bmp, jfif")
    //   return;
    // }
    if (this.state.photoShowIds.length < 5 && e.target.files[0]) {
      let addImageArr = this.state.photoShowIds;
      addImageArr.push(URL.createObjectURL(e.target.files[0]));
      this.setState({
        photoShowIds: addImageArr,
      });
    }
  }

  updateRating(rating) {
    this.setState({
      rating,
    });
  }

  updateReviewCharacteristics(characteristics) {
    // console.log('received this char', characteristics);
    let char = Object.keys(characteristics);
    this.setState({
      [char]: parseInt(characteristics[char]),
    });
  }

  render() {
    // if(!this.props.show) {
    //   return null;
    // }
    return (
        <div className="add-review-module">
          <form>
        <button type="button" className="more-reviews-button" data-toggle="modal" data-target="#addReviewModalCenter">
            Add Review
        </button>
        <div className="modal fade bd-example-modal-xl" id="addReviewModalCenter" tabIndex="-1" role="dialog" aria-labelledby="addReviewModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title" id="exampleModalLongTitle">
                Write your review
                {/* <div className="modal-subtitle">{this.state.productName}</div> */}
              </div>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-star-rating">* Rate the product 1-5:</div>
              <AddReviewStars updateRating={this.updateRating} />
              <br></br>
              <div className="modal-recommend">* Would you recommend this product?</div>
              <table className="table table-sm">
                <thead>
                </thead>
                <tbody>
                  <tr>
                  <th scope="row">
                    Yes
                  </th>
                    <td>
                      <input className="form-check-input" type="radio" value="true" id="yesRadio" name="recommend" onChange={this.handleChange} required></input>
                    </td>
                  </tr>
                  <tr className="YesNoRadio-parent">
                  <th scope="row">
                    No
                  </th>
                    <td>
                      <input className="form-check-input" type="radio" value="false" id="noRadio" name="recommend" onChange={this.handleChange} required></input>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br></br>
              <p>* Please rate the product on the following qualities.</p>
              <div className="table-responsive">
                <AddReviewTable updateReviewCharacteristics={this.updateReviewCharacteristics} />
              </div>
              <ul className="list-group">
                <li className="list-group-item">
                <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <label className="review-message-title" htmlFor="exampleFormControlTextarea1"></label>
                  <span className="input-group-text" id="inputGroup-sizing-sm">Review Title</span>
                </div>
                <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="summary" value={this.state.summary} onChange={this.handleChange}></input>
              </div>
                </li>
                <li className="list-group-item">
                <div className="form-group">
                <textarea placeholder="* Please enter your review..." onChange={this.onChangeTextBody} minLength="50" className="form-control" id="exampleFormControlTextarea1" rows="3" name="body" value={this.state.body} required></textarea>
                <span className="minimum-message">{ (this.state.currentBodyLength === 50) ? <div>Minimum reached</div> : <div>* Minimum required characters left: {50 - this.state.currentBodyLength}</div>}</span>
              </div>
                </li>
                <li className="list-group-item">
                <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">* Nickname</span>
                </div>
                <input type="text" className="form-control" placeholder="Example: jackson11!" aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="name" value={this.state.name} onChange={this.handleChange} required></input>
              </div>
              <span className="email-privacy">* For privacy reasons, do not use your full name or email address.</span>
                </li>
                <li className="list-group-item">
                <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">* Email</span>
                </div>
                <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" name="email" value={this.state.email} onChange={this.handleChange} required></input>
              </div>
                </li>
                <li className="list-group-item">
                  <div className="modal-subtitle">Image upload:</div>
                    <div className="form-group">
                    <label className="btn btn-secondary">
                      Browse <input onChange={this.submitImage} id="upload-button" type="file" hidden></input>
                    </label>
                    {this.state.photoShowIds.map((id, key) =>
                      <div key={key} id="upload_prev">
                        <img id="photoShowId" src={id} width="50%" height="50%" style={ id === '' ? { display:'none'} : {display : 'block'} }/>
                      </div>
                    )}
                    </div>
                </li>

              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="close-button btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" onClick={this.onSubmit} className="btn btn-primary">Submit review</button>
            </div>
          </div>
        </div>
      </div>
      </form>
      </div>

    )
  }
}

export default AddReview;