import React from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import logo from '../../assets/images/logo.svg';
import sygnet from '../../assets/images/sygnet.svg';
import avatar from '../../assets/images/avatar.jpg';
import { logoutSuccess } from '../../modules/Auth/actions';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 89, height: 25, alt: 'Bitcoin Logo' }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: 'Bitcoin Logo' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img
              src={avatar}
              className="img-avatar"
              alt="admin@bootstrapmaster.com"
            />
          </DropdownToggle>
          <DropdownMenu right style={{ right: 0 }}>
            <DropdownItem onClick={() => dispatch(logoutSuccess())}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </>
  );
};

Header.propTypes = {};
Header.defaultProps = {};

export default Header;
