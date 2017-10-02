import React from 'react';
import {configure, Enzyme, mount} from 'enzyme';
import {expect }from 'chai';



import AddBucket from '../containers/addbucket';


describe('AddBucket component ', () => {
    let wrapper;
    beforeEach( () => {
      wrapper = mount(<AddBucket />);
    });

    it('has table element' ,() => {
      expect(wrapper.find('table' ).length).to.equal(1);
    });

    it('has add bucketname field', ()=>{
      let input_bucketname = wrapper.find("#bucketname")
      expect(input_bucketname.length).to.equal(1);
      const mockUp = jest.fn();
      expect(input_bucketname.simulate('change', {mockUp}, {target: {value:"my bucket"}}));
    });

    it('has search input field', ()=>{
      let input_search = wrapper.find("#search_field")
      expect(input_search.length).to.equal(1);
    });


  });
