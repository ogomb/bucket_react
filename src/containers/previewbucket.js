import React, { Component } from 'react';
import { FormGroup,FormControl } from "react-bootstrap";
import LoaderButton from "../components/loaderbutton";
import axios from 'axios';
import { toast } from 'react-toastify';
import CustomToast from "../components/customalerts";
import SingleItem from './singleitem';
import SweetAlert from 'react-bootstrap-sweetalert';

import "./previewbucket.css";
class PreviewBucket extends Component {
  constructor(props){
    super(props);

    this.state ={
      isLoading: false,
      itemname: "",
      myitems:[],
      searchedList : null,
      nameofBucket : "",
      idofbucket :""

    };
    this.getmyitems = this.getmyitems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleItemSubmit = this.handleItemSubmit.bind(this);
    this.handleItemdeleteSubmit = this.handleItemdeleteSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    this.getmyitems = this.getmyitems.bind(this);
  }
  validateForm() {
    return this.state.itemname.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  componentDidMount(){
    this.getmyitems(this.props.bucket.id);
  }


componentWillReceiveProps(nextProps){
  if (this.props.bucket.id !== nextProps.bucket.id){
    this.getmyitems(nextProps.bucket.id);
  }
}

  getmyitems =(id) =>{
          axios({
              url : 'http://localhost:5000/bucketlists/'+ id +"/item",
              method: "GET",
              headers: {
                  'Authorization' :"Bearer " +window.localStorage.getItem("token"),
                  'content_type':"application/json"
              }
          })
          .then(response => { this.setState({
                      myitems: response.data.result
              })
            }
          )
          .catch((error)=>{
            if (error.response) {
              console.log(error);
            }
          });
      }
  handleDelete(id, name){
    this.props.deleteBucket(id, name);
  }

  addItem = event =>{
    const {name, id } = this.props.bucket;
    this.setState({isLoading : true});

    const load = {
      'itemname' : this.state.itemname,
      'done': false
    };

    axios({
              url:  'http://127.0.0.1:5000/bucketlists/'+this.props.bucket.id+'/item',
              method: "POST",
              data: load,
              headers : {
                'Authorization' :'Bearer '+window.localStorage.getItem('token'),
                'content_type' :'application/json'
              }

            })
          .then((response) => {
                  toast.success("Created  "+ response.data.name);
                  this.setState({isLoading : false});
                  this.getmyitems(id);

            }
          )
          .catch(error => {
            //alert(error)
            toast.error(error.response.data.message);
            this.setState({isLoading : false});

          })
  }
  onshowEdit(id, name){
    const editAlert = (id, name) => (
      <SweetAlert
          input
          showCancel
  	      cancelBtnBsStyle="default"
          title= "Edit bucket name:"
          onConfirm={(inputValue) => this.handleSubmit(inputValue, id)}
          onCancel={ () => this.hideAlert()}
          >

      </SweetAlert>
    );

    this.setState({alert : editAlert(id, name) });
  }

  handleSubmit(value, id){
    const load = {
      'name' : value
    };
    axios({
              url:  `http://127.0.0.1:5000/bucketlists/${id}`,
              method: "PUT",
              data: load,
              headers : {
                'Authorization' :'Bearer '+window.localStorage.getItem("token"),
                'content_type':"application/json"
              }

            })
          .then((response) => {
                this.getmyitems(id);
                this.props.bucket.name = value;
                this.setState({nameofBucket: value});
                this.props.editBucket(id, value);


            }
          )
          .catch(error => {
            //alert(error)
            
          });

    this.hideAlert();

  }
  hideAlert(){
    this.setState({alert : null});
  }
  onRecieveInput(value){
    console.log(value);

  }
  onInputChange(term,id){
    axios({
        url : `http://localhost:5000/bucketlists/${id}/item?q=${term}`,
        method: "GET",
        headers: {
            'Authorization' :"Bearer " +window.localStorage.getItem("token"),
            'content_type':"application/json"
        }
    })
    .then(response => {
      if(response.data.message){
        toast.error(response.data.message);
        //this.setState({ searchedList: []});
      }
      else {
        this.setState({ searchedList: response.data.result});
      }
    })
    .catch((error)=>{
      if (error.response) {
       
      }
    });

  }

  handleItemSubmit(value, id, bucketid){
    const load = {
      'itemname' : value,
      'done': 'True'
    };
    axios({
              url:  `http://127.0.0.1:5000/bucketlists/${bucketid}/item/${id}`,
              method: "PUT",
              data: load,
              headers : {
                'Authorization' :'Bearer '+window.localStorage.getItem("token"),
                'content_type':"application/json"
              }

            })
          .then((response) => {
               
                this.getmyitems(bucketid);

            }
          )
          .catch(error => {
            //alert(error)
           
          });
  }

  handleItemdeleteSubmit(id, name, bucketid){
    axios({
              url:  `http://127.0.0.1:5000/bucketlists/${bucketid}/item/${id}`,
              method: "DELETE",
              headers : {
                'Authorization' :'Bearer '+window.localStorage.getItem("token"),
                'content_type':"application/json"
              }

            })
          .then((response) => {
               
                this.getmyitems(bucketid);

            }
          )
          .catch(error => {
            //alert(error)
           
          });

  }

  render(){
    const {myitems: allitems, searchedList } = this.state;
    const {name, id } = this.props.bucket;
    return (

      <div className="col-md-6">

        <CustomToast/>
        <div className="panel panel-default">
          <div className="panel-heading clearfix" >
            <h3 className="panel-title pull-left"> {this.props.bucket.name}</h3>
            <div className="btn-group pull-right">
              <a  className="btn btn-default btn-sm" onClick={() => this.onshowEdit(id,name)}>Edit</a>{this.state.alert}
              <a  className="btn btn-default btn-sm" onClick= {() => this.handleDelete(id, name)}>Delete</a>{this.state.alert}
            </div>
          </div>
            <div className="panel-body">
            <table>
              <tr>
                <form onSubmit={this.addItem}>
                  <td>
                    <FormGroup controlId="itemname" bsSize="large">
                        <FormControl
                          type="text"
                          placeholder="Item Description"
                          value={this.state.itemname}
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
                      text="Add Item"
                      loadingText="Adding…"
                    />
                  </td>
                  </form>
                  <td style={{ "padding-bottom":'15px'}}>
                  <input className="form-control input-lg"
                    type="text"
                    placeholder="Search .."
                    onChange = {event => this.onInputChange(event.target.value,id)}
                  />
                  </td>

                </tr>
              </table>
              <hr/>
              { searchedList ?
                <div className="list-group">
                {searchedList.map(function(item, index) {
                  return (
                    <SingleItem key={index} id={index} item = {item} bucketid ={id}onSelectItem= {this.onSelectItem}
                            editItem ={(value, id, bucketid) => this.handleItemSubmit(value, id, bucketid)}
                            deleteItem={(id, name, bucketid) => this.handleItemdeleteSubmit(id, name, bucketid)} />
                  )
                },this)}
              </div> :
                <div className="list-group">
                {allitems.map(function(item, index) {
                  return (
                    <SingleItem key={index} id={index} item = {item} bucketid ={id}onSelectItem= {this.onSelectItem}
                              editItem ={(value, id, bucketid) => this.handleItemSubmit(value, id, bucketid)}
                              deleteItem={(id, name, bucketid) => this.handleItemdeleteSubmit(id, name, bucketid)}/>
                  )
                },this)}
              </div>}

              </div>
            </div>
        </div>
    )
  }
}
export default PreviewBucket;
