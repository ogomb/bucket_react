import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';
import {spy, sinon} from 'sinon';
import moxios from 'moxios';

import Signup from '../containers/signup';

describe('Sign Page', () => {
    let wrapper;
    beforeEach( () => {
      moxios.install();
      wrapper = mount(<Signup />);
    });

    afterEach(function () {
      moxios.uninstall();

    });

    it('has div with correct class' ,() => {
      expect(wrapper.find('Signup' ).length).to.equal(1);
    });

    it('has username and password fields', ()=>{
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
      const target  ={
        value : "awesome",
        id : "password"
      }

      input_password.simulate('change', {target});
      expect(wrapper.state().password).to.equal(target.value);
    });

    it('shows email is entered', () => {
      let input_email = wrapper.find("#email");
      const target  ={
        value : "awesome",
        id : "email"
      }

      input_email.simulate('change', {target});
      expect(wrapper.state().email).to.equal(target.value);
    });

    it('allows button to be clicked', () => {
      let signupbutton = wrapper.find("#sigupbutt");
      const target  ={
        value : "awesome",
        id : "email"
      }

      signupbutton.simulate('click', {target});

    });


  });
