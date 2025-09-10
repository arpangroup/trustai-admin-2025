
const Badge = ({ value, style = null }) => {
  if (value === null || value === undefined) return null;
  let badgeLabel = value;

  // Normalize value to string for comparison
  let normalizedValue = '';

  if (typeof value === 'boolean') {
    normalizedValue = value ? 'true' : 'false';
    badgeLabel = value ? 'Active' : 'Deactivated';
  } else if (typeof value === 'string') {
    normalizedValue = value.toLowerCase();
  } else {
    // For any other type, convert to string and lowercase
    normalizedValue = String(value).toLowerCase();
  }

  let badgeType = '';
  switch (normalizedValue) {
    case 'pending':
    case 'unverified':
    case 'no':
    case 'open':
      badgeType = 'pending';
      break;
    case 'verified':
    case 'success':
    case 'active':
    case 'yes':
    case 'completed':
    case 'crypto':
    case 'stake':
    case 'cilver':
    case 'premium':
    case 'true':
      badgeType = 'success';
      break;
    case 'deactivated':
    case 'inactive':
    case 'cancelled':
    case 'false':
    case 'rejected':
      badgeType = 'danger';
      break;
    default:
      badgeType = 'default';
      break;
  }

  const baseStyle = {}; // if you want default inline styles

  // Merge base styles with optional passed-in style
  const combinedStyle = style ? { ...baseStyle, ...style } : baseStyle;

  return (
    <div className={`site-badge ${badgeType}`} style={combinedStyle}>
      {/* {String(value)} */}
      {badgeLabel}
    </div>
  );
};

export default Badge;