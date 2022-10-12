import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export interface IBdgeProps {
  value: string | number;
  textColor?: string;
  fontSize?: number;
}

export default function Badge(props: IBdgeProps) {
  const {value, textColor = 'blue', fontSize = 20} = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.text, {color: textColor, fontSize}]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 40,
    backgroundColor: '#D2DFF0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
