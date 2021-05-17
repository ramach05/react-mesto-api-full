function Spinner({ isOpen }) {
  return (
    <div className={`${isOpen ? "spinner spinner_visible" : "spinner"}`}>
      <div className="spiner__roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
