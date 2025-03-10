const QuestionTypeSelect = ({ value, onChange, className }) => (
  <select
    value={value}
    onChange={onChange}
    className={className}
  >
    <option value="text">Text Answer</option>
    <option value="multiple-choice">Multiple Choice</option>
    <option value="checkbox">Checkboxes (multiple options)</option>
    <option value="dropdown">Dropdown List</option>
    <option value="linear-scale">Linear Scale</option>
  </select>
  );

  export default QuestionTypeSelect;