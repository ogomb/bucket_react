import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';
import {spy, sinon} from 'sinon';
import moxios from 'moxios';

import TestUtils from 'react-addons-test-utils';


import Login from '../containers/login';


describe('Login Page', () => {
    let wrapper;
    beforeEach( () => {
      moxios.install();
      wrapper = mount(<Login />);
    });
    afterEach(function () {
      moxios.uninstall();

    });

    it('has div with correct class' ,() => {
      expect(wrapper.find('Login' ).length).to.equal(1);
    });

    it('shows username is entered', ()=>{
      let input_username = wrapper.find("#username")
      expect(input_username.length).to.equal(1);

      const target  ={
        value : "awesome",
        id : "username"
      }

      input_username.simulate('change', {target});
      expect(wrapper.state().username).to.equal(target.value);
    });

    it('shows username is entered', () => {
      let input_password = wrapper.find("#password");
      expect(input_password.length).to.equal(1);

      const target  ={
        value : "awesome",
        id : "password"
      }

      input_password.simulate('change', {target});
      expect(wrapper.state().password).to.equal(target.value);

    });

    it('shows password is entered', () => {

    });

    it('allows button to be clicked', () => {
      let loginbutt = wrapper.find("#loginbutt");
      const target  ={
        value : "awesome",
        id : "loginbutt"
      }

      loginbutt.simulate('click', {target});

    });

  });
