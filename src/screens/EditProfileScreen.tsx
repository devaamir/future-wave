import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { theme, buttonStyles, buttonColors, useColors } from '../theme';
import {
  BackArrowIcon,
  ProfileIcon,
  EditIcon,
  CameraIcon,
  GalleryIcon,
  XMarkIcon,
} from '../components/Icons';
import { getUser, saveSession } from '../services/storage';
import { updateProfile } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textBody,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: colors.white,
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
    backgroundColor: colors.borderLight,
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
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 8,
    borderWidth: 2,
    borderColor: colors.surfaceAlt,
  },
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePhotoText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: colors.primary,
  },
  formSection: {
    backgroundColor: colors.white,
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
    color: colors.textBodyAlt,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.borderMuted,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: colors.textPrimary,
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
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
    color: colors.textBody,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textMuted,
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
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
  },
  modalOptionText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: colors.textBody,
    marginLeft: 12,
  },
}), [colors]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
  });

  useEffect(() => {
    getUser().then(user => {
      if (user) {
        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.mobile_number || '',
          dateOfBirth: '',
          address: user.address || '',
        });
        if (user.photo) setProfileImage(user.photo);
      }
    });
  }, []);

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

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await updateProfile({
        ...(formData.name ? { name: formData.name } : null),
        ...(formData.phone ? { mobile_number: formData.phone } : null),
        ...(formData.address ? { address: formData.address } : null),
        // ...(profileImage ? { photo: profileImage } : null),
      });
      // Update stored user with new values
      const currentUser = await getUser();
      if (currentUser) {
        const refresh = await AsyncStorage.getItem('refresh_token');
        const access = await AsyncStorage.getItem('access_token');
        await saveSession(access!, refresh!, { ...currentUser, ...data });
      }
      Alert.alert('Success', 'Profile updated successfully.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      const msg = error?.response?.data
        ? JSON.stringify(error.response.data)
        : 'Failed to update profile.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
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
        placeholderTextColor={colors.textDisabled}
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
          <BackArrowIcon size={24} color={colors.textBody} />
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
                <ProfileIcon size={48} color={colors.textTertiary} />
              )}
            </View>
            {/* <TouchableOpacity
              style={styles.editIcon}
              onPress={handleImagePicker}
            >
              <EditIcon size={16} color={colors.primary} />
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
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={buttonStyles.buttonText}>Save Changes</Text>
              )}
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
            <XMarkIcon size={20} color={colors.textMuted} />
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
              <CameraIcon size={20} color={colors.primary} />
              <Text style={styles.modalOptionText}>Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalOptionHalf}
              onPress={openGallery}
            >
              <GalleryIcon size={20} color={colors.primary} />
              <Text style={styles.modalOptionText}>Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};


export default EditProfileScreen;
