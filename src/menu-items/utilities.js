// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';
import { BiSolidCricketBall } from "react-icons/bi";
// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  BiSolidCricketBall
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'Owner Approve',
      title: 'Owner Approve',
      type: 'item',
      url: '/admin/owner-approve',
      icon: icons.BiSolidCricketBall,
      breadcrumbs: false
    },
    {
      id: 'Box Approve',
      title: 'Box Approve',
      type: 'item',
      url: '/admin/box-approve',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/admin/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;
