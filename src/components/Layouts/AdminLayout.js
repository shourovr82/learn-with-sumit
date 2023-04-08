import React from 'react';
import { Outlet } from 'react-router-dom';
import useAdminAuthCheck from '../hooks/useAdminAuthCheck';
import AdminNavbar from '../../pages/Common/AdminNavbar';

const AdminLayout = () => {
  const authChecked = useAdminAuthCheck();
  return !authChecked ? (
    <div>Checking Admin Authentication</div>
  ) : (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;