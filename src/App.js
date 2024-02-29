import { CloseButton } from 'components/common/Toast';
import SettingsPanel from 'components/settings-panel/SettingsPanel';
import SettingsToggle from 'components/settings-panel/SettingsToggle';
import is from 'is_js';
import { useAppContext } from 'Main';
import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import FalconRoutes from 'routes';

import AuthService from 'services/auth.service';
import AuthVerify from 'services/utils/AuthVerify';

const App = () => {
  const HTMLClassList = document.getElementsByTagName('html')[0].classList;
  const {
    config: { navbarPosition }
  } = useAppContext();
  //const { user, role } = useContext(UserContext);

  useEffect(() => {
    if (is.windows()) {
      HTMLClassList.add('windows');
    }
    if (is.chrome()) {
      HTMLClassList.add('chrome');
    }
    if (is.firefox()) {
      HTMLClassList.add('firefox');
    }
    if (is.safari()) {
      HTMLClassList.add('safari');
    }
  }, [HTMLClassList]);

  useEffect(() => {
    if (navbarPosition === 'double-top') {
      HTMLClassList.add('double-top-nav-layout');
    }
    return () => HTMLClassList.remove('double-top-nav-layout');
  }, [navbarPosition]);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router basename={process.env.PUBLIC_URL}>
      {/* <UserContext.Provider value={{ user, role }}> */}
      <FalconRoutes />
      <SettingsToggle />
      <SettingsPanel />
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position={toast.POSITION.BOTTOM_LEFT}
      />
      <AuthVerify logOut={logOut} />
      {/* </UserContext.Provider> */}
    </Router>
  );
};

export default App;
