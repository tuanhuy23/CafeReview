import styled from "styled-components";

export const HeaderWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding-right:20px;
    min-height:50px;
    .ant-dropdown-trigger{
        font-weight:bold;
    }
    .Header__link{
        .ant-menu-title-content{
            color:black;
        }
        &:hover{
          .ant-menu-title-content{
            color:#1890ff;
          }
        }
    }
    @media screen and (max-width: 1024px) {
        overflow-x: scroll;
    }
`;
