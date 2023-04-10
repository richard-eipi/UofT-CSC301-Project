import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { Button } from 'react-native';
import { View } from 'react-native';

export default function App() {
  const [showWebView, setShowWebView] = useState(false);
  const webViewRef = useRef(null);

  const openWebView = () => {
    setShowWebView(true);
  };

  const sendMessage = (value) => {
    webViewRef.current.injectJavaScript(`
      window.postMessage({ value: '${value}', source: 'survey-parent' }, '*');
    `);
    console.log('postMessage sent:', { value: value, source: 'survey-parent' });
  };

  const closeWebView = () => {
    setShowWebView(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {showWebView ? (
        <>
          <WebView
            ref={webViewRef}
            source={{ uri: 'https://zzqjames.github.io/csc301-project/' }}
            style={{ flex: 1 }}
            onLoad={() => sendMessage('user_2')}
          />
          <Button title="Close" onPress={closeWebView} />
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button title="Take survey" onPress={openWebView} />
        </View>
      )}
    </View>
  );
}
