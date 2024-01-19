import React, { useEffect, useState } from "react";
import { DropdownItem } from "reactstrap";

import MoreDropdown from "../../../components/authentication/moreDropdown";
import { ContactStatus } from "../../../helpers/ContactStatus";
import ContactService from "../../../services/ContactService";
import Pagination from "../../../components/Pagination";
import ArrayList from "../../../lib/ArrayList";
import NoRecordsFound from "../../../components/NoRecordsFound";

import Filter from "../../../components/Filter";
import Url from "../../../lib/Url";

const ContactList = ({
  setDeleteContactModal,
  setAddContactModal,
  setRowValue,
  setRow,
  object_id,
  history,
  isLoadings,
  contactsTab,
  setIsLoadings,
  props,
  editable
}) => {

  const [contactList, setContactList] = useState([]);
  const [currentPage, setCurrentPage] = useState();
  const [totalCount, setTotalCount] = useState();
  const [pageSize, setPageSize] = useState();
  const [search, setSearch] = useState();

  const [selectedSortValue, setSelectedSort] = useState(
    Url.GetParam("sortValues")
  );

  useEffect(() => {
    Url.UpdateUrl(
      {
        tab: contactsTab ? contactsTab : "",
        search: Url.GetParam("search"),
        page: Url.GetParam("page"),
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
      },
      props
    );

    getContactList(
      Url.GetParam("page"),
      Url.GetParam("search"),
      Url.GetParam("sort"),
      Url.GetParam("sortDir")
    );
  }, []);

  useEffect(() => {
    getContactList(
      Url.GetParam("page"),
      Url.GetParam("search"),
      Url.GetParam("sort"),
      Url.GetParam("sortDir")
    );
  }, [isLoadings]);

  const getContactList = async (page, search, sort, sortDir) => {
    const data = await ContactService.search(
      page ? page : "",
      object_id ? object_id : "",
      search ? search : "",
      sort ? sort : "",
      sortDir ? sortDir : ""
    );

    setContactList(data?.data);
    setCurrentPage(data?.currentPage);
    setTotalCount(data?.totalCount);
    setPageSize(data?.pageSize);
    setIsLoadings && setIsLoadings(false);
  };

  const onPageChange = async (page) => {
    setCurrentPage(page);

    Url.UpdateUrl(
      {
        tab: contactsTab ? contactsTab : "",
        search: Url.GetParam("search"),
        page: page,
        sort: Url.GetParam("sort"),
        sortDir: Url.GetParam("sortDir"),
      },
      props
    );

    await getContactList(
      page,
      Url.GetParam("search"),
      Url.GetParam("sort"),
      Url.GetParam("sortDir")
    );
  };

  const sortByOptions = [
    {
      value: "id:DESC",
      label: "Most Recent",
    },
    {
      value: "first_name:ASC",
      label: "Name",
    },
  ];


  const getSelectedSortLabel = () => {
    const selectedSortOption = sortByOptions.find(
      (option) => option.value.split(":")[0] === Url.GetParam("sort")
    );

    return selectedSortOption?.label
      ? selectedSortOption?.label
      : sortByOptions[0].label;
  };

  const pageSearchOnChange = (event) => {
    console.log(event);
    try {
      let search = event.target.value;

      setSearch(search);
      getContactList(currentPage, search);
      Url.UpdateUrl(
        {
          tab: contactsTab ? contactsTab : "",
          search: search,
          page: Url.GetParam("page"),
          sort: Url.GetParam("sort"),
          sortDir: Url.GetParam("sortDir"),
        },

        props
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onSearchClick = () => {
    getContactList(
      currentPage,
      search,
      Url.GetParam("sort"),
      Url.GetParam("sortDir")
    );
  };

  const handleSortChange = async (values) => {
    const sortAndSortDir = values.split(":");
    setSelectedSort(values);

    const sortBy = sortAndSortDir[0];
    const sortDirection = sortAndSortDir[1];

    Url.UpdateUrl(
      {
        tab: contactsTab ? contactsTab : "",
        sort: sortBy,
        sortDir: sortDirection,
        search: Url.GetParam("search"),
      },
      props
    );
    await getContactList(currentPage, search, sortBy, sortDirection);
  };

  const refreshButtonOnClick = async () => {
    await getContactList(
      Url.GetParam("page"),
      Url.GetParam("search"),
      Url.GetParam("sort"),
      Url.GetParam("sortDir")
    );
  };

  const startPage = (currentPage - 1) * pageSize + 1;
  const firstPage = startPage > totalCount ? totalCount : startPage;
  const endPage = currentPage * pageSize;
  const lastPage = endPage > totalCount ? totalCount : endPage;

  return (
    <>
      <Filter
        showHeader
        newTableHeading
        pageSearchOnChange={(e) => pageSearchOnChange(e)}
        searchPlaceholder="Search"
        getSelectedSortLabel={getSelectedSortLabel()}
        sortByOptions={sortByOptions}
        handleSortByChange={handleSortChange}
        onSearchClick={() => onSearchClick()}
        refreshButtonOnClick={refreshButtonOnClick}
        pageSearchValue={Url.GetParam("search")}
      />
      <div className="row m-1 p-0 ">
        {contactList &&
          contactList.map((row) => (
            <div key={row.id} className="col-md-6 p-0 m-0">
              <div className="card">
                <div className="card-body">
                  <div className=" text-right action-group-dropdown">
                    <MoreDropdown>
                      {!editable && <DropdownItem
                        onClick={() => (
                          setRowValue && setRowValue(row),
                          setAddContactModal(true)
                        )}
                      >
                        Edit
                      </DropdownItem>}
                      <DropdownItem
                        className="text-danger"
                        onClick={() => (
                          setDeleteContactModal(true), setRow(row)
                        )}
                      >
                        Delete
                      </DropdownItem>
                    </MoreDropdown>
                  </div>
                  <div className="contact-details">

                    <h5 className="card-title">{row.name}</h5>
                    <p className="card-text mb-0">
                      <strong>Email:</strong> {row.email}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Mobile:</strong> {row.mobile}
                    </p>
                    <p className="card-text mb-0">
                      <strong>Designation:</strong> {row.designation}
                    </p>
                  </div>

                  <div
                    className={`status-input text-center rounded text-white fw-600 custom-font-size text-uppercase mt-3 ${row.status &&
                      row.status === ContactStatus.STATUS_INACTIVE_TEXT
                      ? "bg-secondary"
                      : row.status === ContactStatus.STATUS_ACTIVE_TEXT
                        ? "bg-success"
                        : ""
                      }`}
                  >
                    <p className="status-text">{row.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {ArrayList.isNotEmpty(contactList) ? <div className="d-flex justify-content-between">
        <div>
          Showing {firstPage} to {lastPage} of {totalCount} entries
        </div>
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div> : <NoRecordsFound
      />
      }
    </>
  );
};

export default ContactList;
