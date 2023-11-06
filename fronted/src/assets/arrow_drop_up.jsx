/**
 * JSX icon to indicate that something is displayed
 * @param {object} props 
 * @param {string} props.fillClass string containing all tailwind class
 * @returns
 */
export const ArrowUpIcon = ({ fillClass }) => (
   <svg 
      className={fillClass} 
      aria-hidden="true"
      focusable="false"
      width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 5L5 0L10 5H0Z" />
   </svg>
);

