import { HeaderEnums, MenuEnums } from "../../Entity/Enums/MenuEnums";
import { PermissionEnum } from "../../Entity/Enums/PermisionEnum";

export interface IMenuButon {
    key: MenuEnums;
    name?: string;
    text: string;
    isDisabled: boolean;
    isVisbled: boolean;
}

export const HeaderConst = [
    {
        key: HeaderEnums.Posts,
        text: "Bài viết",
        endpoint: "Post",
        isDisabled: true,
        namePermission: PermissionEnum.PermissionsPostPermissionsRead
    },
    {
        key: HeaderEnums.Video,
        text: "Video",
        endpoint: "Videos",
        isDisabled: true,
        namePermission: PermissionEnum.PermissionsVideoPermissionsRead
    },
    {
        key: HeaderEnums.TypeOfNews,
        text: "Loại tin",
        endpoint: "Categories",
        isDisabled: true,
        namePermission: PermissionEnum.PermissionsCategoryPermissionsRead
    },
    {
        key: HeaderEnums.Advertisements,
        text: "Quảng cáo",
        endpoint: "Ads",
        isDisabled: true,
        namePermission: PermissionEnum.PermissionsCategoryPermissionsRead
    },
    {
        key: HeaderEnums.Crawler,
        text: "Crawler",
        endpoint: "Crawlersource",
        isDisabled: true,
        namePermission: PermissionEnum.PermissionsCrawlerPermissionsRead
    },
    {
        key: HeaderEnums.Accounts,
        text: "Tài khoản",
        endpoint: "Account/Usermanager",
        isDisabled: true,
        namePermission: PermissionEnum.PermissionsUserPermissionsRead
    },
    {
        key: HeaderEnums.Roles,
        text: "Chức vụ",
        endpoint: "Account/RoleManager",
        isDisabled: true,
        namePermission: PermissionEnum.PermissionsRolePermissionsRead
    },
    //{
    //    key: HeaderEnums.Votes,
    //    text: "Bình chọn",
    //    endpoint: "Vote",
    //    isDisabled: true
    //},
];

export const MenuConst: IMenuButon[] = [
    {
        key: MenuEnums.Add,
        text: "Thêm",
        isDisabled: false,
        isVisbled: false,
    },
    {
        key: MenuEnums.Position,
        text: "Vị trí",
        isDisabled: false,
        isVisbled: false,
    },
    {
        key: MenuEnums.Send,
        text: "Gửi",
        isDisabled: false,
        isVisbled: false,
    },
    {
        key: MenuEnums.Hidden,
        text: "Ẩn",
        isDisabled: true,
        isVisbled: false,
    },
    {
        key: MenuEnums.Upload,
        text: "Tải lên",
        isDisabled: false,
        isVisbled: false,
    },
    {
        key: MenuEnums.Download,
        text: "Tải xuống",
        isDisabled: false,
        isVisbled: false,
    },
    {
        key: MenuEnums.Vote,
        text: "Bình chọn",
        isDisabled: false,
        isVisbled: false,
    },
    {
        key: MenuEnums.Delete,
        text: "Xóa",
        isDisabled: true,
        isVisbled: false,
    },
];
