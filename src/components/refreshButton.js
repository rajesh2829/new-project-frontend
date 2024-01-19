import React, { Component } from "react";

class RefreshButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinning: false,
    };
  }

  handleRefreshClick = async () => {
    this.setState({ spinning: true });
    await this.props.onClick();
    setTimeout(() => {
      this.setState({ spinning: false });
    }, 100);
  };

  render() {
    const { spinning } = this.state;

    return (
      <div className="btn btn-primary mb-4" onClick={this.handleRefreshClick}>
        <span className={spinning ? "fa fa-sync fa-spin p-0" : "fa fa-refresh p-0"} />
      </div>
    );
  }
}

export default RefreshButton;