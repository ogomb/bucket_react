import React, { Component } from 'react';

class SingleBucket extends Component {

render(){
  let bucket = this.props.bucket;
  let onSelectBucket = this.props.onSelectBucket;
  return(
            <a href="#" className="list-group-item" onClick={()=>onSelectBucket(bucket.id)}> {bucket.name}</a>
        )
      }
}

export default SingleBucket;
