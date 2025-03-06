import { IMenuButon } from "../../../Common/Constants/MenuConst";
import { HeaderEnums } from "../../../Entity/Enums/MenuEnums";

export interface IHeaderStates {
    selectedHeader: HeaderEnums;
    isVisibled: boolean;
    newPassword: string;
    confirmPassword: string;
    userName: string;
    permissions: Map<string, {}>;
}

export interface IHeaderProps {
    OnUpdateSelectedHeader?: (selectedItem: HeaderEnums) => void;
    OnUpdateMenuButtons?: (btns: IMenuButon[]) => void;
    selectedHeader?: HeaderEnums;
    menuBtns?: IMenuButon[];
}
