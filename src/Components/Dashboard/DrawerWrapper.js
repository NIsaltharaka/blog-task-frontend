import React from 'react';
import ResponsiveDrawer from './Drawer'; // Adjust the import path as needed

const DrawerWrapper = ({ children }) => {
  return (
    <ResponsiveDrawer>
      {children}
    </ResponsiveDrawer>
  );
};

export default DrawerWrapper;
