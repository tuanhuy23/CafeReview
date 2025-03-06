import React from "react";
import { HeaderWrapper } from "./HeaderStyle";
import { Menu, Dropdown, Button, Input } from "antd";
import { HeaderConst, MenuConst } from "../../../Common/Constants/MenuConst";
import { RootUrl } from "../../../Common/Constants/RootUrlConst";
import { MenuEnums, HeaderEnums } from "../../../Entity/Enums/MenuEnums";
import { MenuInfo } from "../../../../node_modules/rc-menu/lib/interface";
import { IHeaderProps, IHeaderStates } from "./HeaderModels";
import Modal from "../../../Components/Modal";
import { CallApi } from "../../../Common/Functions/CallApi";
import { ObjectToMap } from "../../../Common/Functions/Common";

class Header extends React.Component<IHeaderProps, IHeaderStates> {
    private passwordCurrent: string = "";
    private newPass: string = "";
    private confirmNewPass: string = "";
    constructor(props: IHeaderProps) {
        super(props);
        this.state = {
            selectedHeader: HeaderEnums.Posts,
            isVisibled: false,
            newPassword: "",
            confirmPassword: "",
            userName: "",
            permissions: new Map(),
        };
    }
    UNSAFE_componentWillMount() {
        this.onHandleUpdateMenuButtons();
        this.GetUserName();
        
    }

    componentDidMount() {
        this.GetPermissonUser();
    }
    onChangeModalVisibled = () => {
        this.setState({ isVisibled: !this.state.isVisibled })
    }

    SubmitModal = async () => {
        await CallApi("Account/User/ChangePassword", "POST", {
            CurrentPassword: this.passwordCurrent,
            NewPassword: this.newPass,
            ConfirmNewPassword: this.confirmNewPass
        }).then(() => {
            this.onChangeModalVisibled();
        })
    }

    GetUserName = async () => {
        await CallApi("Account/User/UserInfo", "GET").then((res) => {
            if (res && res.data) {
                this.setState({ userName: res.data });
            }
        })
    }

    GetPermissonUser = async () => {
        CallApi("Account/User/Permission", "GET").then(async (res) => {
            if (res && res.data) {
                let data = ObjectToMap(res.data);
                await this.setState({ permissions: data});
            }
        })
    }

    private _mapMenuEnums = (str: string): HeaderEnums => {
        switch (str) {
            case "typeOfNews":
                return HeaderEnums.TypeOfNews;
            case "advertisements":
                return HeaderEnums.Advertisements;
            case "accounts":
                return HeaderEnums.Accounts;
            case "role":
                return HeaderEnums.Roles;
            case "crawlers":
                return HeaderEnums.Crawler;
            default:
                return HeaderEnums.Posts;
        }
    };

    private _buildMenuButtons = (str: HeaderEnums) => {
        switch (str) {
            case HeaderEnums.Posts:
                let Postbtns = MenuConst.map((m) => {
                    let IndexBtnAlreadyVisible: number = this.props.menuBtns
                        ? this.props.menuBtns.findIndex((mb) => mb.key === m.key)
                        : -1;
                    if (
                        [MenuEnums.Add, MenuEnums.Delete, MenuEnums.Hidden].includes(m.key)
                    ) {
                        let visibleStatus =
                            this.props.menuBtns && this.props.menuBtns.length > 0
                                ? this.props.menuBtns[IndexBtnAlreadyVisible].isVisbled
                                : false;
                        m.isVisbled = visibleStatus;
                        return m;
                    }
                    return m;
                });
                return Postbtns;

           

            case HeaderEnums.Advertisements:
                let AdvertisementBtns = MenuConst.map((m) => {
                    // let IndexBtnAlreadyVisible: number = this.props.menuBtns
                    //   ? this.props.menuBtns.findIndex((mb) => mb.key === m.key)
                    //   : -1;
                    if (
                        [MenuEnums.Add, MenuEnums.Position, MenuEnums.Delete].includes(
                            m.key
                        )
                    ) {
                        // let visibleStatus =
                        //   this.props.menuBtns && this.props.menuBtns.length > 0
                        //     ? this.props.menuBtns[IndexBtnAlreadyVisible].isVisbled
                        //     : false;
                        m.isVisbled = true;
                        m.isDisabled = m.key === MenuEnums.Delete;
                        return m;
                    }
                    m.isVisbled = false;
                    return m;
                });
                return AdvertisementBtns;

            default:
                return MenuConst;
        }
    };

    private _onHandleChangePassCur = (e: any) => {
        this.passwordCurrent = e.target.value
    };

    private _onHandleChangeNewPass = (e: any) => {
        this.newPass = e.target.value
    };

    private _onHandleChangeConfirmNewPass = (e: any) => {
        this.confirmNewPass = e.target.value
    };

    onHandleUpdateMenuButtons = async () => {
        let buttons = await this._buildMenuButtons(this.state.selectedHeader);
        if (this.props.OnUpdateMenuButtons) {
            this.props.OnUpdateMenuButtons(buttons);
        }
    };

    onSelectMenu = async (info: MenuInfo) => {
        let selectedKey = await this._mapMenuEnums(String(info.key));
        this.setState(
            {
                selectedHeader: selectedKey,
            },
            () => this.onHandleUpdateMenuButtons()
        );
        if (this.props.OnUpdateSelectedHeader) {
            await this.props.OnUpdateSelectedHeader(selectedKey);
        }
    };

    RenderMenuHeader = () => {
        return (<Menu
            style={{ border: "none" }}
            selectedKeys={[this.state.selectedHeader]}
            mode="horizontal"
        >{HeaderConst.map((m) => {
            if (this.state.permissions.size > 0) {
                if (this.state.permissions.has(m.namePermission)) {
                    return (
                        <a className="Header__link" key={m.key} href={`${RootUrl.CMS}${m.endpoint}`}>
                            <Menu.Item onClick={this.onSelectMenu} title={m.text} >
                                {m.text}
                            </Menu.Item>
                        </a>
                    );
                }
            }

        })}

        </Menu>);
    }

    render() {
        const RenderMenu = (
            <Menu>
                <Menu.Item>
                    <Button type="link" onClick={this.onChangeModalVisibled}>
                        Đổi mật khẩu
            </Button>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item >
                    <Button type="link">
                        <a className="Header__link" href={`${RootUrl.CMS}Account/User/LogOut`}>
                            Đăng xuất
                        </a>
                    </Button>
                </Menu.Item>
            </Menu>
        );
        return (
            <HeaderWrapper className="HeaderWrapper">               
                    {this.RenderMenuHeader()}
                
                <Dropdown overlay={RenderMenu} trigger={['click']}>
                    <span>{this.state.userName}</span>
                </Dropdown>
                <Modal
                    onCancel={this.onChangeModalVisibled}
                    onOk={this.SubmitModal}
                    visible={this.state.isVisibled}
                    title="Đổi mật khẩu"
                >
                    <Input.Password style={{ width: "100%", margin: "5px 0" }} placeholder="Mật khẩu hiện tại" onChange={this._onHandleChangePassCur} />
                    <Input.Password style={{ width: "100%", margin: "5px 0" }} placeholder="Mật khẩu mới" onChange={this._onHandleChangeNewPass} />
                    <Input.Password style={{ width: "100%", margin: "5px 0" }} placeholder="Xác nhận" onChange={this._onHandleChangeConfirmNewPass} />
                </Modal>
            </HeaderWrapper>  
        );
    }
}

export default Header;
