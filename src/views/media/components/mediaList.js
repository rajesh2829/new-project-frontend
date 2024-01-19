import React from "react";
import { DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

// Components
import ReduxTable, { ReduxColumn } from "../../../components/reduxTable";

import { connect, useDispatch } from "react-redux";
import MoreDropdown from "../../../components/authentication/moreDropdown";

//Config
import { endpoints } from "../../../api/endPoints";

import FeatureImage from "../../../components/Image";

import Media from "../../../helpers/Media";
import * as API from "../../../actions/media";

const ProductList = (props) => {
  const {
    id,
    tab,
    visibilityTab,
    handleBulkSelect,
    PrivateMediaPageSize,
    privateMediaCurrentPage,
    publicMediaCurrentPage,
    PublicMediaPageSize,
    ArchiveMediaCurrentPage,
    ArchiveMediaPageSize,
    onObjectNameChange,
    objectNameInitialvalues,
    ShowObjectNameFilter,
    object_name
  } = props;

  const sortByOption = [

    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "name:ASC",
      label: "Name",
    },
  ];

  // Defining dispatch from useDispatch
  const dispatch = useDispatch();
  const params = {
    PrivateMediaPageSize: PrivateMediaPageSize,
    privateMediaCurrentPage: privateMediaCurrentPage,
    publicMediaCurrentPage: publicMediaCurrentPage,
    PublicMediaPageSize: PublicMediaPageSize,
    ArchiveMediaCurrentPage: ArchiveMediaCurrentPage,
    ArchiveMediaPageSize: ArchiveMediaPageSize
  };

  return (
    <ReduxTable
      id={id}
      showHeader
      bulkSelect
      onBulkSelect={handleBulkSelect}
      searchPlaceholder="Search Image"
      apiURL={`${endpoints().mediaAPI}/search`}
      paramsToUrl={true}
      params={{
        visibility: visibilityTab,
        tab: tab,
        objectName: object_name,
      }}
      ShowObjectNameFilter={ShowObjectNameFilter}
      history={props.history}
      objectNameInitialvalues={objectNameInitialvalues}
      onObjectNameChange={onObjectNameChange}
      newTableHeading
      sortByOptions={sortByOption}>
      <ReduxColumn
        width="65px"
        maxWidth="90px"
        minWidth="90px"
        renderField={(row) => (
          <card className="img-fluid d-flex justify-content-center">
            <FeatureImage
              size="small"
              src={row.url}
              alt={row.file_name}
              className="img-fluid img-thumbnail"
            />
          </card>
        )}>
        Image
      </ReduxColumn>
      <ReduxColumn
        className="cursor-pointer"
        type="link"
        isClickable="true"
        field="name"
        sortBy="name"
        width="420px"
        maxWidth="200px"
        minWidth="200px"
        renderField={(row) => (
          <>
            <Link to={`/media/detail/${row.id}`}>{row.name}</Link>
          </>
        )}>
        File Name
      </ReduxColumn>
      <ReduxColumn
        field="object_name"
        sortBy="object_name"
        maxWidth="90px"
        minWidth="90px">
        Object
      </ReduxColumn>
      <ReduxColumn
        field="createdAt"
        sortBy="createdAt"
        maxWidth="100px"
        minWidth="100px">
        Created At
      </ReduxColumn>
      <ReduxColumn
        field="Action"
        maxWidth="100px"
        minWidth="100px"
        disableOnClick
        renderField={(row) => (
          <div className="text-center action-group-dropdown">
            <MoreDropdown>
              {row.visibility == Media.VISIBILITY_PRIVATE ? (
                <>
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        API.updateMedia(
                          row.id,
                          Media.VISIBILITY_PUBLIC,
                          params
                        )
                      );
                    }}>
                    Make it Public
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        API.updateMedia(
                          row.id,
                          Media.VISIBILITY_ARCHIVE,
                          params
                        )
                      );
                    }}>
                    Make it Archive
                  </DropdownItem>
                </>
              ) : row.visibility == Media.VISIBILITY_PUBLIC ? (
                <>
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        API.updateMedia(row.id, Media.VISIBILITY_PRIVATE),
                        params
                      );
                    }}>
                    Make it Private
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        API.updateMedia(
                          row.id,
                          Media.VISIBILITY_ARCHIVE,
                          params
                        )
                      );
                    }}>
                    Make it Archive
                  </DropdownItem>
                </>
              ) : (
                <>
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        API.updateMedia(
                          row.id,
                          Media.VISIBILITY_PRIVATE,
                          params
                        )
                      );
                    }}>
                    Make it Private
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      dispatch(
                        API.updateMedia(
                          row.id,
                          Media.VISIBILITY_PUBLIC,
                          params
                        )
                      );
                    }}>
                    Make it Public
                  </DropdownItem>
                </>
              )}
            </MoreDropdown>
          </div>
        )}>
        Action
      </ReduxColumn>
    </ReduxTable>
  );
};

export default ProductList;
