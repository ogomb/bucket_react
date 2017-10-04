import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect } from 'chai';
import {spy} from 'sinon';
import moxios from 'moxios';

import  PreviewBucket from '../containers/previewbucket';
import AllBuckets  from '../containers/allbuckets';

describe('PreviewBucket component ', () => {
  let wrapper;
  let handleSubmit;
  let handleSubmit2;
  let handleDelete;
  let handleEditBucket;
  let onInputChange;

  beforeEach( () => {
    moxios.install();
    const bucket= {bucket:{
      name: "awesoome",
      id:3}
    }
    handleSubmit = spy(PreviewBucket.prototype, 'onshowEdit');
    onInputChange = spy(PreviewBucket.prototype, 'onInputChange');
    handleSubmit2 = spy(PreviewBucket.prototype, 'handleSubmit');
    handleDelete = spy(AllBuckets.prototype, 'handleDelete');
    handleEditBucket = spy(AllBuckets.prototype, 'handleEditBucket');
    wrapper = mount(<PreviewBucket {...bucket} editBucket={handleEditBucket} deleteBucket={handleDelete} />);
  });


  afterEach(function () {
    moxios.uninstall();
    handleSubmit.restore();
    handleSubmit2.restore();
    handleDelete.restore();
    handleEditBucket.restore();
    onInputChange.restore();
  })
  it('shows edit modal can be displayed', () => {
    let editbutton = wrapper.find("#edit");
    expect(editbutton.length).to.equal(1);

    const target  = {
      value : 3,
      id : "edit"
    }
    editbutton.simulate('click', {target});
    expect(handleSubmit.called).to.equal(true);

    let popup = wrapper.find('div').find('.editClass').first();
    expect(popup.length).to.equal(1);

    moxios.wait(function () {
     let request = moxios.requests.mostRecent()
     request.respondWith({
       status: 200,
       response: ['id': fitem.id, 'name': fitem.name,'user_id': fitem.username
       ]
     }).then(function () {

     });
   });

    popup.simulate('submit', {target});
    expect(handleEditBucket.called).to.equal(false);

  });
  it('shows delete button ', () => {
    let deletebutton = wrapper.find("#delete");
    expect(deletebutton.length).to.equal(1);

    const target  = {
      value : 3,
      id : "delete"
    }

    moxios.wait(function () {
     let request = moxios.requests.mostRecent()
     request.respondWith({
       status: 200,
       response: ['id': fitem.id, 'name': fitem.name,'user_id': fitem.username
       ]
     }).then(function () {

     });
    });
    deletebutton.simulate('click', {target});
    expect(handleDelete.called).to.equal(true);
  });
  it('shows add item button ', () => {
    let addbutton = wrapper.find("#additembutton");
    expect(addbutton.length).to.equal(1);

    const target  = {
      value : 'an item',
      id : "additembutton"
    }
    moxios.wait(function () {
     let request = moxios.requests.mostRecent()
     request.respondWith({
       status: 200,
       response: ['id': fitem.id, 'name': fitem.name,'user_id': fitem.username
       ]
     }).then(function () {

     });
    });
    addbutton.simulate('submit', {target});

  });

  it('shows item search input field ', () => {
    let searchfield = wrapper.find("#searchitem");
    expect(searchfield.length).to.equal(1);

    const target  = {
      value : 'an item',
      id : "additembutton"
    }
    moxios.wait(function () {
     let request = moxios.requests.mostRecent()
     request.respondWith({
       status: 200,
       response: ['id': fitem.id, 'name': fitem.name,'user_id': fitem.username
       ]
     }).then(function () {

     });
    });
    searchfield.simulate('change', {target});

  });

  it('shows item search input field ', () => {
    let input_field = wrapper.find("#itemname");
    expect(input_field.length).to.equal(1);

    const target  = {
      value : 'an item',
      id : "additembutton"
    }

    moxios.wait(function () {
     let request = moxios.requests.mostRecent()
     request.respondWith({
       status: 200,
       response: ['id': fitem.id, 'name': fitem.name,'user_id': fitem.username
       ]
     }).then(function () {

     });
    });
    input_field.simulate('change', {target});

  });

  });
