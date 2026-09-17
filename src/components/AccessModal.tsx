import React from 'react';
import { Modal, View, Text, TouchableOpacity, Linking } from 'react-native';
import { LockIcon, WarningIcon } from './Icons';
import { theme } from '../theme';
import type { AccessVariant as AccessModalVariant } from '../utils/expiry';

interface AccessModalProps {
  visible: boolean;
  variant: AccessModalVariant;
  daysLeft?: number | null;
  onClose: () => void;
}

const ACCENT = '#F39C12';
const WARN = '#F59E0B';

const config: Record<
  AccessModalVariant,
  {
    icon: JSX.Element;
    iconBg: string;
    accentColor: string;
    title: string;
    message: (daysLeft?: number | null) => string;
    showWebsite: boolean;
    dismissible: boolean;
    buttonLabel: string;
  }
> = {
  expiring_soon: {
    icon: <WarningIcon size={36} color={WARN} />,
    iconBg: '#FFF8E1',
    accentColor: WARN,
    title: 'Expiring Soon',
    message: d =>
      `Your access expires in ${d} day${
        d === 1 ? '' : 's'
      }.\nPlease renew to avoid interruption.`,
    showWebsite: false,
    dismissible: true,
    buttonLabel: 'Got it',
  },
  expired: {
    icon: <LockIcon size={36} color={ACCENT} />,
    iconBg: '#FFF3E0',
    accentColor: ACCENT,
    title: 'Access Expired',
    message: () =>
      'Your app access has expired.\nPlease contact support to renew.',
    showWebsite: true,
    dismissible: false,
    buttonLabel: 'OK',
  },
  not_activated: {
    icon: <LockIcon size={36} color={ACCENT} />,
    iconBg: '#FFF3E0',
    accentColor: ACCENT,
    title: 'Access Not Activated',
    message: () =>
      'Your app access has not been activated yet.\nPlease contact support to get started.',
    showWebsite: true,
    dismissible: false,
    buttonLabel: 'OK',
  },
};

const AccessModal: React.FC<AccessModalProps> = ({
  visible,
  variant,
  daysLeft,
  onClose,
}) => {
  const c = config[variant];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => c.dismissible && onClose()}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: 36,
            alignItems: 'center',
            width: '100%',
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: c.iconBg,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            {c.icon}
          </View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: theme.fonts.bold,
              color: '#1A1A2E',
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            {c.title}
          </Text>
          <View
            style={{
              width: 40,
              height: 3,
              backgroundColor: c.accentColor,
              borderRadius: 2,
              marginBottom: 16,
            }}
          />
          <Text
            style={{
              fontSize: 15,
              fontFamily: theme.fonts.regular,
              color: '#6B7280',
              textAlign: 'center',
              lineHeight: 24,
            }}
          >
            {c.message(daysLeft)}
          </Text>
          {c.showWebsite && (
            <TouchableOpacity
              onPress={() => Linking.openURL('https://tipspscacademy.in')}
              style={{
                marginTop: 24,
                width: '100%',
                borderWidth: 2,
                borderColor: c.accentColor,
                borderRadius: 12,
                paddingVertical: 12,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: c.accentColor,
                  fontFamily: theme.fonts.semiBold,
                  fontSize: 15,
                }}
              >
                Visit tipspscacademy.in
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={onClose}
            style={{
              marginTop: 12,
              backgroundColor: c.accentColor,
              borderRadius: 12,
              paddingVertical: 12,
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontFamily: theme.fonts.semiBold,
                fontSize: 15,
              }}
            >
              {c.buttonLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AccessModal;
