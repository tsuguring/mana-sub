import React from "react";
import { Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../../constants/theme';

const styles = StyleSheet.create({
    contentContainer: {
      backgroundColor: COLOR.MAIN,
      height: 120,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 32,
      color: COLOR.WHITE,
    },
    detail: {
      fontSize: 16,
      color: COLOR.WHITE,
    },
});

interface Props {
    onPress: () => void;
    title: string;
    detail: string | undefined;
}

export default function TodoDisplay(props: Props) {
    const { onPress, title, detail } = props;
  
    return (
      <View>
        <View>
          <View>
            
          </View>
        </View>
        <TouchableHighlight style={styles.contentContainer} onPress={onPress}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.title}>{title}</Text>
              {!!detail && <Text style={styles.detail}>{detail}</Text>}
            </View>
            <Icon name="angle-right" size={32} color={COLOR.WHITE} />
          </View>
        </TouchableHighlight>
      </View>
    );
}