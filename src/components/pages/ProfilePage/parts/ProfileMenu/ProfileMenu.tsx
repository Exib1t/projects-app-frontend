import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Icon from '../../../../common/Icon/Icon';
import { IconTypes } from '../../../../../constants';
import { useAuth } from '../../../../../services/authProvider';

const ProfileMenu = () => {
  const { logout } = useAuth();

  return (
    <List sx={{ width: '100%', maxWidth: '300px', backgroundColor: 'secondary.dark', height: 'calc(100vh - 64px)', py: 0 }}>
      <ListItemButton sx={{ justifyContent: 'space-between', px: 5 }}>
        <ListItemText primary="My Account" />
        <ListItemIcon sx={{ minWidth: 'auto' }}>
          <Icon type={IconTypes.account} />
        </ListItemIcon>
      </ListItemButton>
      <Divider variant="middle" sx={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
      <ListItemButton sx={{ justifyContent: 'space-between', px: 5 }}>
        <Accordion>
          <AccordionSummary>
            <ListItemText primary="Preferences" />
            <ListItemIcon sx={{ minWidth: 'auto' }}>
              <Icon type={IconTypes.preferences} />
            </ListItemIcon>
          </AccordionSummary>
          <AccordionDetails>
            <ListItemButton sx={{ justifyContent: 'space-between', paddingLeft: 2, paddingRight: '0' }}>
              <ListItemText primary="Theme" />
            </ListItemButton>
            <ListItemButton sx={{ justifyContent: 'space-between', paddingLeft: 2, paddingRight: '0' }}>
              <ListItemText primary="Colors" />
            </ListItemButton>
          </AccordionDetails>
        </Accordion>
      </ListItemButton>
      <Divider variant="middle" sx={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
      <ListItemButton sx={{ justifyContent: 'space-between', px: 5 }} disabled>
        <ListItemText primary="Other" />
        <ListItemIcon sx={{ minWidth: 'auto' }}>
          <Icon type={IconTypes.other} />
        </ListItemIcon>
      </ListItemButton>
      <Divider variant="middle" sx={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
      <ListItemButton sx={{ justifyContent: 'space-between', px: 5 }} onClick={logout}>
        <ListItemText primary="Logout" />
        <ListItemIcon sx={{ minWidth: 'auto' }}>
          <Icon type={IconTypes.logout} />
        </ListItemIcon>
      </ListItemButton>
    </List>
  );
};

export default ProfileMenu;
