import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';
import {spy, sinon} from 'sinon';
import moxios from 'moxios';

import SingleBucket from '../containers/singlebucket';
import AllBuckets  from '../containers/allbuckets';


describe('SingleBucket component ', () => {
    let wrapper;
    let parent;

    beforeEach( () => {
      moxios.install();
      const bucket= {bucket:{
        name: "awesoome",
        id:3}
      }

      wrapper = mount(<SingleBucket {...bucket } />);


    });

    afterEach(function () {
      moxios.uninstall();
    

    });


    it('has clickable list items element' ,() => {
      let clickableitem = wrapper.find('.list-group-item');
      expect(clickableitem.length).to.equal(1);


    });

    });
