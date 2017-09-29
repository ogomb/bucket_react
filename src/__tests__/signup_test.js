import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';

import Signup from '../containers/signup';

describe('Sign Page', () => {
    let wrapper;
    beforeEach( () => {
      wrapper = mount(<Signup />);
    });

    it('has div with correct class' ,() => {
      expect(wrapper.find('Signup' ).length).to.equal(1);
    });

    it('has username and password fields', ()=>{
      let input_username = wrapper.find("#username")
      expect(input_username.length).to.equal(1);
      const mockUp = jest.fn();
      expect(input_username.simulate('change', {mockUp}, {target: {value:"awesome"}}));
    });

    it('shows username is entered', () => {
      let input_password = wrapper.find("#password");
      const mockUp = jest.fn();
      expect(input_password.length).to.equal(1);
      expect(input_password.simulate('change', {mockUp}, {target: {value: "awesome"}}));
    });

    it('shows email is entered', () => {
      let input_email = wrapper.find("#email");
      const mockUp = jest.fn();
      expect(input_email.length).to.equal(1);
      expect(input_email.simulate('change', {mockUp}, {target: {value: "awesome@gmail.com"}}));
    });

  });
