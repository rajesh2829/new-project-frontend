import React from "react";

// Component
import ReduxTable, { ReduxColumn } from "../../components/reduxTable";

import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { sortByOption } from "../../helpers/SortByOption";
import { tagOptions } from "../../helpers/Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Filter from "../../components/Filter";
import { useEffect } from "react";
import Url from "../../lib/Url";

const TagList = (props) => {
  const { history } = props;
  const [searchQuery, setSearchQuery] = useState(Url.GetParam("search") || "");
  const [filteredTagList, setFilteredTagList] = useState(tagOptions);
  const [sortedBy, setSortedBy] = useState(Url.GetParam("sortBy") || "name:ASC");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    Url.UpdateUrl(
      {
        sortBy: sortedBy,
        search: event.target.value,
      },
      props
    );// let fil
  };

  useEffect(() => {
    filterAndSortList();
  }, [sortedBy]);


  useEffect(() => {
    filterAndSortList();
  }, []);

  const handleSortByChange = (selectedSortBy) => {
    setSortedBy(selectedSortBy);
    Url.UpdateUrl(
      {
        sortBy: selectedSortBy,
        search: searchQuery,
      },
      props
    );
  };


  const filterAndSortList = () => {
    let filteredList = tagOptions.filter((tag) => {
      return tag.label.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (sortedBy === "name:ASC") {
      filteredList.sort((a, b) => a.label.localeCompare(b.label));
    } else if (sortedBy === "updatedAt:DESC") {
      filteredList.sort((a, b) => b.updatedAt - a.updatedAt);
    }

    setFilteredTagList(filteredList);
  };

  return (
    <div>
      <div className="pb-4">
        <PageTitle label="Tags" />
      </div>
      <Filter
        showHeader
        newTableHeading
        showPageSize
        pageSearchValue={searchQuery}
        searchPlaceholder={"search"}
        pageSearchOnChange={handleSearch}
        onSearchClick={filterAndSortList}
        sortByOptions={sortByOption}
        getSelectedSortLabel={"Name"}
        handleSortByChange={handleSortByChange}
      />

      <ReduxTable
        id="allTags"
        disableHeader
        customTagList={filteredTagList}
        newTableHeading
        apiURL={true}
        sortByOptions={sortByOption}
        icon={<FontAwesomeIcon icon={faTag} />}
        message="You can start by clicking Add New"
        searchPlaceholder="Search"
        noPagination
      >
        <ReduxColumn
          type="link"
          isClickable="true"
          field="label"
          renderField={(row) => (
            <Link to={`/tags/details/${row.value}`}>{row.label}</Link>
          )}
        >
          Type
        </ReduxColumn>
      </ReduxTable>
    </div>
  );
};

export default TagList;
