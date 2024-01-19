import React from "react";
import { ThreeBounce } from "better-react-spinkit";
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="position-absolute h-100 w-100 sweet-loading">
        <ThreeBounce size={25} color="var(--three-bounce-color)" />
      </div>
    );
  }
}

export default Spinner;
