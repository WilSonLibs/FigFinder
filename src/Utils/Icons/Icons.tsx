import React from 'react';
import {MaterialIcons} from '../AppConstant';

interface IconProps {
  color: string;
}

export const BarIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="format-list-bulleted" size={25} color={color} />
);

export const TeamIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="accessibility-new" size={25} color={color} />
);

export const SettingsIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="settings" size={25} color={color} />
);

export const CartIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="shopping-cart" size={25} color={color} />
);
export const LogoutMemberIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="person-off" size={25} color={color} />
);
export const EmailIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="email" size={25} color={color} />
);
export const PhoneIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="phone" size={25} color={color} />
);
export const PersonIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="person" size={25} color={color} />
);
export const FacebookIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="facebook" size={25} color={color} />
);
export const GoogleIcon: React.FC<IconProps> = ({color}) => (
  <MaterialIcons name="add-to-drive" size={25} color={color} />
);
