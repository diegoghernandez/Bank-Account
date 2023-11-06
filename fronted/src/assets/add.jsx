/**
 * JSX icon to indicate the intention to add something
 * @param {object} props 
 * @param {string} props.fillClass String containing all tailwind class
 * @returns
 */
export const AddIcon = ({ fillClass }) => (
   <svg 
      className={fillClass} 
      aria-hidden="true"
      focusable="false"
      width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" fill="none"/>
      <path d="M11 19V13H5V11H11V5H13V11H19V13H13V19H11Z"/>
   </svg>
);

