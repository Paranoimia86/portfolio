export default function EmailInput({ value, onChange }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="používateľ"
        required
        style={{ flex: 1 }}
      />
      <span>@student.tuke.sk</span>
    </div>
  );
}
