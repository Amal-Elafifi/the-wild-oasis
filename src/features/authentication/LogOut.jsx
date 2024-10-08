import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogOut } from "./useLogOut";
import SpinnerMini from "../../ui/SpinnerMini";

function LogOut(){
    const {logOut, isLoading} = useLogOut();
    return(
        <ButtonIcon onClick={logOut}>
            {!isLoading? <HiArrowRightOnRectangle />: <SpinnerMini/>}
        </ButtonIcon>
    )
}
export default LogOut;