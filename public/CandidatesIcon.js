const CandidatesIcon = ({ isFocused }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 6.375C4.5 5.28098 4.9346 4.23177 5.70818 3.45818C6.48177 2.6846 7.53098 2.25 8.625 2.25C9.71902 2.25 10.7682 2.6846 11.5418 3.45818C12.3154 4.23177 12.75 5.28098 12.75 6.375C12.75 7.46902 12.3154 8.51823 11.5418 9.29182C10.7682 10.0654 9.71902 10.5 8.625 10.5C7.53098 10.5 6.48177 10.0654 5.70818 9.29182C4.9346 8.51823 4.5 7.46902 4.5 6.375V6.375ZM14.25 8.625C14.25 8.18179 14.3373 7.74292 14.5069 7.33344C14.6765 6.92397 14.9251 6.55191 15.2385 6.23851C15.5519 5.92512 15.924 5.67652 16.3334 5.50691C16.7429 5.3373 17.1818 5.25 17.625 5.25C18.0682 5.25 18.5071 5.3373 18.9166 5.50691C19.326 5.67652 19.6981 5.92512 20.0115 6.23851C20.3249 6.55191 20.5735 6.92397 20.7431 7.33344C20.9127 7.74292 21 8.18179 21 8.625C21 9.52011 20.6444 10.3785 20.0115 11.0115C19.3786 11.6444 18.5201 12 17.625 12C16.7299 12 15.8715 11.6444 15.2385 11.0115C14.6056 10.3785 14.25 9.52011 14.25 8.625V8.625ZM1.5 19.125C1.5 17.2353 2.25067 15.4231 3.58686 14.0869C4.92306 12.7507 6.73533 12 8.625 12C10.5147 12 12.3269 12.7507 13.6631 14.0869C14.9993 15.4231 15.75 17.2353 15.75 19.125V19.128L15.749 19.247C15.7469 19.3742 15.7125 19.4987 15.6489 19.6089C15.5854 19.7191 15.495 19.8114 15.386 19.877C13.3452 21.106 11.0073 21.7536 8.625 21.75C6.153 21.75 3.839 21.066 1.865 19.877C1.75585 19.8115 1.66517 19.7193 1.60149 19.6091C1.53781 19.4989 1.50323 19.3743 1.501 19.247L1.5 19.125V19.125ZM17.25 19.128L17.249 19.272C17.2434 19.6053 17.1638 19.9332 17.016 20.232C18.7617 20.3397 20.5054 19.9916 22.076 19.222C22.1975 19.1626 22.3006 19.0715 22.3745 18.9583C22.4485 18.8452 22.4904 18.7141 22.496 18.579C22.5313 17.7402 22.3494 16.9066 21.9679 16.1588C21.5864 15.4109 21.0183 14.7743 20.3185 14.3105C19.6188 13.8467 18.8111 13.5715 17.9738 13.5115C17.1364 13.4515 16.2977 13.6087 15.539 13.968C16.6522 15.4566 17.2522 17.2662 17.249 19.125V19.128H17.25Z"
        fill={isFocused ? "black" : "white"}
      />
    </svg>
  );
};

export default CandidatesIcon;
