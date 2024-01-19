import React, { useEffect, useState } from "react";
//Components
import CancelButton from "../../components/CancelButton";
import DefaultContent from "../../components/content/defaultContent";
import Form from "../../components/Form";
import PageTitle from "../../components/PageTitle";
import SaveButton from "../../components/SaveButton";
import SingleCheckbox from "../../components/SingleCheckbox";
import { Block } from "../../helpers/Page";
//Service
import PageService, { getBlockAttributesById } from "../../services/PageService";
import { saveBlockSetting } from "../../actions/pageBlock";
import "./page.scss";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Setting Constants
export const Settings = {
  // Header Settings
  ENABLE_HEADER_LOGO: "enable_header_logo",
  ENABLE_HEADER_LOGIN_BUTTON: "enable_header_login_button",
  ENABLE_HEADER_REGISTER_BUTTON: "enable_header_register_button",
  ENABLE_USER_DROPDOWN: "enable_user_dropdown",
  ENABLE_HEADER_NAVLIST: "enable_header_nav_list",
  // Footer Settings
  ENABLE_FOOTER_COPYRIGHTS_TEXT: "enable_footer_copyrights_text",
  ENABLE_FOOTER_SOCIAL_ICON: "enable_footer_social_icons",
};

// Header Setting Constants
export const HeaderSettings = [
  {
    name: Settings.ENABLE_HEADER_LOGO,
    label: "Logo",
  },
  {
    name: Settings.ENABLE_HEADER_LOGIN_BUTTON,
    label: "Login Button",
  },
  {
    name: Settings.ENABLE_HEADER_REGISTER_BUTTON,
    label: "Register Button",
  },
  {
    name: Settings.ENABLE_USER_DROPDOWN,
    label: "User Dropdown",
  },
  {
    name: Settings.ENABLE_HEADER_NAVLIST,
    label: "Navigaion List",
  },
];

//Footer Setting Constants
export const FooterSettings = [
  {
    name: Settings.ENABLE_FOOTER_COPYRIGHTS_TEXT,
    label: "Copy Rights Text",
  },
  {
    name: Settings.ENABLE_FOOTER_SOCIAL_ICON,
    label: "Social Icons",
  },
];

const BlockDetail = (props) => {
  const { match, history } = props;

  const [pageData, setPageData] = useState();
  const [blockData, setBlockData] = useState({});

  const getPageDetail = async () => {
    const pageDetail = await PageService.getById(match.params.id);
    setPageData(pageDetail);
  };
  const getBlockDetail = async () => {
    const pageDetail = await PageService.getBlockAttributesById(
      match.params.section,
      match.params.id
    );
    const value = {};
    pageDetail &&
      pageDetail.forEach((detail) => {
        if (detail.value == "true") value[detail.name] = detail.value;
      });
    setBlockData(value);
  };

  useEffect(() => {
    getPageDetail();
    getBlockDetail();
  }, []);

  const submit = (values) => {
    const pageId = match.params.id;
    const blockId = match.params.section;
    const data = new FormData();
    if (values.enable_header_logo !== undefined) {
      data.append("enable_header_logo", values.enable_header_logo);
    }
    if (values.enable_header_login_button !== undefined) {
      data.append(
        "enable_header_login_button",
        values.enable_header_login_button
      );
    }
    if (values.enable_header_register_button !== undefined) {
      data.append(
        "enable_header_register_button",
        values.enable_header_register_button
      );
    }
    if (values.enable_user_dropdown !== undefined) {
      data.append("enable_user_dropdown", values.enable_user_dropdown);
    }
    if (values.enable_header_nav_list !== undefined) {
      data.append("enable_header_nav_list", values.enable_header_nav_list);
    }
    if (values.enable_footer_copyrights_text !== undefined) {
      data.append(
        "enable_footer_copyrights_text",
        values.enable_footer_copyrights_text
      );
    }
    if (values.enable_footer_social_icons !== undefined) {
      data.append(
        "enable_footer_social_icons",
        values.enable_footer_social_icons
      );
    }
    // Save  Block settings
    saveBlockSetting(data, pageId, blockId);
  };

  const initialValues = {
    ...blockData,
  };

  return (
    <div>
      {/* Breadcrumb Start */}
      <div className="d-flex align-items-center pb-2">
        <span
          className="cursor-pointer"
          onClick={() => {
            history.push(`/pages/pagelist`);
          }}
        >
          Page
        </span>
        <span className="d-inline-flex page-input-detail">

          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <span
          className={`${pageData && pageData.page_name ? "text-dark font-weight-bold" : ""
            } d-inline-flex `}
        >
          <span
            className="cursor-pointer"
            onClick={() => {
              history.push(`/pages/pagelist/detail/${match.params.id}`);
            }}
          >
            {pageData && pageData.page_name}
          </span>
        </span>
        <span className="d-inline-flex page-input-detail">

          <FontAwesomeIcon icon={faChevronRight} />

        </span>
        <span
          className={`${match.params && match.params.section
            ? "text-dark font-weight-bold"
            : ""
            } d-inline-flex `}
        >
          <span>{match.params.section}</span>
        </span>
      </div>
      {/* Breadcrumb End */}

      <PageTitle label={match.params.section} />
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={(values) => {
          submit(values);
        }}
      >
        {match.params.section == Block.BLOCK_HEADER && (
          <DefaultContent>
            {HeaderSettings &&
              HeaderSettings.map((list) => {
                let { name, label } = list;
                return (
                  <div className="form-wrapper">
                    <div className="field-wrapper pb-3">
                      <SingleCheckbox
                        name={name}
                        fontBolded
                        label={label}
                        className="accepted-terms mb-0 pb-0 mr-3"
                      />
                    </div>
                  </div>
                );
              })}
          </DefaultContent>
        )}
        {match.params.section == Block.BLOCK_FOOTER && (
          <DefaultContent>
            {FooterSettings &&
              FooterSettings.map((list) => {
                let { name, label } = list;
                return (
                  <div className="form-wrapper">
                    <div className="field-wrapper pb-3">
                      <SingleCheckbox
                        name={name}
                        fontBolded
                        label={label}
                        className="accepted-terms mb-0 pb-0 mr-3"
                      />
                    </div>
                  </div>
                );
              })}
          </DefaultContent>
        )}
        <div className="btn-wrapper">
          <SaveButton />
          <CancelButton
            onClick={() =>
              history.push(`/pages/pagelist/detail/${match.params.id}`)
            }
          />
        </div>
      </Form>
    </div>
  );
};

export default BlockDetail;
