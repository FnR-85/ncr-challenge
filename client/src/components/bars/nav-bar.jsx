import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useNavigationItems from '../../hooks/navigation-items';
import Icon from '../icon';
import { useBars } from './bars-context';
// import { useGlobalEvent, useDebouncedFn } from "beautiful-react-hooks";

const StyledNavToggler = styled.button`
  background-color: #0d6efd;
  margin-right: 20px;
`;

const StyledNavText = styled.a`
  font-weight: bold;
  font-size: x-large;
  top: 4px;

  &.hide {
    display: none;
  }
`;

const StyledNavItem = styled(Link)`
  background-color: #3f51b5;
  border-radius: 10px;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #3f51e5;
  }
`;

const StyledNavItemLeft = styled.div`
  display: inline;

  // icon
  top: 2px;
  position: relative;
`;

const StyledNavItemRight = styled.span`
  display: inline-block;

  // text
  font-size: larger;
  font-weight: bold;
`;

const StyledNavSection = styled.div`
  width: 100%;
  z-index: 1;
`;

const StyledDivColTitle = styled.div`
  &.sidebar-small {
    min-width: 125px;
  }
  &.sidebar-large {
    min-width: 315px;
  }
`;

export default function NavBar(props) {
  // const { logOut } = useSession();
  const [navigationItems] = useNavigationItems();
  const { sidebarOpen, setSidebarOpen } = useBars();

  // const handleMenuLogOut = () => {
  //   logOut();
  // }

  // const checkRenderLogOut = () => {
  //   return window.innerWidth < 1400 && sidebarOpen;
  // }

  const onSidebarButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const updateItems = () => {
    return  (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-inline-block">
        {
          navigationItems ? 
          navigationItems.map((item, index) =>
            !item.condition || (item.condition && item.condition()) ? (
              <StyledNavItem to={item.path} key={item.id} className="d-inline-block align-text-top">
                <StyledNavItemLeft className="fs-4">
                  <Icon fontName={item.icon} medium color="#fff"></Icon>
                </StyledNavItemLeft>
                <StyledNavItemRight
                  className="nav-link active"
                  aria-current="page"
                  href={item.path}
                >
                  {item.text}
                </StyledNavItemRight>
              </StyledNavItem>
            ) : (
              ''
            ),
          ) 
          : 
          <></>
        }
      </ul>
    );
  };

  return (
    <nav className="navbar navbar-expand-xxl navbar-dark bg-primary">
      <div className="container-fluid">
        <StyledNavSection>
          <div className="row flex-nowrap">
            <StyledDivColTitle className={`col-2 align-self-start ${sidebarOpen ? 'sidebar-large' : 'sidebar-small'}`}>
              <StyledNavToggler
                type="button"
                className="btn btn-secondary"
                onClick={onSidebarButtonClick}
              >
                <span className="navbar-toggler-icon"></span>
              </StyledNavToggler>
              <StyledNavText className={`navbar-brand ${!sidebarOpen ? 'hide' : 'd-inline-block'}`} href="#">
                {props.title}
              </StyledNavText>
            </StyledDivColTitle>

            <div className="col-8">{updateItems()}</div>
          </div>
        </StyledNavSection>
      </div>
    </nav>
  );
}
