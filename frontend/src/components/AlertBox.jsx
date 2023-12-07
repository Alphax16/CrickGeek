import Swal from "sweetalert2";


const displayAlertBox = ({ title, body, contentType="html", icon="warning" }) => {
  return (
    Swal.fire({
        title: title,
        // text: `Confidence: ${Math.round(response.data.confidence * 100)}%`,
        [contentType]: body,
        icon: icon,
      })
  )
}

export default displayAlertBox;
