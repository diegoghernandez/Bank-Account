import { Navbar } from "./Navbar";

export default {
   title: "Buttons/Navbar",
   component: Navbar,
   tags: ['autodocs']
};

const Template = ({ label, ...args }) => {
   return Navbar({ label, ...args });
};

export const Default  = Template.bind({});
Default.args = {
   active: false,
   icon: <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z" fill="onSurface"/>
         </svg>,
   label: "Home",
};