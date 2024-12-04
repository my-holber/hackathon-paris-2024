import Footer from '@/src/components/Footer';
import { Section } from '@/src/components/Section';
import { StyleSheet, View, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Login() {
  return (
    <Section>
      <View style={styles.container}>

        lOGIN
       
      </View>
    </Section>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: wp("100%"),
  },
});