export const LogoRenderer = (props) => {
  const { logo, name } = props.data;

  if (!logo) {
    const initials = name
      .split(' ')
      .slice(0, 2)
      .map(word => word.charAt(0).toUpperCase())
      .join('');

    return (
      <span className="avatar-text" style={{ background: "#ccc", padding: 8, borderRadius: "50%" }}>
        {initials}
      </span>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      style={{ width: 64, height: 64, objectFit: "contain" }}
    />
  );
};
