
function FieldNote() {
  return (
    <aside
      className="field-note"
      aria-label="About this fieldbook"
    >
      <span className="note-number">NOTE / 001</span>

      <div className="note-rule" />

      <p className="note-heading">
        Not just a portfolio.
        <br />
        A record of becoming.
      </p>

      <p className="note-description">
        A place for the problems I explore, the things
        I build, and the lessons I carry forward.
      </p>

      <div className="note-footer">
        <span>EST. 2026</span>
        <span>✳</span>
      </div>
    </aside>
  );
}

export default FieldNote;
