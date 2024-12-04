import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from 'expo-router';

import { sendPicture } from '@/src/services/api-fetch';
import ButtonCamera from '@/src/components/ButtonCamera';

export default function Camera() {
    const navigation = useNavigation<any>();
    const [loading, setLoading] = useState(false);

    const [facing, setFacing] = useState<CameraType>('back');

    const cameraRef = useRef<CameraView>(null);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
        <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    function takePicture() {
        if (cameraRef.current && !loading) {
            setLoading(true);
            cameraRef.current.takePictureAsync().then((data) => {
                if (!data) return;
                console.log("Take picture!");
                FileSystem.readAsStringAsync(data.uri, { encoding: 'base64' }).then((base) => {
                    sendPicture({
                        width: data.width,
                        height: data.height,
                        image: base
                    }).then((response) => {
                        console.log(response)
                        if (response.error) return;
                        
                        navigation.navigate('item/[id]', {"id": response.data.id});
                    }).finally(() => {
                        setLoading(false);
                    });
                });
            });
        }
    }

    return (
        <View style={styles.container}>
        <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
        >
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonFace} onPress={toggleCameraFacing}>
                    <MaterialCommunityIcons name="camera-flip" size={50} color="#007acc" />
                </TouchableOpacity>

                <ButtonCamera
                    styles={styles.button}
                    onPress={takePicture}
                />
                {loading && (
                    <Text>Loading...</Text>
                )}
            </View>
            <View
                style={{
                    position: "absolute",
                    top: hp("25%"),
                    left: wp("25%"),
                    width: wp("50%"),
                    height: wp("50%"),
                }}
            >
                <Image source={require("@/assets/images/camera_target.png")} style={{
                    width: wp("50%"),
                    height: wp("50%"),
                }} />
            </View>
        </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonFace: {
    position: 'absolute',
    top: -35,
    right: -35,
  },
});