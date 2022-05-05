import { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";

const ToastNoti = ({ errorIndicator }) => {
  const [err, setErr] = useState(false);
  useEffect(() => {
    // setErr(errorIndicator.errorInd);
  }, [errorIndicator]);
  return (
    <div>
      <Toast onClose={() => setErr(false)} show={err}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast>
    </div>
  );
};
export default connect((state) => {
  errorIndicator: state.errorIndicator;
})(ToastNoti);
