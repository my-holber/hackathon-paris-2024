import { Link } from 'expo-router';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Footer() {
  return (
    <View style={styles.footer}>
    
    <TouchableHighlight style={[styles.footerElementGlobal, { marginTop: -30 }]}>
      <View style={styles.footerElement}>
        <Link href="/translate">
          <FontAwesome name="microphone" size={50} color="#fff" />
        </Link>
      </View>
    </TouchableHighlight>

    <TouchableHighlight style={[styles.footerElementGlobal, { marginTop: -100 }]}>
      <View style={styles.footerElement}>
        <Link href="/camera">
          <FontAwesome name="camera" size={50} color="#fff" />
        </Link>
      </View>
    </TouchableHighlight>

    <TouchableHighlight style={[styles.footerElementGlobal, { marginTop: -30 }]}>
      <View style={styles.footerElement}>
        <Link href="/lang">
          <FontAwesome name="language" size={50} color="#fff" />
        </Link>
      </View>
    </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 100,
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
  },
  footerElementGlobal: {
    flex: 1,
    height: "100%",
    maxWidth: "30%",
  },
  footerElement: {
    flex: 1,
    backgroundColor: "#007acc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 10,
    borderColor: "#0070bb",
    borderWidth: 5,
    borderTopColor: "#0092f3",
  },
});