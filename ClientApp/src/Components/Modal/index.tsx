import * as React from "react";
import { Modal } from "antd";
import { IModelProps, IModelState } from "./ModalModels";

class ModalWrapper extends React.Component<IModelProps, IModelState> {
  constructor(props: IModelProps) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  componentDidUpdate(prevProps: IModelProps) {
    if (this.props.isVisible !== prevProps.isVisible) {
      this._onChangeVisiblePanel(this.props.isVisible);
    }
  }

  private _onChangeVisiblePanel = (val?: boolean) => {
    let newVal = val !== undefined ? val : !this.state.isModalVisible;
    this.setState({ isModalVisible: newVal });
  };

  onShowModal = () => {
    this._onChangeVisiblePanel(true);
  };

  onHandleOk = () => {
    this._onChangeVisiblePanel(false);
  };

  onHandleCancel = () => {
    this._onChangeVisiblePanel(false);
  };

  render() {
    return (
      <Modal
        className={`ModalWrapper ${this.props.className}`}
        // visible={this.state.isModalVisible}
        {...this.props}
      >
        {this.props.children}
      </Modal>
    );
  }
}

export default ModalWrapper;
