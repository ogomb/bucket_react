import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';
import {spy, sinon} from 'sinon';
import moxios from 'moxios';

import AllBuckets  from '../containers/allbuckets';

describe('AllBuckets component ', () => {
    let wrapper;
    let parent;
    beforeEach( () => {
        moxios.install();
        const bucket= {bucket:{
          name: "awesoome",
          id:3}
        }
        wrapper = mount(<AllBuckets {...bucket}/>);

    });

    afterEach( ()=> {
      moxios.uninstall();
    });

    it('has a div element ' ,() => {
      let clickableitem = wrapper.find('.allbuckets');
      expect(clickableitem.length).to.equal(1);



    });
    it('has clickable list items element' ,() => {
      let item = wrapper.find('.list-group .col-md-6');
      expect(item.length).to.equal(1);

      const target  = {
        value : 3,
        id : "edit"
      }

      item.simulate('click', {target});
    });




});
