/**
 * JSX icon to indicate that a modal will open when you make a click
 * @param {object} props 
 * @param {string} props.fillClass string containing all tailwind class
 * @returns
 */
export const ModalIcon = ({ fillClass }) => (
   <svg 
      className={fillClass}
      aria-hidden="true"
      focusable="false"
      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6Z"/>
      <path d="M7 7H15"/>
      <path d="M7 10H15"/>
      <path d="M7 13H15"/>
      <path d="M14 17C16.5234 17 17.0491 17 16.9965 17"/>
   </svg>
);

