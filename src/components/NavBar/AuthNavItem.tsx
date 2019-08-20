import React from 'react'
import {
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import UserAvatar from './UserAvatar'



interface AuthNavItemProps {
    isAuthenticated: boolean
    user: any,
    authButtonMethod?: React.MouseEventHandler<HTMLElement>
}

const AuthNavItem: React.SFC<AuthNavItemProps> = ({isAuthenticated, user, authButtonMethod}) => {
    // If authenticated, return a dropdown with the user's info and a
    // sign out button
    if (isAuthenticated) {
        return (
            <UncontrolledDropdown>
                <DropdownToggle nav caret>
                    <UserAvatar user={user} />
                </DropdownToggle>
                <DropdownMenu right>
                    <h5 className="dropdown-item-text mb-0">{user.displayName}</h5>
                    <p className="dropdown-item-text text-muted mb-0">{user.email}</p>
                    <DropdownItem divider />
                    <DropdownItem onClick={authButtonMethod}>Sign Out</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    // Not authenticated, return a sign in link
    return (
        <NavItem>
            <NavLink onClick={authButtonMethod}>Sign In</NavLink>
        </NavItem>
    );
}

export default AuthNavItem