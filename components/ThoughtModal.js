import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fontFamilyStyles from "../constants/fontFamilyStyle";
import { Pressable } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modal";

const Backdrop = () => <View style={styles.backdrop} />;

const ThoughtModal = ({ isOpen, closeAction, modalTitle }) => {
  return (
    <Modal
      coverScreen
      hasBackdrop
      isVisible={isOpen}
      onBackButtonPress={closeAction}
      onBackdropPress={closeAction}
      useNativeDriver={true}
      hideModalContentWhileAnimating
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalBody}>
        <Pressable style={styles.closeButton} onPress={closeAction}>
          <Text style={styles.closeButtonText}>X</Text>
        </Pressable>

        <Text style={styles.modalTitle}>{modalTitle}</Text>
        <Text style={styles.modalBodyContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in lacus
          ultricies, ornare odio sed, sollicitudin magna. Sed arcu sapien,
          ornare quis neque eget, blandit bibendum ex. Mauris ante ipsum,
          efficitur pulvinar dignissim a, porta nec lorem. Maecenas sagittis
          finibus libero, acc
        </Text>
      </View>
    </Modal>
  );
};

export default ThoughtModal;

ThoughtModal.propTypes = {
  isOpen: PropTypes.bool,
  closeAction: PropTypes.func,
  modalTitle: PropTypes.string,
};

ThoughtModal.defaultProps = {
  isOpen: false,
  closeAction: () => false,
  modalTitle: "",
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  modalBody: {
    backgroundColor: "white",
    padding: 20,
    width: "90%",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#ABC4FF",
    marginBottom: 10,
  },

  closeButton: {
    backgroundColor: "#ABC4FF",
    height: 45,
    width: 45,
    position: "absolute",
    borderRadius: 25,
    top: -10,
    right: -10,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    ...fontFamilyStyles,
    color: "white",
    fontSize: 20,
  },

  modalTitle: {
    ...fontFamilyStyles,
    fontSize: 24,
    marginBottom: 10,
  },

  modalBodyContent: {
    ...fontFamilyStyles,
    fontSize: 16,
    lineHeight: 20,
  },
});
