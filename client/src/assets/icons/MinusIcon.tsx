const MinusIcon = ({
  width = '24px',
  height = '24px',
}: {
  width?: string;
  height?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-minus"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

export default MinusIcon;
