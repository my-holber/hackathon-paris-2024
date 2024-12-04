import { getPicture } from '@/src/services/api-fetch';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

const imageUrlDebug = 'https://www.timographie360.fr/photos/realisations/principal/minis/visite-virtuelle-arc-triomphe_80.jpg';
const descriptionDebug = "The Arc de Triomphe de l'Étoile,[a] often called simply the Arc de Triomphe, is one of the most famous monuments in Paris, France, standing at the western end of the Champs-Élysées at the centre of Place Charles de Gaulle, formerly named Place de l'Étoile—the étoile or of the juncture formed by its twelve radiating avenues. The location of the arc and the plaza is shared between three arrondissements, 16th (south and west), 17th (north), and 8th (east). The Arc de Triomphe honours those who fought and died for France in the French Revolutionary and Napoleonic Wars, with the names of all French victories and generals inscribed on its inner and outer surfaces. Beneath its vault lies the Tomb of the Unknown Soldier from World War I.";

export default function Item() {
    const params = useLocalSearchParams() as {id: string};
    const [id, setId] = useState(parseInt(params.id, 10));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        console.log("fetching data for item", id);
        getPicture(id).then((response) => {
          if (response.error) return;
          setTitle(response.data.title);
          setDescription((response.data.description as string[]).join("\n"));
          setImageUrl("data:image/jpg;base64,"+response.data.image);
        });
    }, [id]);

    return (
        <View style={styles.container}>

          <View style={{
              width: "100%",
              paddingBottom: 10,
              backgroundColor: "#005994"
          }}>
            <View style={styles.title}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
          </View>

          <View style={styles.artwork}>
            <Image source={{uri: imageUrl}} style={{width: 400, height: 400}} />
          </View>

          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              {description}
            </Text>
          </View>
        
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    width: "100%",
    padding: 10,
    backgroundColor: "#007acc",
    borderColor: "#0070bb",
    borderBottomWidth: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff",
  },
  artwork: {
    flex: 1
  },
  description: {
    flex: 1,
    backgroundColor: "#007acc",
    padding: 10,
    borderRadius: 10,
    borderWidth: 10,
    borderColor: "#0070bb",
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#fff",
  },
});