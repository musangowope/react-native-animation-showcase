import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import PropTypes from "prop-types";

const ThoughtBubble = ({ svgComponent: SVGComponent, ellipsisPosition }) => {
  const initialTranslateYValue = 0;
  const bigEllipsisTranslateYVal = new Animated.Value(initialTranslateYValue);
  const smallEllipsisTranslateYVal = new Animated.Value(initialTranslateYValue);

  const initFloatAnimation = (animation) => {
    const nextTranslateYValue = 5;
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(animation, {
        toValue: nextTranslateYValue,
        useNativeDriver: false,
        duration: 500,
      }).start(() => {
        Animated.timing(animation, {
          toValue: initialTranslateYValue,
          useNativeDriver: false,
          duration: 500,
        }).start(() => {
          initFloatAnimation(animation);
        });
      }),
    ]);
  };

  React.useEffect(() => {
    initFloatAnimation(bigEllipsisTranslateYVal);
    setTimeout(() => initFloatAnimation(smallEllipsisTranslateYVal), 200);
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.getCornerBackgroundStyles(ellipsisPosition)} />
        <View style={styles.mainBody}>
          <SVGComponent
            width={60}
            height={60}
            style={{
              stroke: "#ABC4FF",
            }}
          />
        </View>
        <View style={styles.getMainBodyCornerStyles(ellipsisPosition)} />
      </View>

      <Animated.View
        style={[
          styles.ellipsisBig,
          { transform: [{ translateY: bigEllipsisTranslateYVal }] },
        ]}
      />
      <Animated.View
        style={[
          styles.getEllipsisSmallerStyles(ellipsisPosition),
          { transform: [{ translateY: smallEllipsisTranslateYVal }] },
        ]}
      />
    </View>
  );
};

ThoughtBubble.propTypes = {
  svgComponent: PropTypes.any,
  delay: PropTypes.number,
  ellipsisPosition: PropTypes.oneOf(["left", "center", "right"]),
};
ThoughtBubble.defaultProps = {
  svgComponent: null,
  delay: 0,
  ellipsisPosition: "center",
};

export default React.memo(ThoughtBubble);

const styles = StyleSheet.create({
  outerContainer: {
    width: 100,
    position: "relative",
  },

  container: {
    marginBottom: 20,
    position: "relative",
  },

  mainBody: {
    padding: 20,
    borderWidth: 2,
    borderColor: "#ABC4FF",
    backgroundColor: "white",
    borderRadius: 30,
  },

  getCornerBackgroundStyles: (ellipsisPosition) => {
    let styles = {};
    switch (ellipsisPosition) {
      case "left":
        styles.left = 15;
        break;
      case "center":
        styles.alignSelf = "center";
        break;
      case "right":
        styles.right = 16;
        break;
      default:
        break;
    }

    return {
      height: 35,
      width: 35,
      borderRadius: 32,
      backgroundColor: "white",
      position: "absolute",
      bottom: -17,
      borderWidth: 2,
      borderColor: "#ABC4FF",
      ...styles,
    };
  },

  getMainBodyCornerStyles: (ellipsisPosition) => {
    let styles = {};
    switch (ellipsisPosition) {
      case "left":
        styles.left = 18;
        break;
      case "center":
        styles.alignSelf = "center";
        break;
      case "right":
        styles.right = 18;
        break;
      default:
        break;
    }

    return {
      height: 30,
      width: 30,
      borderRadius: 15,
      backgroundColor: "white",
      position: "absolute",
      bottom: -15,
      ...styles,
    };
  },

  ellipsisBig: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 9,
    backgroundColor: "white",
    borderColor: "#ABC4FF",
    marginLeft: "auto",
    marginRight: "auto",
  },

  getEllipsisSmallerStyles: (ellipsisPosition) => {
    let styles = {};
    switch (ellipsisPosition) {
      case "left":
        styles.marginLeft = "auto";
        styles.marginRight = 30;
        break;
      case "center":
        styles.marginLeft = "auto";
        styles.marginRight = "auto";
        break;
      case "right":
        styles.marginLeft = 30;
        styles.marginRight = "auto";
        break;
      default:
        break;
    }

    return {
      width: 15,
      height: 15,
      borderWidth: 2,
      borderRadius: 9,
      backgroundColor: "white",
      borderColor: "#ABC4FF",
      ...styles,
    };
  },
});
