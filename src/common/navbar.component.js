import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavbarCmp extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navigationLinks: [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' },
        { name: 'Signup', path: '/signup' },
        { name: 'Mail', path: '/mail' },
        { name: 'Chat', path: '/chat' },
      ]
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  cst() {
    console.log(this.props)
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand href="/">{this.props.users.email ? "Hello " + this.props.users.email : "SignIn" }</NavbarBrand>
          <button onClick={this.cst.bind(this)}>Chk</button>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.state.navigationLinks.map(link => {
                return (
                  <NavItem key={link.name}>
                    <Link className="navbar-links" to={link.path}>{link.name}</Link>
                  </NavItem>    
                )
              })}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

// Navbar.propTypes = {
//   light: PropTypes.bool,
//   inverse: PropTypes.bool,
//   full: PropTypes.bool,
//   fixed: PropTypes.string,
//   color: PropTypes.string,
//   role: PropTypes.string,
//   toggleable: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//   tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
//   // pass in custom element to use
// }

const mapStateToProps = (state) => state
export default connect(mapStateToProps)(NavbarCmp)