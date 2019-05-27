import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useProfile, useBox, useSpace, useDelayedBox, useDelayedSpace, usePublicSpace } from '../dist/';
import { useProfile as useApiProfile, usePublicSpace as useApiPublicSpace } from '../dist/api.js';
import getProvider from 'eth-provider';

const SPACE_NAME = '3box-react-hooks-demo';

const Example = ({ provider, address }) => {
  const profile1 = useProfile(address);
  const box1 = useBox(address, provider);
  const space1 = useSpace(SPACE_NAME, box1);
  const [box2, openBox2] = useDelayedBox(address, provider);
  const [space2, openSpace2] = useDelayedSpace(SPACE_NAME, box2);
  const space3 = usePublicSpace(address, SPACE_NAME);
  const profile2 = useApiProfile(address);
  const space4 = useApiPublicSpace(address, SPACE_NAME);

  const open = useCallback(() => {
    openBox2();
    openSpace2();
  }, [openBox2, openSpace2])

  const data = Object.entries({
    profile1,
    box1,
    space1,
    box2,
    space2,
    space3,
    profile2,
    space4,
  }).map(([key, value], i) => {
      const text = Object.entries(value || {})
        .map(([key, value]) => `${key}:${value}`)
        .join('\n');
      return (
        <div key={i}>
          <div>{key}:</div>
          <textarea value={text} readOnly />
        </div>
      )
    });

  return (
    <>
      {data}
      <button onClick={open}>Open delayed box and space</button>
    </>
  );
};

const provider = getProvider();
provider.enable().then(([address]) => {
  const container = document.getElementById('app');
  const props = { provider, address };
  ReactDOM.render(<Example {...props} />, container);
});

