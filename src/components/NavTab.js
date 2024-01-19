import React from 'react';
import { Nav, NavItem, NavLink } from "reactstrap";
import CountBadge from './CountBadge';
const NavTab = (props) => {

    const { list } = props;

    return (

        <div>
            <Nav tabs className="admin-tabs">
                {list &&
                    list.length > 0 &&
                    list.map((data) => (
                        <>
                            <div>
                                <NavItem>
                                    <NavLink
                                        className={data.className}
                                        onClick={data.onClick}
                                    >
                                        {data.label}
                                        <CountBadge count={data.count} />
                                    </NavLink>
                                </NavItem>
                            </div>

                        </>
                    ))}
            </Nav>
        </div>
    );
}

export default NavTab;