import React from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ThoughtBubble from "../components/ThoughtBubble";

import Avatar from "../assets/svgs/avatar.svg";
import ThoughtModal from "../components/ThoughtModal";
import thoughtsData from "../constants/thoughtData";

const { width } = Dimensions.get("screen");

const Indicator = ({ scrollX }) => {
  return (
    <View style={indicatorStyles.container}>
      {thoughtsData.map((_, i) => {
        //prev slide scroll x offset, current slide x offset and next slide x offset
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1.4, 0.6],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              ...indicatorStyles.indicator,
              opacity,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const indicatorStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  indicator: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#ABC4FF",
    margin: 10,
  },
});

export default function HomeScreen() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisibility] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");

  const openModal = (modalTitle) => {
    setModalTitle(modalTitle);
    setModalVisibility(true);
  };
  const closeModal = () => setModalVisibility(false);

  React.useEffect(() => {
    if (!modalVisible) {
      setModalTitle("");
    }
  }, [modalVisible]);

  const handleOnScroll = () =>
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(171,196,255,0.2)",
          "rgba(171,196,255,0.5)",
          "#ABC4FF",
          "#ABC4FF",
        ]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <View style={styles.listContainer}>
          <Animated.FlatList
            data={thoughtsData}
            keyExtractor={(_, key) => `thought-${key}`}
            horizontal
            scrollEventThrottle={32}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={handleOnScroll()}
            showsHorizantalIndicator={false}
            renderItem={({ item, index: i }) => {
              //prev slide scroll x offset, current slide x offset and next slide x offset
              const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.8],
                extrapolate: "clamp",
              });

              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  style={{
                    ...styles.thoughtBubbleWrapper,
                    width,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity,
                    transform: [{ scale }],
                  }}
                >
                  <Pressable
                    onPress={() => openModal(item.leftThought.title)}
                    style={styles.thoughtBubble}
                  >
                    <ThoughtBubble
                      svgComponent={item.leftThought.svgComponent}
                      ellipsisPosition="left"
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => openModal(item.centerThought.title)}
                    style={styles.thoughtBubbleMiddle}
                  >
                    <ThoughtBubble
                      svgComponent={item.centerThought.svgComponent}
                      ellipsisPosition="center"
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => openModal(item.rightThought.title)}
                    style={styles.thoughtBubble}
                  >
                    <ThoughtBubble
                      svgComponent={item.rightThought.svgComponent}
                      ellipsisPosition="right"
                    />
                  </Pressable>
                </Animated.View>
              );
            }}
          />
        </View>
        <View>
          <Indicator scrollX={scrollX} />
        </View>
        <View style={styles.avatarWrapper}>
          <Avatar />
        </View>
      </View>
      <ThoughtModal
        isOpen={modalVisible}
        closeAction={closeModal}
        modalTitle={modalTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  gradient: {
    height: "100%",
    width: "100%",
  },

  content: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    flexDirection: "column",
  },

  listContainer: {
    height: 220,
    justifyContent: "flex-end",
    marginBottom: -20,
  },

  thoughtBubbleWrapper: {
    flexDirection: "row",
  },

  thoughtBubble: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
    height: "100%",
  },

  thoughtBubbleMiddle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 60,
    height: "100%",
  },

  avatarWrapper: {
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: "center",
  },
});
