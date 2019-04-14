# 3box-react-hooks
React hooks for 3box

## Installation
```sh
npm i -s 3box-react-hooks
```

## Usage
```javascript
import { use3boxProfile, use3box, use3boxSpace } from '3box-react-hooks';

const MyComponent = (props) => {
  const profile = use3boxProfile();
  const box = use3box();
  const space = use3boxSpace('exampleSpace');

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

