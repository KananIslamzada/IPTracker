This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# IMPORTANT

> **Note**: If you encounter with an error while installing npm packages, use:

```bash

npm i --legacy-peer-deps

```

# Instruction

## Dashboard & Profile screen

There is TextInput that you can search for any IP address. If it's empty it returns your current IP address. You can see IP address details below.

There is a images list. It's dummy data. When you click the image, it navigates you profile screen and search for IP of this image. If you switch to profile tab without clicking image, the IP details container will show your current address.

## Market Data screen

There is an svg chart with animation which gets data from socket and visualize it. I handled interactive data which comes from socket. I set 3000 seconds debouncing (its changeable) and prevent state rendering in other tabs. I used useIsFocused() hook to get current page's focus status. If it's not focused, I set data to temporary array (which is outside of component). when user comes back to market data screen, I concat temp array to curret state + new data.E value. So, this render process does not affect other screens when you are not in this tab (it gives more performance optimization). Last functionality is about scroll. I set automatic scroll when socket sends new data. I used ononContentSizeChange method and ref for it. İ also allowed user to scroll and look at previos data. However 3 seconds after the user stops scrolling, I start auto-scrolling again. flashList data was not a state because of a performance. I set an array outside of component and it renders automatically when new data comes from socket. I used useCallback and memo for optimization.

# APK generating

You can use this command to generate a debug apk:

```bash

npm run debug-apk

```

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
