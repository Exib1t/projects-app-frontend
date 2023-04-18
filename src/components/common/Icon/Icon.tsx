import React, { FC } from 'react';
import { SvgIcon } from '@mui/material';
import { IconTypes } from '../../../constants';

type Props = {
  type: IconTypes;
  fontSize?: number | string;
  props?: any;
};

const Icon: FC<Props> = ({ type, fontSize, ...rest }) => {
  switch (type) {
    case 'account':
      return (
        <SvgIcon width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path
            d="M6.48773 8.66438C6.40697 8.6563 6.31005 8.6563 6.22121 8.66438C5.2942 8.63291 4.41584 8.24185 3.77214 7.57403C3.12843 6.90621 2.76994 6.01406 2.77257 5.08652C2.77257 3.10779 4.37171 1.50058 6.35851 1.50058C6.82889 1.4921 7.29634 1.57634 7.73416 1.74851C8.17199 1.92068 8.57161 2.1774 8.91022 2.50401C9.24883 2.83062 9.51979 3.22073 9.70764 3.65205C9.89549 4.08338 9.99654 4.54749 10.005 5.01787C10.0135 5.48825 9.92926 5.9557 9.75709 6.39352C9.58492 6.83134 9.3282 7.23097 9.00159 7.56958C8.67498 7.90819 8.28488 8.17915 7.85355 8.367C7.42222 8.55484 6.95811 8.6559 6.48773 8.66438ZM2.44952 11.6446C0.495018 12.953 0.495018 15.0851 2.44952 16.3855C4.67054 17.8715 8.31301 17.8715 10.534 16.3855C12.4885 15.0771 12.4885 12.9449 10.534 11.6446C8.32108 10.1666 4.67861 10.1666 2.44952 11.6446Z"
            stroke="#D6D6D6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );
    case 'preferences':
      return (
        <SvgIcon width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path
            d="M9.51606 12.0426C10.1904 12.0426 10.8372 11.7747 11.314 11.2979C11.7908 10.821 12.0587 10.1743 12.0587 9.49994C12.0587 8.82559 11.7908 8.17885 11.314 7.70201C10.8372 7.22516 10.1904 6.95728 9.51606 6.95728C8.8417 6.95728 8.19496 7.22516 7.71812 7.70201C7.24128 8.17885 6.97339 8.82559 6.97339 9.49994C6.97339 10.1743 7.24128 10.821 7.71812 11.2979C8.19496 11.7747 8.8417 12.0426 9.51606 12.0426Z"
            stroke="#D6D6D6"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.04053 10.2458V8.75415C1.04053 7.87269 1.76095 7.14379 2.65088 7.14379C4.18496 7.14379 4.81215 6.05892 4.04088 4.72826C3.60015 3.96546 3.86289 2.97382 4.63417 2.53309L6.10044 1.69401C6.77001 1.29566 7.63452 1.53297 8.03287 2.20254L8.1261 2.36358C8.8889 3.69424 10.1433 3.69424 10.9146 2.36358L11.0078 2.20254C11.4061 1.53297 12.2706 1.29566 12.9402 1.69401L14.4065 2.53309C15.1778 2.97382 15.4405 3.96546 14.9998 4.72826C14.2285 6.05892 14.8557 7.14379 16.3898 7.14379C17.2712 7.14379 18.0001 7.86422 18.0001 8.75415V10.2458C18.0001 11.1273 17.2797 11.8562 16.3898 11.8562C14.8557 11.8562 14.2285 12.9411 14.9998 14.2717C15.4405 15.043 15.1778 16.0262 14.4065 16.4669L12.9402 17.306C12.2706 17.7043 11.4061 17.467 11.0078 16.7975L10.9146 16.6364C10.1518 15.3058 8.89737 15.3058 8.1261 16.6364L8.03287 16.7975C7.63452 17.467 6.77001 17.7043 6.10044 17.306L4.63417 16.4669C4.26472 16.2542 3.99475 15.9036 3.88352 15.492C3.77229 15.0805 3.82889 14.6416 4.04088 14.2717C4.81215 12.9411 4.18496 11.8562 2.65088 11.8562C1.76095 11.8562 1.04053 11.1273 1.04053 10.2458Z"
            stroke="#D6D6D6"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );
    case 'edit':
      return (
        <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path
            d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z"
            stroke="black"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.9102 4.1499C15.2417 5.32737 15.8701 6.39997 16.7351 7.26495C17.6001 8.12993 18.6727 8.75831 19.8502 9.0899"
            stroke="black"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );
    case 'logout':
      return (
        <SvgIcon width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path
            d="M7.4 6.04998C7.71 2.44998 9.56 0.97998 13.61 0.97998H13.74C18.21 0.97998 20 2.76998 20 7.23998V13.76C20 18.23 18.21 20.02 13.74 20.02H13.61C9.59 20.02 7.74 18.57 7.41 15.03M13.5 10.49H2.12M4.35 7.13998L1 10.49L4.35 13.84"
            stroke="#D6D6D6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );
    case 'other':
      return (
        <SvgIcon width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path
            d="M8.63001 5.82C9.82001 5.82 10.79 4.85 10.79 3.66C10.79 2.47 9.82001 1.5 8.63001 1.5C7.44001 1.5 6.47001 2.47 6.47001 3.66C6.47001 4.85 7.44001 5.82 8.63001 5.82ZM3.42001 15.5C4.61001 15.5 5.58001 14.53 5.58001 13.34C5.58001 12.15 4.61001 11.18 3.42001 11.18C2.23001 11.18 1.26001 12.15 1.26001 13.34C1.26001 14.53 2.22001 15.5 3.42001 15.5ZM13.84 15.5C15.03 15.5 16 14.53 16 13.34C16 12.15 15.03 11.18 13.84 11.18C12.65 11.18 11.68 12.15 11.68 13.34C11.68 14.53 12.65 15.5 13.84 15.5Z"
            stroke="white"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );
    case 'sort-up':
      return (
        <SvgIcon width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path
            d="M7.88983 18.447L5.30543 21.0314V0.231445H3.71145V21.0314L1.1271 18.447L0 19.5741L4.50844 24.0826L9.01693 19.5741L7.88983 18.447Z"
            fill="#181818"
          />
          <path d="M12.1199 22.1488H19.2929V20.5548H13.8614L19.2929 15.5371V13.3818H12.5184V14.9758H17.5514L12.1199 19.9935V22.1488Z" fill="#181818" />
          <path
            d="M14.7335 1.82544L11.8112 10.5924H13.4914L14.4212 7.80289H17.39L18.3198 10.5924H20L17.0777 1.82544H14.7335ZM14.9527 6.2089L15.8825 3.41943H15.9291L16.8589 6.2089H14.9527Z"
            fill="#181818"
          />
        </SvgIcon>
      );
    case 'sort-down':
      return (
        <SvgIcon width="36" height="43" viewBox="0 0 36 43" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path d="M2.00549 10.028L6.60422 5.42943V42.4412H9.44058V5.42943L14.0393 10.0281L16.0449 8.02249L8.0224 0L0 8.02249L2.00549 10.028Z" fill="#181818" />
          <path d="M34.3301 23.2957H22.2755V26.132H31.2313L21.5664 35.0606V38.8957H34.3301V36.0593H24.6651L34.3301 27.1308V23.2957Z" fill="#181818" />
          <path
            d="M30.3886 2.73193H26.217L21.0168 18.332H24.0066L25.6614 13.3683H30.9441L32.5987 18.332H35.5887L30.3886 2.73193ZM26.6067 10.5319L28.2613 5.5683H28.3442L29.9988 10.5319H26.6067Z"
            fill="#181818"
          />
        </SvgIcon>
      );
    case 'task':
      return (
        <SvgIcon width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <rect width="15" height="15" rx="2" fill="#DBA34E" />
          <line x1="2.95785" y1="8.84766" x2="5.54364" y2="11.4334" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 4.5L5.67376 11.3673" stroke="#181818" strokeWidth="2" strokeLinecap="round" />
        </SvgIcon>
      );
    case 'bug':
      return (
        <SvgIcon width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <rect width="15" height="15" rx="2" fill="#DBA34E" />
          <circle cx="7.5" cy="7.5" r="3.5" fill="#181818" />
        </SvgIcon>
      );
    case 'edit-pencil':
      return (
        <SvgIcon width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path
            d="M6.63163 2.71954L2.52663 7.06454C2.37163 7.22954 2.22163 7.55454 2.19163 7.77954L2.00663 9.39954C1.94163 9.98454 2.36163 10.3845 2.94163 10.2845L4.55163 10.0095C4.77663 9.96954 5.09163 9.80454 5.24663 9.63454L9.35163 5.28954C10.0616 4.53954 10.3816 3.68454 9.27663 2.63954C8.17663 1.60454 7.34163 1.96954 6.63163 2.71954Z"
            stroke="#181818"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.94653 3.44434C6.05135 4.11476 6.37583 4.7314 6.86904 5.19746C7.36225 5.66352 7.99625 5.9526 8.67153 6.01934"
            stroke="#181818"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );
    case 'priority-medium':
      return (
        <SvgIcon width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path d="M4 7.53564L7.53553 4.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M11.071 7.53564L7.53551 4.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M4 10.5356L7.53553 7.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M11.071 10.5356L7.53551 7.00011" stroke="#DBA34E" strokeLinecap="round" />
        </SvgIcon>
      );
    case 'priority-low':
      return (
        <SvgIcon width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path d="M4 9.53564L7.53553 6.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M11.071 9.53564L7.53551 6.00011" stroke="#DBA34E" strokeLinecap="round" />
        </SvgIcon>
      );
    case 'priority-high':
      return (
        <SvgIcon width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path d="M4 9.53564L7.53553 6.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M11.071 9.53564L7.53551 6.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M4 6.53564L7.53553 3.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M11.071 6.53564L7.53551 3.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M4 12.5356L7.53553 9.00011" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M11.071 12.5356L7.53551 9.00011" stroke="#DBA34E" strokeLinecap="round" />
        </SvgIcon>
      );
    case 'back':
      return (
        <SvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" sx={{ fontSize }} {...rest}>
          <path
            d="M7.13 18.3101H15.13C17.89 18.3101 20.13 16.0701 20.13 13.3101C20.13 10.5501 17.89 8.31006 15.13 8.31006H4.13"
            stroke="#181818"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6.43 10.8099L3.87 8.24994L6.43 5.68994" stroke="#181818" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </SvgIcon>
      );
    default:
      return null;
  }
};

export default Icon;
