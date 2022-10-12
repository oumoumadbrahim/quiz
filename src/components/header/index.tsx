import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Icon from '../icon';

export interface HeaderProps {
  title?: string;
  subTitle?: string;
}

export default function Header(props: any) {
  const {title, subTitle} = props;

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Icon name="Person" fill="grey" size={45} />
      </View>
      <View style={{top: -10}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 45,
    backgroundColor: '#49A8EE',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    ...Platform.select({
      android: {
        elevation: 14,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
      },
    }),
  },
  avatarWrapper: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    color: '#000A',
    fontWeight: '400',
  },
});
