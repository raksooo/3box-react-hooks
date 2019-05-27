# 3box-react-hooks
React hooks wrapping 3box API

## Installation
```sh
npm i -S 3box-react-hooks
```

## Api
|Function|Arguments|Return|Corresponds to|
|-|-|-|-|
|useProfile|address[, opts]|profile|Box.getProfile|
|usePublicSpace|address, space name[, opts]|space|Box.getSpace|
|||||
|useBox|address, provider[, opts]|box|Box.openBox|
|useSpace|space, box[, opts]|space|box.openSpace|
|||||
|useDelayedBox|address, provider[, opts]|[box, open]|-|
|useDelayedSpace|space, box[, opts]|[space, open]|-|

### Delayed box and space
Delayed hooks can be used to postpone authentication. For example if a box should be opened when the user presses an authentication button. The return value from the hooks contains ```box```/```space``` which is null until authenticated and ```open``` which is a function that opens the box/space.

If the box and spaces are supposed to be opened at the same time, only the box needs to be delayed since the space waits for box to not be null before opening. There's an example below.

### Optimize build for read-only operations
```useProfile``` and ```usePublicSpace``` can be used by importing ```3box-react-hooks/dist/api``` for a more lightweight build.

## Example
```javascript
import { useProfile, useBox, useSpace } from '3box-react-hooks';

const MyComponent = (props) => {
  const address = '0x88E146E0fd0F5AaCbc4f94365dF9f599A90139F1';
  const profile = useProfile(address);
  const box = useBox(address, window.ethereum);
  const space = useSpace('exampleSpace', box);

  const email = await box.private.get('email');
  const spaceValue = await space.private.get('key');

  return (
    <>
      <div>{profile.emoji}</div>
      <div>{email}</div>
      <div>{spaceValue}</div>
    </>
  );
}
```

### Delayed box and space
```javascript
import { useDelayedBox, useSpace } from '3box-react-hooks';

const MyComponent = (props) => {
  const address = '0x88E146E0fd0F5AaCbc4f94365dF9f599A90139F1';
  const [box, open] = useDelayedBox(address, window.ethereum);
  const space = useSpace('exampleSpace', box);

  const email = await box.private.get('email');
  const spaceValue = await space.private.get('key');

  return (
    <>
      <div>{email}</div>
      <div>{spaceValue}</div>
      <button onClick={open}>Authenticate</button>
    </>
  );
}
```

