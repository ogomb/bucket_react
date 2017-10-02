import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import CustomToast from "../components/customalerts";
import { toast } from 'react-toastify';
import axios from 'axios';

class SingleItem extends Component {
  constructor(props){
    super(props);

    this.state={
      alert: null
    };
  }
ondelete(id, name){
  let bucketid = this.props.bucketid;

  axios({
            url:  `http://127.0.0.1:5000/bucketlists/${bucketid}/item/${id}`,
            method: "DELETE",
            headers : {
              'Authorization' :'Bearer '+window.localStorage.getItem("token"),
              'content_type':"application/json"
            }

          })
        .then((response) => {
              console.log("Created  "+ response.data.name);

          }
        )
        .catch(error => {
          //alert(error)
          console.log(error.response);
        });

}

onshow(id, name){
  const editAlert = (id, name) => (
    <SweetAlert
        input
        showCancel
	      cancelBtnBsStyle="default"
        title= "Edit item name:"
        onConfirm={(inputValue) => this.handleSubmit(inputValue, id)}
        onCancel={ () => this.hideAlert()}
        >
        Change the item name: {name}
    </SweetAlert>
  );

  this.setState({alert : editAlert(id, name) });
}

hideAlert(){
  this.setState({alert : null});
}
handleSubmit(value, id){
  let bucketid = this.props.bucketid;
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
              console.log("Created  "+ response.data.name);

          }
        )
        .catch(error => {
          //alert(error)
          console.log(error.response);
        });


  this.hideAlert();

}

render(){
  let item = this.props.item;
  return(

      <table className="table table-hover">
        <tr>
          <td width="70%">
             {item.name}
          </td>
          <td>
            <a onClick={() => this.onshow(item.id,item.name)} className='btn btn-default'>
              <i className='glyphicon glyphicon-edit' aria-hidden='true'></i>
            </a>{this.state.alert}
          </td>
          <td>
            <a onClick={() => this.ondelete(item.id,item.name)} className='btn btn-default'>
              <i className='glyphicon glyphicon-trash' aria-hidden='true'></i>
            </a>{this.state.alert}

          </td>
        </tr>
      </table>

        )
      }
}

export default SingleItem;
