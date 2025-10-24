import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const LiveClassIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M19.9998 10V7.2C19.9998 6.0799 19.9998 5.51984 19.806 5.09202C19.6355 4.71569 19.3636 4.40973 19.0291 4.21799C18.6488 4 18.151 4 17.1553 4H6.8442C5.84855 4 5.35073 4 4.97044 4.21799C4.63593 4.40973 4.36396 4.71569 4.19352 5.09202C3.99976 5.51984 3.99976 6.0799 3.99976 7.2V10M6.33887 14H6.34887M3.50977 20C3.9216 18.8348 5.03284 18 6.33906 18C7.64528 18 8.75652 18.8348 9.16835 20M11.9989 14H12.0089M9.1698 20C9.58164 18.8348 10.6929 18 11.9991 18C13.3053 18 14.4166 18.8348 14.8284 20M17.6588 14H17.6688M14.8297 20C15.2415 18.8348 16.3528 18 17.659 18C18.9652 18 20.0765 18.8348 20.4883 20M7.33887 14C7.33887 14.5523 6.89115 15 6.33887 15C5.78658 15 5.33887 14.5523 5.33887 14C5.33887 13.4477 5.78658 13 6.33887 13C6.89115 13 7.33887 13.4477 7.33887 14ZM12.9989 14C12.9989 14.5523 12.5512 15 11.9989 15C11.4466 15 10.9989 14.5523 10.9989 14C10.9989 13.4477 11.4466 13 11.9989 13C12.5512 13 12.9989 13.4477 12.9989 14ZM18.6588 14C18.6588 14.5523 18.2111 15 17.6588 15C17.1065 15 16.6588 14.5523 16.6588 14C16.6588 13.4477 17.1065 13 17.6588 13C18.2111 13 18.6588 13.4477 18.6588 14Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const RecordedVideosIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M13.6136 15.3473L17.8651 10.9766L21 13.9844M6.96484 19L11.9688 13.9766L17.9727 19M9.96875 9.97656C9.96875 11.0811 9.07332 11.9766 7.96875 11.9766C6.86418 11.9766 5.96875 11.0811 5.96875 9.97656C5.96875 8.87199 6.86418 7.97656 7.96875 7.97656C9.07332 7.97656 9.96875 8.87199 9.96875 9.97656ZM12.0627 6.06274L11.9373 5.93726C11.5914 5.59135 11.4184 5.4184 11.2166 5.29472C11.0376 5.18506 10.8425 5.10425 10.6385 5.05526C10.4083 5 10.1637 5 9.67452 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V10.2C21 9.0799 21 8.51984 20.782 8.09202C20.5903 7.71569 20.2843 7.40973 19.908 7.21799C19.4802 7 18.9201 7 17.8 7H14.3255C13.8363 7 13.5917 7 13.3615 6.94474C13.1575 6.89575 12.9624 6.81494 12.7834 6.70528C12.5816 6.5816 12.4086 6.40865 12.0627 6.06274Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const StudyMaterialIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4 19V6.2C4 5.0799 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V17H6C4.89543 17 4 17.8954 4 19ZM4 19C4 20.1046 4.89543 21 6 21H20M9 7H15M9 11H15M19 17V21"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const ExamIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M15 12H12M15 16H12M9 12H9.01M9 16H9.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const HomeIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M9 16.9999H15M3 14.5999V12.1301C3 10.9814 3 10.407 3.14805 9.87807C3.2792 9.40953 3.49473 8.96886 3.78405 8.57768C4.11067 8.13608 4.56404 7.78346 5.47078 7.07822L8.07078 5.056C9.47608 3.96298 10.1787 3.41648 10.9546 3.2064C11.6392 3.02104 12.3608 3.02104 13.0454 3.2064C13.8213 3.41648 14.5239 3.96299 15.9292 5.056L18.5292 7.07822C19.436 7.78346 19.8893 8.13608 20.2159 8.57768C20.5053 8.96886 20.7208 9.40953 20.8519 9.87807C21 10.407 21 10.9814 21 12.1301V14.5999C21 16.8401 21 17.9603 20.564 18.8159C20.1805 19.5685 19.5686 20.1805 18.816 20.564C17.9603 20.9999 16.8402 20.9999 14.6 20.9999H9.4C7.15979 20.9999 6.03969 20.9999 5.18404 20.564C4.43139 20.1805 3.81947 19.5685 3.43597 18.8159C3 17.9603 3 16.8401 3 14.5999Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const CoursesIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M2 10L12 4.5L22 10L17.9457 12.2298M2 10L6.05427 12.2298M2 10V16M6 17.5V12.5C6 12.4084 6.01848 12.3182 6.05427 12.2298M6 17.5C6 18.6046 8.68629 19.5 12 19.5C15.3137 19.5 18 18.6046 18 17.5M6 17.5C6 16.3954 8.68629 15.5 12 15.5C15.3137 15.5 18 16.3954 18 17.5M18 17.5V12.5C18 12.4084 17.9815 12.3182 17.9457 12.2298M17.9457 12.2298C17.9334 12.1993 17.9189 12.1691 17.9025 12.139C17.3927 11.2067 14.9439 10.5 12 10.5C9.05606 10.5 6.60733 11.2067 6.09749 12.139C6.08105 12.1691 6.06663 12.1993 6.05427 12.2298"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const ProfileIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const NotificationIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const SearchIcon = ({ size = 24, color = '#6B7280' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const BackArrowIcon = ({ size = 24, color = '#2D2D2D' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      fill={color}
    />
  </Svg>
);

export const PlayIcon = ({ size = 24, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const ForwardIcon = ({ size = 24, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: [{ rotate: '180deg' }] }}>
    <Path
      d="M4.65511 9.87598C3.74757 10.602 3.2938 10.965 3.12952 11.4036C2.98547 11.7881 2.98547 12.2118 3.12952 12.5963C3.2938 13.0349 3.74757 13.3979 4.65511 14.1239L9.40064 17.9203C10.2328 18.5861 10.6489 18.9189 10.9991 18.9193C11.3036 18.9196 11.5917 18.7812 11.7817 18.5432C12.0002 18.2695 12.0002 17.7366 12.0002 16.6709V7.32894C12.0002 6.26324 12.0002 5.73039 11.7817 5.45671C11.5917 5.2187 11.3036 5.08024 10.9991 5.08057C10.6489 5.08095 10.2328 5.41381 9.40064 6.07955L4.65511 9.87598Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M14.1236 9.50116C13.0559 10.3553 12.5221 10.7824 12.3288 11.2983C12.1594 11.7507 12.1594 12.2492 12.3288 12.7015C12.5221 13.2175 13.0559 13.6446 14.1236 14.4987L18.4006 17.9203C19.2328 18.5861 19.6489 18.9189 19.9991 18.9193C20.3036 18.9196 20.5917 18.7812 20.7817 18.5432C21.0002 18.2695 21.0002 17.7366 21.0002 16.6709V7.32894C21.0002 6.26324 21.0002 5.73039 20.7817 5.45671C20.5917 5.2187 20.3036 5.08024 19.9991 5.08057C19.6489 5.08095 19.2328 5.41381 18.4006 6.07955L14.1236 9.50116Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const PauseIcon = ({ size = 24, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Rect x="6" y="4" width="4" height="16" rx="1" fill={color} />
    <Rect x="14" y="4" width="4" height="16" rx="1" fill={color} />
  </Svg>
);

export const ExpandIcon = ({ size = 24, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M4 9V5.6C4 5.03995 4 4.75992 4.10899 4.54601C4.20487 4.35785 4.35785 4.20487 4.54601 4.109C4.75992 4 5.03995 4 5.6 4L9 4M4 15V18.4C4 18.9601 4 19.2401 4.10899 19.454C4.20487 19.6422 4.35785 19.7951 4.54601 19.891C4.75992 20 5.03995 20 5.6 20L9 20M15 4H18.4C18.9601 4 19.2401 4 19.454 4.10899C19.6422 4.20487 19.7951 4.35785 19.891 4.54601C20 4.75992 20 5.03995 20 5.6V9M20 15V18.4C20 18.9601 20 19.2401 19.891 19.454C19.7951 19.6422 19.6422 19.7951 19.454 19.891C19.2401 20 18.9601 20 18.4 20H15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const CompressIcon = ({ size = 24, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M9 4V9H4M15 4V9H20M4 15H9V20M15 20V15H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const VolumeMaxIcon = ({ size = 24, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M11 5L6 9H2V15H6L11 19V5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M19.07 4.93C20.9447 6.80528 21.9979 9.34836 21.9979 12C21.9979 14.6516 20.9447 17.1947 19.07 19.07M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 12C17.0039 13.3308 16.4774 14.6024 15.54 15.54"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const VolumeXMarkIcon = ({ size = 24, color = '#FFFFFF' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M11 5L6 9H2V15H6L11 19V5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M23 9L17 15M17 9L23 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const DownloadIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const CardIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
      stroke={color}
      strokeWidth="2"
      fill="none"
    />
    <Path
      d="M10 16H6M14 16H12.5M2 10L22 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </Svg>
);

export const MoonIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M21.0672 11.8568L20.4253 11.469L21.0672 11.8568ZM12.1432 2.93276L11.7553 2.29085V2.29085L12.1432 2.93276ZM21.25 12C21.25 17.1086 17.1086 21.25 12 21.25V22.75C17.9371 22.75 22.75 17.9371 22.75 12H21.25ZM12 21.25C6.89137 21.25 2.75 17.1086 2.75 12H1.25C1.25 17.9371 6.06294 22.75 12 22.75V21.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75V1.25C6.06294 1.25 1.25 6.06294 1.25 12H2.75ZM15.5 14.25C12.3244 14.25 9.75 11.6756 9.75 8.5H8.25C8.25 12.5041 11.4959 15.75 15.5 15.75V14.25ZM20.4253 11.469C19.4172 13.1373 17.5882 14.25 15.5 14.25V15.75C18.1349 15.75 20.4407 14.3439 21.7092 12.2447L20.4253 11.469ZM9.75 8.5C9.75 6.41182 10.8627 4.5828 12.531 3.57467L11.7553 2.29085C9.65609 3.5593 8.25 5.86509 8.25 8.5H9.75ZM12 2.75C11.9115 2.75 11.8077 2.71008 11.7324 2.63168C11.6686 2.56527 11.6538 2.50244 11.6503 2.47703C11.6461 2.44587 11.6482 2.35557 11.7553 2.29085L12.531 3.57467C13.0342 3.27065 13.196 2.71398 13.1368 2.27627C13.0754 1.82126 12.7166 1.25 12 1.25V2.75ZM21.7092 12.2447C21.6445 12.3518 21.5541 12.3539 21.523 12.3497C21.4976 12.3462 21.4347 12.3314 21.3683 12.2676C21.2899 12.1923 21.25 12.0885 21.25 12H22.75C22.75 11.2834 22.1787 10.9246 21.7237 10.8632C21.286 10.804 20.7293 10.9658 20.4253 11.469L21.7092 12.2447Z"
      fill={color}
    />
  </Svg>
);

export const QuestionIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M12 17H12.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const LanguageIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

export const InfoIcon = ({ size = 24, color = '#1A3C8E' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <Path
      d="M12 16V12M12 8H12.01"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);
