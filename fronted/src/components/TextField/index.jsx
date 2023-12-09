import { useId, useRef, useState } from "react";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { InputTypes } from "../../constants/InputType";
import { Menu } from "../Menu";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEffect } from "react";
import { Modal } from "../Modal";
import { ArrowDownIcon } from "../../assets/arrow_drop_down";
import { ArrowUpIcon } from "../../assets/arrow_drop_up";
import { ModalIcon } from "../../assets/modal";
import { CancelIcon } from "../../assets/cancel_icon";
import { SearchIcon } from "../../assets/search_icon";
import { TextFieldStyles } from "../../constants/TextFieldStyles";
import { VisibilityIcon } from "../../assets/visibility";
import "./TextField.css";

/**
 * Return an object with desire styles from three options
 * @param {boolean} isDisable the value to get the disable styles
 * @param {boolean} isError the value to get the error styles
 * @returns 
 */
const getColors = (isDisable, isError) => {
   if (isDisable) {
      return {
         textLabelColor: ["text-onSurface/38 dark:text-onSurface-dark/38", "text-onSurface/38 dark:text-onSurface-dark/38", 
            "text-onSurface/38 dark:text-onSurface-dark/38", "group-hover/text:text-onSurface/38 dark:group-hover/text:text-onSurface-dark/38"],
         borderColor: ["border-onSurface/12 dark:border-onSurface-dark/12", "border-onSurface/12 dark:border-onSurface-dark/12", 
            "group-hover/text:border-onSurface/12 dark:group-hover/text:border-onSurface-dark/12"],
         svgFill: "fill-onSurface/38 dark:fill-onSurface-dark/38",
         supportiveColor: "text-onSurface-variant dark:text-onSurface-variant-dark"
      };
   } else if (isError) {
      return {
         textLabelColor: ["text-error dark:text-error-dark", "text-error dark:text-error-dark", "text-error dark:text-error-dark", 
            "group-hover/text:text-on-error-container dark:group-hover/text:text-on-error-container-dark"],
         borderColor: ["border-error dark:border-error-dark", "border-error dark:border-error-dark", 
            "group-hover/text:border-on-error-container dark:group-hover/text:border-on-error-container-dark"],
         svgFill: "fill-onSurface-variant dark:fill-onSurface-variant-dark",
         supportiveColor: "text-error dark:text-error-dark"
      };
   } else {
      return {
         textLabelColor: ["text-primary dark:text-primary-dark", "text-onSurface dark:text-onSurface-dark", 
            "text-onSurface-variant dark:text-onSurface-variant-dark", "group-hover/text:text-onSurface dark:group-hover/text:text-onSurface-dark"],
         borderColor: ["border-outline dark:border-outline-dark", "border-primary dark:border-primary-dark", 
            "group-hover/text:border-onSurface dark:group-hover/text:border-onSurface-dark"],
         svgFill: "fill-onSurface-variant dark:fill-onSurface-variant-dark",
         supportiveColor: "text-onSurface-variant dark:text-onSurface-variant-dark"
      };
   }
};

/**
 * Return an object with desire styles from two options
 * @param {TextFieldStyles} styles the desire style
 * @returns 
 */
const textFieldStyles = (styles) => {
   switch (styles) {
      case TextFieldStyles.FILLED:
         return {
            labelStyle: "bg-transparent",
            labelPosition: ["label--position--base--filled", "label--position--click--filled"],
            inputColor: "bg-surface-container-highest dark:bg-surface-container-highest-dark",
            roundedStyle: "rounded-t",
            borderStyle: ["border-b-2", "border-b", "border-b-1"]
         };

      case TextFieldStyles.OUTLINE:
         return {
            labelStyle: "bg-white dark:bg-black",
            labelPosition: ["label--position--base--outline", "label--position--click--outline"],
            inputColor: "",
            roundedStyle: "rounded",
            borderStyle: ["border-2", "border", "border-1"]
         };
      default:
         break;
   }
};

