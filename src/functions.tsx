import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const showAlert = (title:string, icon:any, html?:string,focus?:any) => {

    setFocus(focus)

    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title,
        icon,
        html
    });
}

const setFocus = (focus:string) => {
    if (focus != '') {
        document.getElementById(focus)?.focus()
    }
}

export { showAlert }