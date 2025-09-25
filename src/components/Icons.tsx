import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const LiveClassIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <Path
      d="M23.81,26c-.35.9-.94,1.5-1.61,1.5H13.74c-.68,0-1.26-.6-1.61-1.5H1v1.75A2.45,2.45,0,0,0,3.6,30H32.4A2.45,2.45,0,0,0,35,27.75V26Z"
      fill={color}
    />
    <Path
      d="M7,10H23.66A7.46,7.46,0,0,1,22.5,6H5.5A1.54,1.54,0,0,0,4,7.57V24H7Z"
      fill={color}
    />
    <Path
      d="M32,13.22a7.14,7.14,0,0,1-3,.2V24h3Z"
      fill={color}
    />
    <Circle cx="30" cy="6" r="5" fill={color} />
  </Svg>
);

export const RecordedVideosIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <Path
      d="M32,4H4A2,2,0,0,0,2,6V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V6A2,2,0,0,0,32,4ZM8.92,8a3,3,0,1,1-3,3A3,3,0,0,1,8.92,8ZM6,27V22.9l6-6.08a1,1,0,0,1,1.41,0L16,19.35,8.32,27Zm24,0H11.15l6.23-6.23,5.4-5.4a1,1,0,0,1,1.41,0L30,21.18Z"
      fill={color}
    />
  </Svg>
);

export const StudyMaterialIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <Rect x="10" y="5.2" width="18" height="1.55" fill={color} />
    <Path
      d="M29,8H9.86A1.89,1.89,0,0,1,8,6,2,2,0,0,1,9.86,4H29a1,1,0,1,0,0-2H9.86A4,4,0,0,0,6,6a4.14,4.14,0,0,0,0,.49,1,1,0,0,0,0,.24V30a4,4,0,0,0,3.86,4H29a1,1,0,0,0,1-1V9.25s0-.06,0-.09,0-.06,0-.09A1.07,1.07,0,0,0,29,8Z"
      fill={color}
    />
  </Svg>
);

export const ExamIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <G>
      <Circle cx="16.86" cy="9.73" r="6.46" fill={color} />
      <Rect x="21" y="28" width="7" height="1.4" fill={color} />
      <Path
        d="M15,30v3a1,1,0,0,0,1,1H33a1,1,0,0,0,1-1V23a1,1,0,0,0-1-1H26V20.53a1,1,0,0,0-2,0V22H22V18.42A32.12,32.12,0,0,0,16.86,18a26,26,0,0,0-11,2.39,3.28,3.28,0,0,0-1.88,3V30Zm17,2H17V24h7v.42a1,1,0,0,0,2,0V24h6Z"
        fill={color}
      />
    </G>
  </Svg>
);

export const HomeIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <Path
      d="M33,19a1,1,0,0,1-.71-.29L18,4.41,3.71,18.71a1,1,0,0,1-1.41-1.41l15-15a1,1,0,0,1,1.41,0l15,15A1,1,0,0,1,33,19Z"
      fill={color}
    />
    <Path
      d="M18,7.79,6,19.83V32a2,2,0,0,0,2,2h7V24h6V34h7a2,2,0,0,0,2-2V19.76Z"
      fill={color}
    />
  </Svg>
);

export const CoursesIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <Path
      d="M12.75,3H5.25A1.15,1.15,0,0,0,4,4V33H14V4A1.15,1.15,0,0,0,12.75,3Z"
      fill={color}
    />
    <Path
      d="M33.77,31.09l-6.94-18.3a1,1,0,0,0-1.29-.58L22,13.59V9a1,1,0,0,0-1-1H16V33h6V14.69L28.93,33Z"
      fill={color}
    />
  </Svg>
);

export const ProfileIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <Path
      d="M30.61,24.52a17.16,17.16,0,0,0-25.22,0,1.51,1.51,0,0,0-.39,1v6A1.5,1.5,0,0,0,6.5,33h23A1.5,1.5,0,0,0,31,31.5v-6A1.51,1.51,0,0,0,30.61,24.52Z"
      fill={color}
    />
    <Circle cx="18" cy="10" r="7" fill={color} />
  </Svg>
);

export const NotificationIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 36 36">
    <Path
      d="M32.85,28.13l-.34-.3A14.37,14.37,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15A10.81,10.81,0,0,0,19.21,4.4V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93l-.34.3v2.82H32.85Z"
      fill={color}
    />
    <Path
      d="M15.32,32a2.65,2.65,0,0,0,5.25,0Z"
      fill={color}
    />
  </Svg>
);

export const SearchIcon = ({ size = 24, color = '#6B7280' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 -0.5 21 21">
    <Path
      d="M264,138.586 L262.5153,140 L258.06015,135.758 L259.54485,134.343 L264,138.586 Z M251.4,134 C247.9266,134 245.1,131.309 245.1,128 C245.1,124.692 247.9266,122 251.4,122 C254.8734,122 257.7,124.692 257.7,128 C257.7,131.309 254.8734,134 251.4,134 L251.4,134 Z M251.4,120 C246.7611,120 243,123.582 243,128 C243,132.418 246.7611,136 251.4,136 C256.0389,136 259.8,132.418 259.8,128 C259.8,123.582 256.0389,120 251.4,120 L251.4,120 Z"
      fill={color}
      transform="translate(-243, -120)"
    />
  </Svg>
);
