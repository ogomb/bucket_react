import React, { Component } from 'react';
import SingleBucket from './singlebucket';
import BucketAdd from './addbucket';
import PreviewBucket from './previewbucket';
import axios from 'axios';

import { toast } from 'react-toastify';
import CustomToast from "../components/customalerts";

class AllBuckets extends Component {
  constructor(props){
    super(props);

    this.state ={
      mybucketlists : [],
      selectedBucket : null,
      searchedBuckets : null
    };

  }

componentDidMount(){
  this.getmybuckets();
}

onInputChange(term){
  axios({
            url:  `http://127.0.0.1:5000/bucketlists/?q=${term}`,
            method: "get",
            headers : {
              'Authorization' :'Bearer '+window.localStorage.getItem('token'),
              'content_type' :'application/json'
            }

          })
        .then((response) => {

          if(response.data.message){
              toast.error("no buckets found");
              this.setState({searchedBuckets: null});
              console.log(this.state.searchedBuckets)
          }
          else{
            this.setState({searchedBuckets: response.data})
          }
        })

        .catch(error => {
          console.log(error);
          this.setState({searchedBuckets: null});

        });
}

  getmybuckets =() =>{
          axios({
              url : 'http://localhost:5000/bucketlists',
              method: "GET",
              headers: {
                  'Authorization' :"Bearer " +window.localStorage.getItem("token"),
                  'content_type':"application/json"
              }
          })
          .then(response => this.setState({
                      mybucketlists :response.data.result
              })
          )
          .catch((error) => {
            if (error.response) {
              console.log(error);
            }
          });
      }

  onSelectBucket = (id) => {
     let buckets = this.state.mybucketlists;
     let bucket = buckets.find((bucket) => bucket.id === id);
     this.setState({selectedBucket: bucket});
  }

  render(){
    const {mybucketlists: allBuckets, selectedBucket, searchedBuckets } = this.state;
    return (
       <div className="allbuckets">
       <div className="row">
       <div className="col-md-6">
        <BucketAdd onSearchTermChange={term => this.onInputChange(term)}/>
        </div>
        </div>
          { searchedBuckets ? <div className="list-group col-md-6">
            {searchedBuckets.map(function(bucket, index) {
              return (
                <SingleBucket key={index} id={index} bucket = {bucket} onSelectBucket= {this.onSelectBucket}/>
              )
            },this)}
          </div> :
          <div className="list-group col-md-6">
            {allBuckets.map(function(bucket, index) {
              return (
                <SingleBucket key={index} id={index} bucket = {bucket} onSelectBucket= {this.onSelectBucket}/>
              )
            },this)}
          </div>}
          {selectedBucket && <PreviewBucket bucket={selectedBucket}/>}
        </div>
    )
  }
}

export default AllBuckets;
