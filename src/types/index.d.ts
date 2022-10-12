declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  interface IconInterface extends SvgProps {
    name?: string;
  }
  const content: React.FC<IconInterface>;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}
