import { configure } from 'enzyme';
import chai, { expect } from 'chai';
import {
  useProfile,
  usePublicSpace,
} from '../src/api.js';
import { testHook } from './testHelper';
import 'jsdom-global/register';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const TEST_PROFILE = {
  address: '0x88E146E0fd0F5AaCbc4f94365dF9f599A90139F1',
  name: 'Oskar',
};
const TEST_SPACE = '3box-react-hooks-test-space';

describe('3box api hooks', function() {
  it('should retrieve a profile', async function() {
    const profile = await testHook(useProfile, TEST_PROFILE.address);

    expect(profile).to.not.be.null;
    expect(profile).to.have.property('name', TEST_PROFILE.name);
  });

  it('should retrieve a public space', async function() {
    const space = await testHook(usePublicSpace, TEST_PROFILE.address, TEST_SPACE);

    expect(space).to.not.be.null;
  });
});


