import React, { useState } from "react";

// Component
import DeleteModal from "../../components/DeleteModal";
import BreadCrumb from "../../components/Breadcrumb";
import PageTitle from "../../components/PageTitle";
import Spinner from "../../components/Spinner";
import DragAndDropTable from "../../components/StatusTable/StatusDragAndDropTable";
import Url from "../../lib/Url";

const statusList = (props) => {
  const { activeTab, match } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteStatus, setStatus] = useState("");
  const [row, setRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { history } = props;

  if (isLoading) {
    return <Spinner />;
  }

  // Bread crumb list
  const breadcrumbList = [
    { label: "Settings", link: "/setting/Statues" },
    {
      label: "Statues",
      link: "/setting/Statues",
    },
    {
      label: "StatusDetail",
      link: `/setting/Statues/StatusList/?object_name=${Url.GetParam(
        "object_name"
      )}`,
    },
  ];

  const _toggle = (id) => {
    setIsOpen(!isOpen)
  };

  return (
    <div className="card card-body">
      <BreadCrumb list={breadcrumbList} />
      <>
        <div className="pb-4">
          <PageTitle
            label={Url.GetParam("object_name")}
            buttonLabel="Add New"
            buttonHandler={(_e) => {
              _toggle();
              setRow("");
            }}
          />
        </div>
        <DeleteModal
          isOpen={openDeleteModal}
          toggle={() => {
            setOpenDeleteModal(false);
          }}
          title="Delete Status"
          deleteFunction={() => {
            handleDelete(deleteStatus.id);
          }}
          label={deleteStatus.name}
          id={deleteStatus.id}
        />
        <div><DragAndDropTable
          history={history}
          objectName={Url.GetParam("object_name")}
          showUrl
          _toggle={_toggle}
          isOpen={isOpen}
          row={row}
          setRow={setRow}
        />
        </div>
      </>
    </div>
  );
};

export default statusList;
