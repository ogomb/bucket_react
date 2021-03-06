import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

class SingleItem extends Component {
  constructor(props){
    super(props);

    this.state={
      alert: null
    };
  }
ondelete(id, name){
  let bucketid = this.props.bucketid;
  this.props.deleteItem(id, name, bucketid);

}

onshow(id, name){
  const editAlert = (id, name) => (
    <SweetAlert
        customClass="editClass"
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
  this.props.editItem(value, id, bucketid);
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
            <a onClick={() => this.ondelete(item.id,item.name)} className='btn btn-default' id="deleteitem">
              <i className='glyphicon glyphicon-trash' aria-hidden='true'></i>
            </a>{this.state.alert}

          </td>
        </tr>
      </table>

        )
      }
}

export default SingleItem;
