import React from 'react';
import AdminRequestTable from './adminTables/AdminRequestTable';
import AdminActiveTable from './adminTables/AdminActiveTable';
import Loader from '../../components/loader/Loader.js';
import UseLoader from '../../components/loader/components/UseLoader.js';

function UserManager() {
  const loading = UseLoader(1000); 

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <AdminRequestTable />
      <AdminActiveTable />
    </>
  );
}

export default UserManager;
