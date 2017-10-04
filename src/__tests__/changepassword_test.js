import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';
import {spy, sinon} from 'sinon';
import moxios from 'moxios';
import TestUtils from 'react-addons-test-utils';


import ChangePassword from '../containers/changepassword';


describe('ChangePassword component', () => {
    let wrapper;
    beforeEach( () => {
      moxios.install();
      wrapper = mount(<ChangePassword />);
    });
    afterEach(function () {
      moxios.uninstall();

    });

    it('has div with correct class' ,() => {
      expect(wrapper.find('.Login' ).length).to.equal(1);
    });

    it('has change password field', ()=>{
      let input_changepassword = wrapper.find("#changepassword")
      expect(input_changepassword.length).to.equal(1);
      const mockUp = jest.fn();
      expect(input_changepassword.simulate('change', {mockUp}, {target: {value:"awesome"}}));
    });

    it('has password field', () => {
      let input_password = wrapper.find("#confirmpassword");
      const mockUp = jest.fn();
      expect(input_password.length).to.equal(1);
      expect(input_password.simulate('change', {mockUp}, {target: {value: "awesome"}}));
    });


    it('allows button to be clicked', () => {
      let changepassbutt = wrapper.find("#changepassbutt");
      const target  ={
        value : "awesome",
        id : "loginbutt"
      }

      changepassbutt.simulate('submit', {target});

    });

  });
