import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogOut from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";
function LogOut() {
  const { logOut, isLoggingOut } = useLogOut();
  return (
    <ButtonIcon onClick={logOut}>
      {isLoggingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default LogOut;
