import { configure } from 'enzyme';
import chai, { expect } from 'chai';
import FakeProvider from 'web3-fake-provider';
import {
  useProfile,
  useBox,
  useSpace,
  usePublicSpace,
} from '../src/3boxHooks.js';
import { testHook } from './testHelper';
import 'jsdom-global/register';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const TEST_PROFILE = {
  address: '0x88E146E0fd0F5AaCbc4f94365dF9f599A90139F1',
  name: 'Oskar',
};
const TEST_SPACE = '3box-react-hooks-test-space';

describe('3box static hooks', function() {
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

describe('3box ipfs hooks', function() {
  this.timeout(5000);

  const provider = new FakeProvider();

  beforeEach(function() {
    provider.injectResult('0x0');
  });

  it('should retrieve a box', async function() {
    const box = await testHook(useBox, TEST_PROFILE.address, provider);

    expect(box).to.not.be.null;
    expect(box).to.have.property('private');
    expect(box).to.have.property('public');
    expect(box).to.have.property('spaces');
  });

  it('should retrieve a space', async function() {
    const _useSpace = () => {
      const box = useBox(TEST_PROFILE.address, provider);
      return useSpace(TEST_SPACE, box);
    }

    const space = await testHook(_useSpace);

    expect(space).to.not.be.null;
    expect(space).to.have.property('private');
    expect(space).to.have.property('public');
    expect(space).to.have.property('_name', TEST_SPACE);
  });
});

