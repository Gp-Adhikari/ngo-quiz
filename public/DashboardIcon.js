const DashboardIcon = ({ isFocused }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H8C9.10457 22 10 21.1046 10 20V4C10 2.89543 9.10457 2 8 2Z"
        stroke={isFocused ? "black" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 2H16C14.8954 2 14 2.89543 14 4V8C14 9.10457 14.8954 10 16 10H20C21.1046 10 22 9.10457 22 8V4C22 2.89543 21.1046 2 20 2Z"
        stroke={isFocused ? "black" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 14H16C14.8954 14 14 14.8954 14 16V20C14 21.1046 14.8954 22 16 22H20C21.1046 22 22 21.1046 22 20V16C22 14.8954 21.1046 14 20 14Z"
        stroke={isFocused ? "black" : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DashboardIcon;
