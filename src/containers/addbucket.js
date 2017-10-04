import React, { Component } from 'react';
import { FormGroup,FormControl } from "react-bootstrap";
import LoaderButton from "../components/loaderbutton";
import CustomToast from "../components/customalerts";
import "./addbucket.css";

class BucketAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      bucketname: "",
      searchedTerm : " "

    };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  validateForm() {
    return this.state.bucketname.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

onInputChange(term){
  this.setState({searchedTerm: term});
  this.props.onSearchTermChange(term);
}


  handleSubmit (event) {
    event.preventDefault();
    this.setState({isLoading : true});
    this.props.onaddItem(this.state.bucketname);
    this.setState({isLoading : false});
  }

  render (){
    return(
      <div>
        <CustomToast/>
        <table>
          <tr>
            <form onSubmit={this.handleSubmit}>
              <td>
                <FormGroup controlId="bucketname" bsSize="large">
                    <FormControl
                      type="text"
                      placeholder="Bucket Description"
                      value={this.state.bucketname}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
              </td>
              <td>
                <LoaderButton
                  id="buttonsubmit"
                  block
                  bsSize="large"
                  disabled={!this.validateForm()}
                  type="submit"
                  isLoading={this.state.isLoading}
                  text="Add Bucket"
                  loadingText="Adding…"
                />

                </td>
                </form>
              <td style={{ "padding-bottom":'15px'}}>
              <input className="form-control input-lg"
                id="search_field"
                type="text"
                placeholder="Search ..."
                onChange = {event => this.onInputChange(event.target.value)}
              />
              </td>
            </tr>
          </table>

      </div>
    )

  }
}

export default BucketAdd;
