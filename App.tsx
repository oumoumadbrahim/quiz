import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Provider} from 'react-redux';

import {store} from './src/store';

import Home from './src/screen/home';

function App() {
  const [start, setStart] = React.useState(false);
  return (
    <Provider store={store}>
      {!start ? (
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#7693a2',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setStart(true)}>
          <Text style={{fontWeight: 'bold', fontSize: 42, color: '#fff'}}>
            Press to Start
          </Text>
        </TouchableOpacity>
      ) : (
        <Home />
      )}
    </Provider>
  );
}

export default App;
