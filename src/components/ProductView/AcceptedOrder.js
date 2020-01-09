import React from "react";

export default class AcceptOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ready: false
    };
  }

  render() {
    return (
      <>
        <div className="ready">Hellp</div>
      </>
    );
  }
}
