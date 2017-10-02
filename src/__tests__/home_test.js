import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';


import Home from '../containers/home';


describe('Home Page', () => {
    let wrapper;
    beforeEach( () => {
      wrapper = mount(<Home />);
    });

    it('has div with correct class' ,() => {
      expect(wrapper.find('Home' ).length).to.equal(1);
    });
    it('has text with the brand name' ,() => {
      expect(wrapper.find('Bucket List' ));
    });
  });
