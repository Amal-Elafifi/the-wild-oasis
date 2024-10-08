import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import {useDarkModeContext} from "../features/context/DarkModeContext";


function DarkModeToggle(){
    const{toggleDarkMode, isDark} = useDarkModeContext()
    return(
        <ButtonIcon onClick={toggleDarkMode}>
            {isDark?<HiOutlineSun/>: <HiOutlineMoon/>}
        </ButtonIcon>
    )
}

export default DarkModeToggle;
