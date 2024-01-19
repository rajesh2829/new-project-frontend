import PropTypes from "prop-types";
import React from "react";

//Styles
import "../../components/static/navigation/style.scss"

class Paragraph extends React.Component {
  render() {
    const { text, id } = this.props;
    return (
      <div
        id={id}
        className="text-secondary"
      >
        {text}
      </div>
    );
  }
}

Paragraph.propTypes = {
  text: PropTypes.string,
  fontSize: PropTypes.string,
};

export default Paragraph;
