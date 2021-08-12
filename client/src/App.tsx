import React from 'react';
import useInputs from './hooks/use-inputs';
import CounterContainer from './containers/counter-container';

const App: React.FC = () => {
  const [{ name }, onChange, reset] = useInputs({ name: '' });

  return (
    <>
      <div className="app">
        <input type="text" name="name" value={name} onChange={onChange} />
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
      <CounterContainer />
    </>
  );
};

export default App;
