import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';
import {spy, sinon} from 'sinon';
import moxios from 'moxios';

import SingleItem  from '../containers/singleitem';
import  PreviewBucket from '../containers/previewbucket';

describe('SingleItem component ', () => {
  let wrapper;
  let handleSubmit;
  let parent;
  let parentdelete;

  beforeEach( () => {
    moxios.install();
    const bucket= {item:{
      name: "awesoome",
      id:3}
    }
    parent = spy(PreviewBucket.prototype, 'handleItemSubmit');
    parentdelete = spy(PreviewBucket.prototype, 'handleItemdeleteSubmit');
    handleSubmit = spy(SingleItem.prototype, 'onshow');
    wrapper = mount(<SingleItem {...bucket} editItem={parent} deleteItem={parentdelete} />);
  });


  afterEach(function () {
    moxios.uninstall();
    handleSubmit.restore();
    parent.restore();
    parentdelete.restore();
  });

  it('shows edit modal can be displayed', () => {
    let editbutton = wrapper.find(".glyphicon .glyphicon-edit");
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
    expect(parent.called).to.equal(false);

  });
  it('shows delete glyphicon', () => {
    let deletebutton = wrapper.find("#deleteitem");
    expect(deletebutton.length).to.equal(1);

    const target  = {
      value : 3,
      id : "edit"
    }
    deletebutton.simulate('click', {target});



  });

it('shows table element', () => {
  let table = wrapper.find(".table .table-hover");
  expect(table.length).to.equal(1);

});

});
