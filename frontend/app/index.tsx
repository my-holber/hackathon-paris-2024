import Footer from '@/src/components/Footer';
import { Section } from '@/src/components/Section';
import { useAuth } from '@/src/contexts/useAuth';
import { StyleSheet, View, Text, Image, ActivityIndicator, Button } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Index() {
  // const { isConnected, login, logout, loading } = useAuth();

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#007acc" />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <Section>
      <View style={styles.container}>
  
        {/* {isConnected ? ( */}
          <>
            <View style={styles.header}>
              <Image source={require("@/assets/images/avion1.png")} resizeMode="contain" style={styles.img1} />
              <Text style={styles.headerText}>Touriste Solution</Text>
              <Image source={require("@/assets/images/avion2.png")} resizeMode="contain" style={styles.img2} />
            </View>
    
            <View style={styles.contain}>
              
            </View>
            
            <Footer />
          </>
        {/* ) : (
          <View>
            <Text>Vous n'êtes pas connecté.</Text>
            <Button
              title="Se connecter"
              onPress={() => login('fakeToken123')}
            />
          </View>
        )} */}
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
  header: {
    flex: 1,
    width: wp("100%"),
    position: "relative",
    paddingTop: 50,
  },
  headerText: {
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
    position: "relative",
    fontFamily: 'Michroma',
  },
  contain: {
    flex: 1,
  },
  img1: {
    width: wp("60%"),
    position: "absolute",
    top: 0,
    left: 20,
  },
  img2: {
    width: wp("60%"),
    position: "absolute",
    top: 70,
    right: 20
  },
});