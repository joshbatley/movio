import { h, Fragment } from 'preact';
import { useState } from 'preact/hooks';

const App = () => {
  const [a, s] = useState(1);
  return (
    <Fragment>
      <span>My count {a}</span>
      <button type="button" onClick={() => s(a + 1)}>add</button>
    </Fragment>
  );
};

export default App;
