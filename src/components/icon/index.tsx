import React from 'react';
import {ViewStyle, TouchableOpacity, StyleProp, StyleSheet} from 'react-native';

import {SvgProps} from 'react-native-svg';

import * as Svgs from '../../assets/icons';

export type svgNames = keyof typeof Svgs;

export interface IconInterface extends Omit<SvgProps, 'color'> {
  name: svgNames;
  size?: number;
  iconWrapperStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function Icon(props: IconInterface) {
  const {
    name,
    size = 24,
    width,
    height,
    iconWrapperStyle,
    disabled,
    onPress,
    ...rest
  } = props;

  const style = StyleSheet.flatten([{height, width}, iconWrapperStyle]);

  const ImportedIcon: React.FC<SvgProps> = Svgs[name as never];
  const IconJsx = <ImportedIcon width={size} height={size} {...rest} />;

  return (
    <TouchableOpacity
      disabled={disabled || !onPress}
      onPress={onPress}
      {...style}>
      {IconJsx}
    </TouchableOpacity>
  );
}
