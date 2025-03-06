import { ModalProps } from "antd/lib/modal";

export interface IModelProps extends ModalProps {
  isVisible?: boolean;
}
export interface IModelState {
  isModalVisible?: boolean;
}
