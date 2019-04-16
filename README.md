# 3box-react-hooks
React hooks for 3box

## Installation
```sh
npm i -s 3box-react-hooks
```

## Usage
```javascript
import { useProfile, useBox, useSpace } from '3box-react-hooks';

const MyComponent = (props) => {
  const profile = useProfile();
  const box = useBox();
  const space = useSpace('exampleSpace');

  const email = await box.private.get('email');
  const spaceValue = await box.private.get('key');

  return (
    <>
      <div>{profile.emoji}</div>
      <div>{email}</div>
      <div>{spaceValue}</div>
    </>
  );
}
```

### Delayed authentication
With the delayed box and space, the authentication can be performed when desired.

```javascript
import { useDelayedBox, useDelayedSpace } from '3box-react-hooks';

const MyComponent = (props) => {
  const [box, openBox] = useDelayedBox();
  const [space, openSpace] = useDelayedSpace('exampleSpace');
  const [opened, setOpened] = useState(false);
  const open = useCallback(() => {
    if (!opened) {
      openBox();
      openSpace();
      setOpened(true);
    }
  }, [box, openBox, space, openSpace, opened])

  if (!opened) {
    return (
      <button onClick={open}>Open</button>
    );
  }

  const email = await box.private.get('email');
  const spaceValue = await box.private.get('key');

  return (
    <>
      <div>{profile.emoji}</div>
      <div>{email}</div>
      <div>{spaceValue}</div>
    </>
  );
}
```

