import { Helmet } from "react-helmet-async";

/**
 * React component to be used as header of all pages
 * @param {object} props 
 * @param {string} props.title the title of header
 * @param {string} [props.description] the description of header
 * @returns
 */
export const SEO = ({ title, description }) => {
   return (
      <Helmet>
         <title>{title} | Bank</title>
         <meta name="description" content={description} />
      </Helmet>
   );
};