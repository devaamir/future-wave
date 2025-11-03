import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { theme, buttonStyles, buttonColors } from '../theme';
import {
  BackArrowIcon,
  ProfileIcon,
  EditIcon,
  CameraIcon,
  GalleryIcon,
  XMarkIcon,
} from '../components/Icons';

const EditProfileScreen = ({ navigation }: any) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    dateOfBirth: '15/08/1995',
    address: 'Kochi, Kerala',
  });

  const handleImagePicker = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openCamera = () => {
    closeModal();
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 500,
        maxHeight: 500,
      },
      handleImageResponse,
    );
  };

  const openGallery = () => {
    closeModal();
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 500,
        maxHeight: 500,
      },
      handleImageResponse,
    );
  };

  const handleImageResponse = (response: ImagePickerResponse) => {
    if (response.assets && response.assets[0]) {
      setProfileImage(response.assets[0].uri || null);
    }
  };

  const handleSave = () => {
    // Save profile logic here
    navigation.goBack();
  };

  const InputField = ({
    label,
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default',
  }: any) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <ProfileIcon size={48} color="#6B7280" />
              )}
            </View>
            {/* <TouchableOpacity
              style={styles.editIcon}
              onPress={handleImagePicker}
            >
              <EditIcon size={16} color="#1A3C8E" />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            style={styles.changePhotoButton}
            onPress={handleImagePicker}
          >
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <InputField
            label="Full Name"
            value={formData.name}
            onChangeText={(text: string) =>
              setFormData({ ...formData, name: text })
            }
            placeholder="Enter your full name"
          />

          <InputField
            label="Email Address"
            value={formData.email}
            onChangeText={(text: string) =>
              setFormData({ ...formData, email: text })
            }
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <InputField
            label="Phone Number"
            value={formData.phone}
            onChangeText={(text: string) =>
              setFormData({ ...formData, phone: text })
            }
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <InputField
            label="Date of Birth"
            value={formData.dateOfBirth}
            onChangeText={(text: string) =>
              setFormData({ ...formData, dateOfBirth: text })
            }
            placeholder="DD/MM/YYYY"
          />

          <InputField
            label="Address"
            value={formData.address}
            onChangeText={(text: string) =>
              setFormData({ ...formData, address: text })
            }
            placeholder="Enter your address"
          />
        </View>

        {/* Save Button */}
        <View style={styles.buttonSection}>
          <LinearGradient
            colors={buttonColors.primary}
            style={buttonStyles.primaryGradient}
            start={buttonStyles.primaryGradientStart}
            end={buttonStyles.primaryGradientEnd}
          >
            <TouchableOpacity
              style={buttonStyles.buttonContent}
              onPress={handleSave}
            >
              <Text style={buttonStyles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Image Picker Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={closeModal}>
            <XMarkIcon size={20} color="#64748B" />
          </TouchableOpacity>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Profile Photo</Text>
          </View>
          <Text style={styles.modalSubtitle}>
            Choose an option to update your profile picture
          </Text>

          <View style={styles.modalOptionsRow}>
            <TouchableOpacity
              style={styles.modalOptionHalf}
              onPress={openCamera}
            >
              <CameraIcon size={20} color="#1A3C8E" />
              <Text style={styles.modalOptionText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOptionHalf}
              onPress={openGallery}
            >
              <GalleryIcon size={20} color="#1A3C8E" />
              <Text style={styles.modalOptionText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: '#F1F5F9',
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#1A3C8E',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  modal: {
    justifyContent: 'flex-end',
    marginBottom: -10,
    marginHorizontal: 0,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  modalHeader: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalOptionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  modalOptionHalf: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#1E293B',
    marginLeft: 12,
  },
});

export default EditProfileScreen;
