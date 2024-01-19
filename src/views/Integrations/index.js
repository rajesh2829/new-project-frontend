import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import ChatTab from "./components/Chat";
import SlackPage from "./components/SlackPage";
import WhatsApp from "./components/WhatsApp";

export const Tab = {
    CHAT: "Chat",
    SLACK: "Slack",
    WHATSAPP: "WhatsApp"
}

const Integrations = (props) => {
    let tab = props?.props?.match?.params?.id
    const [activeTab, setActiveTab] = useState(Tab.CHAT)

    let { history } = props;

    useEffect(() => {
        if (tab == undefined) {
            setActiveTab(Tab.CHAT)
        } else {
            setActiveTab(tab)

        }
    }, [tab])

    const toggle = (tab) => {
        setActiveTab(tab)
        history.push(`/integrations/${tab}`)
    }

    return (
        <>
            {activeTab == Tab.CHAT &&
                <Nav tabs className="admin-tabs mb-1">
                    <NavItem>
                        <NavLink
                            className={classNames({
                                active: activeTab === Tab.CHAT,
                            })}
                            onClick={() => {
                                toggle(Tab.CHAT);
                            }}
                        >
                            Chat
                        </NavLink>
                    </NavItem>
                </Nav >}

            <TabContent activeTab={activeTab}>
                <TabPane tabId={Tab.CHAT}>
                    <ChatTab history={history} onClickValue={(e) => toggle(e)} />
                </TabPane>
                <TabPane tabId={Tab.SLACK}>
                    <SlackPage history={history} settings={props?.settings} />
                </TabPane>
                <TabPane tabId={Tab.WHATSAPP}>
                    <WhatsApp history={history} settings={props?.settings} />
                </TabPane>
            </TabContent>
        </>
    )

}

export default Integrations;