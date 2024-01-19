import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function BreadCrumb(props) {
  const { list } = props;
  return (
    <div className="row">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-transparent">
          {list &&
            list.length > 0 &&
            list.map((data, i) => (
              <>
                {i == list.length - 1 ? (
                  <li
                    className="breadcrumb-item text-dark active fw-bold"
                    aria-current="page"
                  >
                    {data.label}
                  </li>
                ) : (
                  <>
                    <Link className="text-underline" to={data.link}>
                      {data.label}
                    </Link>
                    <div className="mx-1 text-primary">
                      <FontAwesomeIcon icon={faChevronRight} size="xs" />
                    </div>
                  </>
                )}
              </>
            ))}
        </ol>
      </nav>
    </div>
  );
}
