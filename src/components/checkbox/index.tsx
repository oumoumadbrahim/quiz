import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

import Icon, {IconInterface, svgNames} from '../../components/icon';

interface CheckboxInterface {
  checked?: boolean;
  size?: number;
  disabled?: boolean;
  color?: svgNames;
  icon?: IconInterface;
  onPress?: (val: boolean) => void;
}

export default function Checkbox(props: CheckboxInterface) {
  const {checked = false, size = 24, disabled = false, onPress} = props;

  const [isChecked, setChecked] = React.useState(checked);

  function handlePress() {
    setChecked(!isChecked);
    onPress && onPress(!isChecked);
  }

  React.useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: isChecked ? 'green' : '#B3B3B3',
          width: size,
          height: size,
        },
      ]}
      onPress={handlePress}>
      <Icon
        name="Check"
        size={size - 4}
        fill={isChecked ? 'white' : 'none'}
        disabled={disabled}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
