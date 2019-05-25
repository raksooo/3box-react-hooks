import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useProfile, useBox, useSpace, useDelayedBox, useDelayedSpace } from '../dist/';
import getProvider from 'eth-provider';

const SPACE_NAME = '3box-react-hooks-demo';

const Example = ({ provider, address }) => {
  const profile = useProfile(address);
  const box1 = useBox(address, provider);
  const [space1] = useSpace(SPACE_NAME, address, provider);
  const [box2, openBox2] = useDelayedBox(address, provider);
  const [space2,, openSpace2] = useDelayedSpace(SPACE_NAME, address, provider);

  const open = useCallback(() => {
    openBox2();
    openSpace2();
  }, [openBox2, openSpace2])

  const data = Object.entries({ profile, box1, space1, box2, space2, })
    .map(([key, value], i) => {
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

