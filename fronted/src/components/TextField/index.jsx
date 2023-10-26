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
         ${isError ? "caret-error dark:caret-error-dark" : "caret-primary dark:caret-primary-dark"}
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
               autoComplete="off"
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
               onInput={(e) => setValue(e.target.value)}
               onKeyDown={(e) => {
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
               }}
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
            className={`ml-4 mt-1 text-sm ${supportiveColor}`}
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
