import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';


import NotFound from '../containers/notfound';


describe('Not found Page', () => {
    let wrapper;
    beforeEach( () => {
      wrapper = mount(<NotFound />);
    });

    it('has div with correct class' ,() => {
      expect(wrapper.find('.NotFound' ).length).to.equal(1);
    });

    it('has text with the brand name' ,() => {
      expect(wrapper.find('Sorry, page not found!' ));
    });
  });
