import styled from "styled-components";
import LogOut from "../features/authentication/LogOut";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
const StyledHeader = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle/>
      </li>
      <li>
        <LogOut />
      </li>
    </StyledHeader>
  );
}

export default HeaderMenu;
