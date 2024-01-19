import React, { useEffect, useRef, useState } from "react";
//Service
import { getCompanySettings, saveSetting } from "../../services/SettingService";
import DefaultContent from "../../components/content/defaultContent";
import Form from "../../components/Form";
import SaveButton from "../../components/SaveButton";
//Lib

import Footer from "../themeSetting/footer";
import Header from "../themeSetting/header";
import LeftNavigation from "../themeSetting/leftNavigation";
import LegalDisclosure from "../themeSetting/legalDisclosure";
import PortalLogo from "../themeSetting/portalLogo";
import { Setting } from "../../helpers/Setting";
import ArrayList from "../../lib/ArrayList";
import PortalName from "../themeSetting/portalName";
import { object } from "prop-types";
import Media from "../../helpers/Media";
import * as API from "../../actions/media";
import MediaService from "../../services/MediaService";
import ObjectName from "../../helpers/ObjectName";
import CompanyService from "../../services/CompanyService";

const GeneralThemes = (props) => {
  // initilize states
  const [favIconFileTypeError, setFavIconFileTypeError] = useState(false);
  const [logoFileTypeError, setLogoFileTypeError] = useState(false);
  const [
    LoginBackgroundImageFileTypeError,
    setLoginBackgroundImageFileTypeError,
  ] = useState(false);
  const [navBackgroundFileTypeError, setNavBackgroundFileTypeError] =
    useState(false);

  const [portalLogoMediaUrl, setPortalLogoMediaUrl] = useState();
  const [portalLogo, setPortalLogo] = useState();
  const [portalLogoFile, setPortalLogoFile] = useState();
  const [portalFaviconUrl, setPortalFaviconUrl] = useState();
  const [portalFavicon, setPortalFavicon] = useState();
  const [portalFaviconFile, setPortalFaviconFile] = useState();

  const [loginBackgroundImageUrl, setLoginBackgroundImageUrl] = useState();
  const [loginBackgroundImage, setLoginBackgroundImage] = useState();
  const [loginBackgroundImageFile, setLoginBackgroundImageFile] = useState();

  const [navBackgroundImageUrl, setNavBackgroundImageUrl] = useState();
  const [navBackgroundImage, setNavBackgroundImage] = useState();
  const [navBackgroundImageFile, setNavBackgroundImageFile] = useState();

  const [settingData, setSettingData] = useState([]);
  const [portalLogoMediaId, setPortalLogoMediaId] = useState(settingData.portalLogoMediaId);
  const [companyDetail, setCompanyDetail] = useState("");

  const portalLogoRef = useRef();
  const portalFavIconRef = useRef();
  const leftNavBackgroundImageRef = useRef();
  const loginBackgroundImageRef = useRef();

  // Toogles
  const [portalLogoToggle, setPortalLogoToggle] = useState(true);
  const [headerToggle, setHeaderToggle] = useState(true);
  const [leftNavToggle, setLeftNavToggle] = useState(true);
  const [legalToggle, setLegalToggle] = useState(true);
  const [footToggle, setFootToggle] = useState(true);
  const [footerTextColor, setFooterTextColor] = useState();
  const [footerColor, setFooterColor] = useState();
  const [leftNavigationColor, setLeftNavigationColor] = useState();
  const [leftNavigationHoverColor, setLeftNavigationHoverColor] = useState();
  const [leftNavigationBackgroundColor, setLeftNavigationBackgroundColor] = useState();
  const [nameToggle, setNameToggle] = useState(true);
  const [portalLogoUrl, setPortalLogoUrl] = useState();
  const [headercolor, setHeaderColor] = useState();
  const [headerTextColor, setHeaderTextColor] = useState();
  // Set image preview in state
  const setBase64Image = (file, value) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      value(reader.result);
    };
  };

  //Portal Logo Start
  // Portal logo image upload
  const onPortalLogoChange = (e) => {
    validateFile(e, Setting.SETTINGS_PORTAL_LOGO);
    if (!logoFileTypeError) {
      portalLogoUpload(e);
    }
  };

  // Portal Logo Upload
  const portalLogoUpload = async (e) => {
    const files = e.target.files ? e.target.files[0] : "";
    const fileName = files.name;
    if (files) {
      const fileUrl = URL.createObjectURL(files);
      const mediaFile = files ? files : "";
      const media = files?.name;


      const data = new FormData();

      if (mediaFile) {
        data.append([Media.MEDIA_FILE], mediaFile ? mediaFile : "");
      }
      if (media !== undefined) {
        data.append([Media.MEDIA_NAME], media ? media : "");
      }
      data.append("object", ObjectName.PORTAL_LOGO_URL);
      data.append("object_id", companyDetail ? companyDetail.id : "");

      data.append(
        [Media.MEDIA_VISIBILITY], Media.VISIBILITY_PUBLIC);

      const response = await MediaService.saveImage(data);
      setPortalLogoMediaId(response?.id)
      setPortalLogoMediaUrl(response?.mediaUrl);
      setPortalLogoUrl(response?.mediaUrl);
      setPortalLogo(response.mediaUrl);
    }
  };
  // Portal logo image remove
  const onPortalLogoRemove = async () => {
    const id = portalLogoMediaId ? portalLogoMediaId : settingData.portal_logo_media_id
    await MediaService.delete(id);
    setPortalLogoUrl("");
    setPortalLogo("");
    setPortalLogoMediaId("")
    setPortalLogoMediaUrl("");
  };

  // Portal favicon Start
  const onPortalFavIconChange = (e) => {
    validateFile(e, Setting.SETTINGS_PORTAL_FAV_ICON);
    if (!favIconFileTypeError) {
      portalFavIconUpload(e);
    }
  };

  // Portal FavIcon Upload
  const portalFavIconUpload = (e) => {
    const files = e.target.files ? e.target.files[0] : "";
    if (files) {
      const fileUrl = URL.createObjectURL(files);
      setPortalFaviconUrl(fileUrl);
      setPortalFavicon(fileUrl);
      setBase64Image(files, setPortalFaviconFile);
    }
  };

  // Portal FavIcon Remove
  const handlePortalFavIconRemove = () => {
    setFavIconFileTypeError(false);
    portalFavIconRef.current.value = "";
    setPortalFaviconUrl("");
    setPortalFavicon("");
    setPortalFaviconFile("");
  };

  // Login Background image Start
  const onLoginBackgroundImageChange = (e) => {
    validateFile(e, Setting.BACKGROUND_IMAGE);
    if (!LoginBackgroundImageFileTypeError) {
      loginBackgroundImageUpload(e);
    }
  };

  const loginBackgroundImageUpload = (e) => {
    const files = e.target.files ? e.target.files[0] : "";
    if (files) {
      const fileUrl = URL.createObjectURL(files);
      setLoginBackgroundImageUrl(fileUrl);
      setLoginBackgroundImage(fileUrl);
      setBase64Image(files, setLoginBackgroundImageFile);
    }
  };

  // Remove
  const onLoginBackgroundImageRemove = () => {
    setLoginBackgroundImageFileTypeError(false);
    loginBackgroundImageRef.current.value = "";
    setLoginBackgroundImageUrl("");
    setLoginBackgroundImage("");
    setLoginBackgroundImageFile("");
  };

  // Navigation Background image Start
  const onNavBackgroundImageChange = (e) => {
    validateFile(e, Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_BACKGROUND_IMAGE);
    if (!navBackgroundFileTypeError) {
      navBackgroundImageUpload(e);
    }
  };

  const navBackgroundImageUpload = (e) => {
    const files = e.target.files ? e.target.files[0] : "";
    if (files) {
      const fileUrl = URL.createObjectURL(files);
      setNavBackgroundImageUrl(fileUrl);
      setNavBackgroundImage(fileUrl);
      setBase64Image(files, setNavBackgroundImageFile);
    }
  };

  // Remove
  const onNavBackgroundImageRemove = () => {
    setNavBackgroundFileTypeError(false);
    leftNavBackgroundImageRef.current.value = "";
    setNavBackgroundImageUrl("");
    setNavBackgroundImage("");
    setNavBackgroundImageFile("");
  };

  //Handle Setting Save
  const handleSave = (values) => {
    const data = new FormData();

    if (portalLogoMediaId !== undefined) {
      data.append(
        "portal_logo_media_id",
        portalLogoMediaId ? portalLogoMediaId : ""
      );
    }
    if (portalLogoMediaUrl !== undefined) {
      data.append(
        "portal_logo_media_url",
        portalLogoMediaUrl ? portalLogoMediaUrl : ""
      );
    }
    if (portalFaviconUrl !== undefined) {
      data.append(
        [Setting.SETTING_PORTAL_FAVICON_URL],
        portalFaviconUrl ? portalFaviconUrl : ""
      );
    }
    if (portalFaviconFile !== undefined) {
      data.append(
        "portal_favicon_image",
        portalFaviconFile ? portalFaviconFile : ""
      );
    }
    if (loginBackgroundImageUrl !== undefined) {
      data.append(
        [Setting.SETTING_LOGIN_BACKGROUND_IMAGE_URL],
        loginBackgroundImageUrl ? loginBackgroundImageUrl : ""
      );
    }


    data.append("portal_header_color", values?.portal_header_color?.value ? values?.portal_header_color?.value : "");



    data.append(
      "portal_header_text_color",
      values?.portal_header_text_color?.value ? values?.portal_header_text_color?.value : ""
    );

    if (loginBackgroundImageFile !== undefined) {
      data.append(
        "portal_login_background_image",
        loginBackgroundImageFile ? loginBackgroundImageFile : ""
      );
    }

    if (navBackgroundImageFile !== undefined) {
      data.append(
        "portal_left_navigation_background_image",
        navBackgroundImageFile ? navBackgroundImageFile : ""
      );
    }

    if (navBackgroundImageUrl !== undefined) {
      data.append(
        [Setting.SETTING_PORTAL_NAV_BACKGROUNG_IMAGE_URL],
        navBackgroundImageUrl ? navBackgroundImageUrl : ""
      );
    }

    data.append(
      "portal_footer_color",
      values?.portal_footer_color?.value ? values?.portal_footer_color?.value : ""
    );

    if (values.portal_footer_heading_color !== undefined) {
      data.append(
        "portal_footer_heading_color",
        values.portal_footer_heading_color
          ? values.portal_footer_heading_color
          : ""
      );
    }

    data.append(
      "portal_footer_text_color",
      values?.portal_footer_text_color?.value ? values?.portal_footer_text_color?.value : ""

    );

    if (values.portal_footer_copy_rights_text !== undefined) {
      data.append(
        "portal_footer_copy_rights_text",
        values.portal_footer_copy_rights_text
          ? values.portal_footer_copy_rights_text
          : ""
      );
    }
    if (values.portal_desktop_footer_content !== undefined) {
      data.append(
        "portal_desktop_footer_content",
        values.portal_desktop_footer_content
          ? values.portal_desktop_footer_content
          : ""
      );
    }
    if (values.portal_mobile_footer_content !== undefined) {
      data.append(
        "portal_mobile_footer_content",
        values.portal_mobile_footer_content
          ? values.portal_mobile_footer_content
          : ""
      );
    }

    data.append(
      "portal_left_navigation_text_color",
      values?.portal_left_navigation_text_color?.value ? values?.portal_left_navigation_text_color?.value : ""
    );


    data.append(
      "portal_left_navigation_text_hover_over_color",
      values?.portal_left_navigation_text_hover_over_color?.value ? values?.portal_left_navigation_text_hover_over_color?.value : ""
    );


    data.append(
      "portal_left_navigation_background_color",
      values?.portal_left_navigation_background_color?.value ? values?.portal_left_navigation_background_color?.value : ""
    );

    if (values.legal_disclosure !== undefined) {
      data.append(
        "legal_disclosure",
        values.legal_disclosure ? values.legal_disclosure : ""
      );
    }
    if (values.portal_name !== undefined) {
      data.append(
        "portal_name",
        values.portal_name ? values.portal_name : ""
      );
    }
    if (values.termsOfService !== undefined) {
      data.append(
        "termsOfService",
        values.termsOfService ? values.termsOfService : ""
      );
    }
    if (values.terms_of_service_url !== undefined) {
      data.append(
        "terms_of_service_url",
        values.terms_of_service_url ? values.terms_of_service_url : ""
      );
    }
    // Save settings
    saveSetting(data);
  };

  // Validate Filetype
  const validateFile = (e, File) => {
    const targetFile = e.target;

    if (ArrayList.isNotEmpty(targetFile.files)) {
      const fileType = targetFile.files.item(0).type;
      switch (fileType) {
        case "image/jpeg":
        case "image/png":
        case "image/gif":
          (File === Setting.SETTINGS_PORTAL_LOGO &&
            setLogoFileTypeError(false)) ||
            (File === Setting.SETTINGS_PORTAL_FAV_ICON &&
              setFavIconFileTypeError(false)) ||
            (File === Setting.BACKGROUND_IMAGE &&
              setLoginBackgroundImageFileTypeError(false)) ||
            (File === Setting.SETTINGS_LOGIN_PAGE_BACKGROUND_IMAGE &&
              setLoginBackgroundImageFileTypeError(false)) ||
            (File ===
              Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_BACKGROUND_IMAGE &&
              setNavBackgroundFileTypeError(false));
          break;
        default:
          (File === Setting.SETTINGS_PORTAL_LOGO &&
            setLogoFileTypeError(true)) ||
            (File === Setting.SETTINGS_PORTAL_FAV_ICON &&
              setFavIconFileTypeError(true)) ||
            (File === Setting.BACKGROUND_IMAGE &&
              setLoginBackgroundImageFileTypeError(true)) ||
            (File === Setting.SETTINGS_LOGIN_PAGE_BACKGROUND_IMAGE &&
              setLoginBackgroundImageFileTypeError(true)) ||
            (File ===
              Setting.SETTINGS_PORTAL_LEFT_NAVIGATION_BACKGROUND_IMAGE &&
              setNavBackgroundFileTypeError(true));
          break;
      }
    }
  };
  const getSettingValue = async () => {
    let value = "";
    let initialValue = {};
    value = await getCompanySettings();
    if (value) {
      value &&
        value.length > 0 &&
        value.forEach((data) => {
          initialValue[`${data.name}`] = data.value;
        });
      setSettingData(initialValue);
      if (initialValue && initialValue.portal_logo_media_url) {
        let logoUrl = initialValue.portal_logo_media_url;

        setPortalLogoUrl(logoUrl);
      }


    }
  };
  // portallogtoggle
  const portalLogoToggles = () => {
    setPortalLogoToggle(!portalLogoToggle);
  };

  // haeder toggle
  const headerToggles = () => {
    setHeaderToggle(!headerToggle);
  };

  // Left Nav toggle
  const leftNavToggles = () => {
    setLeftNavToggle(!leftNavToggle);
  };

  // Legal Disclosure toggle
  const legalNavToggles = () => {
    setLegalToggle(!legalToggle);
  };

  // foot toggle
  const footToggles = () => {
    setFootToggle(!footToggle);
  };

  const nameToggles = () => {
    setNameToggle(!nameToggle);
  };

  useEffect(() => {
    getCompanyDetail();
    getSettingValue();
  }, []);

  const getCompanyDetail = async () => {
    let companyDetail = await CompanyService.get();
    setCompanyDetail(companyDetail)
  }

  //Image prefill
  // Portal logo s3 url
  const portalLogoWithBaseUrl = portalLogo
    ? portalLogo
    : portalLogoUrl
      ? portalLogoUrl
      : "";
  // Fav Icon s3 url
  const faviconWithBaseUrl = portalFavicon
    ? portalFavicon
    : portalFaviconUrl
      ? portalFaviconUrl
      : "";
  // Background Image s3 url
  const loginBackgroundImageWithBaseUrl = loginBackgroundImage
    ? loginBackgroundImage
    : loginBackgroundImageUrl
      ? loginBackgroundImageUrl
      : "";
  // Left Navigation Background Image s3 url
  const LeftNavigationBackgroundImageWithBaseUrl = navBackgroundImage
    ? navBackgroundImage
    : navBackgroundImageUrl
      ? navBackgroundImageUrl
      : "";

  return (
    <div>
      <Form
        enableReinitialize={true}
        initialValues={{
          ...settingData,

          portal_header_color: headercolor && headercolor.find(
            (option) => option.value === settingData?.portal_header_color
          ),
          portal_header_text_color: headerTextColor && headerTextColor.find(
            (option) => option.value === settingData?.portal_header_text_color
          ),
          portal_left_navigation_background_color: leftNavigationBackgroundColor && leftNavigationBackgroundColor.find(
            (option) => option.value === settingData?.portal_left_navigation_background_color
          ),
          portal_left_navigation_text_hover_over_color: leftNavigationHoverColor && leftNavigationHoverColor.find(
            (option) => option.value === settingData?.portal_left_navigation_text_hover_over_color
          ),
          portal_left_navigation_text_color: leftNavigationColor && leftNavigationColor.find(
            (option) => option.value === settingData?.portal_left_navigation_text_color
          ),
          portal_footer_color: footerColor && footerColor.find(
            (option) => option.value === settingData?.portal_footer_color
          ),
          portal_footer_text_color: footerTextColor && footerTextColor.find(
            (option) => option.value === settingData?.portal_footer_text_color
          ),
        }}
        onSubmit={(values) => {
          handleSave(values);
        }}>
        <div className="form-wrapper">
          <DefaultContent>
            <PortalName nameToggle={nameToggle} nameToggles={nameToggles} />
            {/* Portal Logo upload */}
            <PortalLogo
              portalLogoWithBaseUrl={portalLogoWithBaseUrl}
              faviconWithBaseUrl={faviconWithBaseUrl}
              loginBackgroundImageWithBaseUrl={loginBackgroundImageWithBaseUrl}
              portalLogoToggles={portalLogoToggles}
              portalLogoToggle={portalLogoToggle}
              onPortalLogoChange={onPortalLogoChange}
              portalLogoRef={portalLogoRef}
              onPortalLogoRemove={() => onPortalLogoRemove(portalLogoMediaId)}
              onPortalFavIconChange={onPortalFavIconChange}
              portalFavIconRef={portalFavIconRef}
              handlePortalFavIconRemove={handlePortalFavIconRemove}
              onLoginBackgroundImageChange={onLoginBackgroundImageChange}
              loginBackgroundImageRef={loginBackgroundImageRef}
              onLoginBackgroundImageRemove={onLoginBackgroundImageRemove}
            />

            <Header
              settings={settingData}
              headerToggle={headerToggle}
              headerToggles={headerToggles}
              setHeaderColor={setHeaderColor}
              setHeaderTextColor={setHeaderTextColor}
            />
            {/* Left Navigation */}
            <LeftNavigation
              settingsLeft={settingData}
              leftNavBackgroundImageRef={leftNavBackgroundImageRef}
              leftNavToggle={leftNavToggle}
              onNavBackgroundImageChange={onNavBackgroundImageChange}
              onNavBackgroundImageRemove={onNavBackgroundImageRemove}
              leftNavigationBackgroundColor={setLeftNavigationBackgroundColor}
              leftNavToggles={leftNavToggles}
              LeftNavigationBackgroundImageWithBaseUrl={
                LeftNavigationBackgroundImageWithBaseUrl
              }
              leftNavigationColor={setLeftNavigationColor}
              leftNavigationHoverColor={setLeftNavigationHoverColor}
            />
            {/* footer */}
            <Footer
              settingsFooter={settingData}
              footToggle={footToggle}
              footToggles={footToggles}
              footerColor={setFooterColor}
              footerTextColor={setFooterTextColor} />

            {/* legal Discloser */}
            <LegalDisclosure
              legalToggle={legalToggle}
              legalNavToggles={legalNavToggles}
            />
            <div className="btn-wrapper mt-3">
              <SaveButton />
            </div>
          </DefaultContent>
        </div>
      </Form>
    </div>
  );
};

export default GeneralThemes;
