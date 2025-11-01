# Repro: React Native iOS 26.1 Liquid Glass + 0% Opacity Behavior

In iOS 26.1, there appears to be a change where liquid glass effects are not rendered if the component is initially mounted with 0% opacity. Perhaps this is expected because of the dynamic rendering; however, this is a behavior change from iOS 26.0 so I'm not sure this is well known.

## Demo

When you press the "Fade In" button, a red-tinted glass view will mount with 0% opacity and then fade in to 100% opacity. No liquid glass visual effect or interactivity will appear.

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

App created with `create-expo-app@3.5.3`
