import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Text } from 'react-native';

const queryClient = new QueryClient()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Michroma": require("@/assets/fonts/Michroma-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <QueryClientProvider client={queryClient}>
        <Stack
            screenOptions={{
              headerShown: true
            }}
        />
    </QueryClientProvider>
  );
}