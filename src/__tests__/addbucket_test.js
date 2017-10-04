import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';
import {spy, sinon} from 'sinon';
import moxios from 'moxios';

import AddBucket from '../containers/addbucket';
import AllBuckets  from '../containers/allbuckets';


describe('AddBucket component ', () => {
    let wrapper;
    let parent;
    let parent2;
    beforeEach( () => {
      moxios.install();

      parent= spy(AllBuckets.prototype,'onInputChange');
      parent2 = spy(AllBuckets.prototype, 'handleSubmit');
      wrapper = mount(<AddBucket onSearchTermChange={parent} onaddItem={parent2}/>);
      //check allbuckets for the is loading state
      wrapper.setState({isLoading: false});

    });

    afterEach(function () {
      moxios.uninstall();
      parent.restore();
      parent2.restore();
    });

    it('has table element' ,() => {
      expect(wrapper.find('table' ).length).to.equal(1);
    });

    it('has add bucketname field', ()=>{
      let input_bucketname = wrapper.find("#bucketname")
      expect(input_bucketname.length).to.equal(1);
      const mockUp = jest.fn();
      expect(input_bucketname.simulate('change', {mockUp}, {target: {value:"my bucket"}}));
    });

    it('has search input field', ()=>{
      let input_search = wrapper.find("#search_field")
      expect(input_search.length).to.equal(1);


    moxios.wait(function () {
     let request = moxios.requests.mostRecent()
     request.respondWith({
       status: 200,
       response: ['id': fitem.id, 'name': fitem.name,'user_id': fitem.username
       ]
     }).then(function () {

     });
    });

    const target  = {
      value : 3,
      id : "edit"
    }
    input_search.simulate('change', {target});
    expect(parent.called).to.equal(true);

    });

    it('has submit button for add bucket input field', ()=>{
      let input_button = wrapper.find("#buttonsubmit")
      expect(input_button.length).to.equal(0);


    moxios.wait(function () {
     let request = moxios.requests.mostRecent()
     request.respondWith({
       status: 200,
       response: ['id': fitem.id, 'name': fitem.name,'user_id': fitem.username
       ]
     }).then(function () {

     });
    });

    const target  = {
      value : "awesome bucket",
      id : "buttonsubmit"
    }
    input_button.simulate('submit', {target});
    expect(parent2.called).to.equal(true);

    });




  });
