import React from "react";
import LazyLoad, { forceVisible } from "react-lazyload";
import { Link } from "react-router-dom";

class GridCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardLink:
        this.props.isPreview === "true"
          ? "#"
          : this.props.link
            ? this.props.link
            : "#",
    };
  }

  componentDidMount() {
    forceVisible();
  }

  render() {
    const cardBoxStyle = {
      maxWidth: "321px",
      height: "100%",
      width: "100%",
    };

    // props
    const {
      data,
      size,
      showCardBody,
      isPreview,
      showOption,
      permission,
      imageUrl,
    } = this.props;

    // Resource details
    const { id, userImage } = data;

    const cursorPointer = isPreview === "true" ? "" : "cursor-pointer";
    const userImageUrl = imageUrl ? imageUrl : userImage;

    const TagName = Link;

    return (
      <TagName
        id="card-link"
        {...(TagName === "a" ? { href: this.state.cardLink } : "")}
        style={{
          color: "#212529",
          cursor: isPreview ? "default" : "pointer",
          maxWidth: isPreview === "true" ? "" : "321px",
          marginRight: "60px",
          marginTop: "0px",
        }}
        className={`
          ${isPreview === "true" ? "" : size ? size : "col-4"}
          mb-4 pb-1
          text-decoration-none
          pl-0 pr-0 ml-3 mt-0 
        `}
        key={id}
      >
        <div className={`${cursorPointer} card `} style={cardBoxStyle}>
          <LazyLoad>
            <div
              id="card-image"
              className="card-header"
              style={{
                backgroundImage: `url(${userImageUrl ? userImageUrl : ""})`,
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                padding: "7.4rem 9.50rem",
              }}
            ></div>
          </LazyLoad>
          <div
            onClick={(e) => {
              if (showOption) {
                e.preventDefault();
                if (e.target.id === "card-image") {
                  this.openLink();
                }
              }
            }}
          >
            <div className={"body-wrapper"}>
              {showCardBody !== false ? (
                <div
                  className="card-body pt-0"
                  onClick={() => showOption && this.openLink()}
                >
                  <div className={`${permission ? "" : "mt-4 pt-1"}`}>
                    <div className="mt-2 font-weight-bold">
                      <p>Preview</p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </TagName>
    );
  }
}

export default GridCard;