/**
 * 
 * @param {object} props
 * @param {TextFieldStyles} [props.styles] The style to chose 
 * @param {string} props.label The label name
 * @param {string} [props.initialValue] The input value you want to start with
 * @param {TextFieldTypes} [props.type] The Text field type you want
 * @param {InputTypes} [props.initialInputType] The input type you want
 * @param {string} [props.supportiveText] The supportive text you want
 * @param {boolean} [props.isError] If you want show the error styles
 * @param {boolean} [props.isDisable] If you want show the disable styles
 * @param {import("react").MutableRefObject} [props.valueRef] If you want work with input reference
 * @param {() => void} [props.functionToUpdate] If you want execute a function
 * @param {Array<String>} [props.menuParameters] The necessary values to the menu component
 * @param {string} [props.menuClasses] The modal styles
 * @param {Array<import("../Modal").ListParameter>} [props.modalParameters] The necessary values to list modal
 * @param {boolean} [props.required] if the Text field is required
 * @param {string} [props.autoComplete] if the Text field can use autocomplete
 * @param {number} [props.min] The min value allow it in the input
 * @param {number} [props.max] The max value allow it in the input
 * @returns 
 */
export const TextField = ({
   styles = TextFieldStyles.OUTLINE,
   label,
   initialValue = "",
   type = TextFieldTypes.DEFAULT,
   initialInputType = InputTypes.TEXT,
   supportiveText = "",
   isError = false,
   isDisable = false,
   valueRef,
   functionToUpdate,
   menuParameters,
   menuClasses,
   modalParameters,
   required = true,
   autoComplete = "off",
   min,
   max
}) => {

   const [isClicked, setIsClicked] = useState(false);
   const [value, setValue] = useState(initialValue);
   const [inputType, setInputType] = useState((type === TextFieldTypes.PASSWORD) ? InputTypes.PASSWORD.description :  initialInputType.description);
   const [isShowMenu, setIsShowMenu] = useState(false);
   const textFieldId = useId();
   
   const handleClickOutside = () => {
      setIsClicked(false);
      setIsShowMenu(false);
   };

   const ref = useOutsideClick(handleClickOutside);
   /** @type {import("react").MutableRefObject<HTMLDialogElement>} */
   const dialogRef = useRef();
   
   const showModal = () => {
      const dialogComponent = dialogRef.current;
      if (type === TextFieldTypes.MODAL && dialogComponent) {
         dialogComponent.inert = true;
         dialogComponent.showModal?.();
         dialogComponent.inert = false;
      } else {
         dialogComponent?.showModal?.();
      }
   };
   
   const onClear = () => setValue("");

   const notMenu = type !== TextFieldTypes.MENU;
   const notModal = type !== TextFieldTypes.MODAL;
   let isReadOnly = (!notMenu || !notModal) ? true : false;


   const svgContainer = "bg-transparent flex justify-center items-center w-6 h-6 mr-3";
   const { labelStyle, labelPosition, inputColor, roundedStyle, borderStyle } = textFieldStyles(styles);
   const { textLabelColor, borderColor, svgFill, supportiveColor } = getColors(isDisable, isError);

   useEffect(() => {
      if (type === TextFieldTypes.MENU) {
         functionToUpdate?.();
      }
   }, [value]);
   
   return (
      <div ref={ref} className="inline-flex flex-col w-full group/text">
         <label htmlFor={textFieldId} className={`${labelStyle} w-fit block absolute origin-top-left z-10 font-sans font-normal text-base cursor-text
         ${isClicked ? `${labelPosition[1]} ${textLabelColor[0]}` : `${labelPosition[0]} ${textLabelColor[3]} ${(type === TextFieldTypes.SEARCH && !value) && "ml-6"}`}
         ${(value) ? `${labelPosition[1]} ${textLabelColor[1]}` : `${textLabelColor[2]}`}`}>
            {label}
         </label>
            
         <div className={`${inputColor} ${roundedStyle} ${borderStyle[1]} inline-flex relative items-center font-sans font-normal text-base cursor-text 
         transition ${isError ? "caret-error dark:caret-error-dark" : "caret-primary dark:caret-primary-dark"}
         ${isClicked ? `${borderStyle[0]} ${borderColor[1]}` : `${borderColor[0]} ${borderColor[2]} 
         ${(styles === TextFieldStyles.OUTLINE) ? "bg-transparent" : ((styles === TextFieldStyles.FILLED) && !isDisable) ? 
            "group-hover/text:bg-onSurface/38 dark:group-hover/text:bg-onSurface-dark/38" : "dark:bg-onSurface-dark/4"}`}`}>

            {type === TextFieldTypes.SEARCH && <SearchIcon fillClass={"ml-3"} />}   
            <input 
               id={textFieldId}
               value={value}
               className={`w-full h-14 bg-transparent outline-none text-start text text-onSurface disabled:text-onSurface/38 
                  dark:text-onSurface-dark dark:disabled:text-onSurface-dark/38
                  ${(styles === TextFieldStyles.FILLED) ? "px-4 pt-[1.5rem] pb-2" : "p-4"}`}
               type={inputType}
               min={min}
               max={max}
               ref={valueRef}
               autoComplete={autoComplete}
               required={required}
               readOnly={isReadOnly}
               disabled={isDisable}
               aria-describedby={(supportiveText) ? textFieldId + "-describe" : ""}
               aria-invalid={Boolean(isError)}
               onClick={() => {
                  setIsClicked(true);
                  if (!notModal) {
                     showModal();
                  } else if (!notMenu) {
                     setIsShowMenu(true);
                  }
               }}
               onFocus={() => {
                  setIsClicked(true);
                  if (!notMenu) { 
                     onClear();
                  }
                  
               }}
               onBlur={() => {
                  if (notMenu && notModal) {
                     setIsClicked(false);
                  }
               }}
               onInput={
                  /** @param {import("react").ChangeEvent<HTMLInputElement>} e */
                  (e) => setValue(e.target.value)
               }
               onKeyDown={
                  /** @param {any} e */
                  (e) => {
                     if (e.key === "Enter") {
                        e.target.blur();
                        functionToUpdate?.();
                        setValue(value);
                        showModal();
                        if (!notMenu) {
                           setIsShowMenu(true);
                        }
                     } 
                     if (e.key === "Tab" && (!notModal || !notMenu)) {
                        setIsClicked(false);
                        setIsShowMenu(false);
                     }
                  }
               }
            />

            {(notMenu && notModal && (type !== TextFieldTypes.PASSWORD)) && 
               <CancelIcon 
                  fillClass={`mr-3 ${(isClicked || value) ? `${svgFill}` : "fill-none"} ${(!isDisable) ? "cursor-pointer" : "cursor-default"}`} 
                  onClick={() => {
                     if (!isDisable) {
                        onClear();
                        setTimeout(() => {
                           functionToUpdate?.();
                        }, 100);
                     }
                  }}
               />
            }

            {(notMenu && notModal && (type === TextFieldTypes.PASSWORD)) && 
               <VisibilityIcon 
                  fillClass={`mr-3 ${(isClicked || value) ? svgFill : "fill-none"} ${(!isDisable) ? "cursor-pointer" : "cursor-default"}`} 
                  show={inputType}
                  handleClick={() => {
                     if (!isDisable) {
                        (inputType === InputTypes.PASSWORD.description) ? setInputType(InputTypes.TEXT.description): 
                           setInputType(InputTypes.PASSWORD.description);
                     }
                  }}
               />
            }
            
            {(!notMenu && !isClicked) && <div className={svgContainer}>
               <ArrowDownIcon fillClass={svgFill} />
            </div>}
            {(!notMenu  && isClicked) && <div className={svgContainer}>
               <ArrowUpIcon fillClass={"fill-primary dark:fill-primary-dark"} />
            </div>}

            {!notModal && <div className={svgContainer}>
               <ModalIcon fillClass={`${isDisable ? "stroke-onSurface/38 dark:stroke-onSurface-dark/38" : "stroke-onSurface-variant dark:stroke-onSurface-variant-dark"}`} />
            </div>}
         </div>
         {(supportiveText) && <span 
            id={textFieldId + "-describe"} 
            className={`ml-4 mt-1 text-sm w-full md:whitespace-pre ${supportiveColor}`}
            aria-disabled={isDisable}
         >{supportiveText}</span>}
         
         {(!notMenu && isShowMenu)  && <Menu
            menuClasses={menuClasses}
            parameters={menuParameters}
            setValue={setValue}
            handleClickOutside={handleClickOutside}
         />}

         {!notModal && <Modal 
            dialogRef={dialogRef}
            title={label}
            listUtils={{
               parameters: modalParameters,
               setValue,
               setIsClicked,
               functionToUpdate: functionToUpdate
            }}
         />}
      </div>
   );
};
