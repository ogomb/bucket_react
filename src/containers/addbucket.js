import React, { Component } from 'react';
import { FormGroup,FormControl,ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/loaderbutton";
import CustomToast from "../components/customalerts";
import { toast } from 'react-toastify';
import axios from 'axios';
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


  handleSubmit = event => {
    event.preventDefault();
    this.setState({isLoading : true});

    const load = {
      'name' : this.state.bucketname,
    };

    axios({
              url:  'http://127.0.0.1:5000/bucketlists',
              method: "POST",
              data: load,
              headers : {
                'Authorization' :'Bearer '+window.localStorage.getItem('token'),
                'content_type' :'application/json'
              }

            })
          .then((response) => {
                console.log(response);
                toast.success("Created  "+ response.data.name);
                this.setState({isLoading : false});
            }
          )
          .catch(error => {
            //alert(error)
            toast.error(error.response.data.message);
            this.setState({isLoading : false});

          })

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
                      value={this.state.bucketname}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
              </td>
              <td>
                <LoaderButton
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
