import { GlassView } from "expo-glass-effect";
import { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [showGlass, setShowGlass] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showGlass) {
      // Reset to 0 and animate to 1
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }
  }, [showGlass, fadeAnim]);

  const handleFadeIn = () => {
    // Unmount then remount with new key to force recreation
    setShowGlass(false);
    // Reset animation value to 0 before mounting
    fadeAnim.setValue(0);
    setTimeout(() => {
      setComponentKey((prev) => prev + 1);
      setShowGlass(true);
    }, 0);
  };

  return (
    <View style={styles.container}>
      <View style={{ minHeight: 40 }}>
        {showGlass && (
          <Animated.View key={componentKey} style={{ opacity: fadeAnim }}>
            <GlassView
              isInteractive={true}
              tintColor="ff220055"
              style={styles.glassView}
            >
              <Text style={styles.text}>Glass!</Text>
            </GlassView>
          </Animated.View>
        )}
      </View>

      <Text>
        In iOS 26.1, there appears to be a change where liquid glass effects are
        not rendered if the component is initially mounted with 0% opacity.
        Perhaps this is expected because of the dynamic rendering; however, this
        is a behavior change from iOS 26.0 so I{"'"}m not sure this is well
        known.
        {"\n\n"}
        When you press the {'"'}Fade In{'"'} button, a red-tinted glass view
        will mount with 0% opacity and then fade in to 100% opacity. No liquid
        glass visual effect or interactivity will appear.
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleFadeIn}>
          <Text style={styles.buttonText}>Fade In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  glassView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 26,
    alignItems: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
