import { useId, useRef, useState } from "react";
import { TextFieldTypes } from "../../constants/TextFieldType";
import { InputTypes } from "../../constants/InputType";
import { Menu } from "../Menu";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useEffect } from "react";
import { Modal } from "../Modal";
import "./TextField.css";
import { ArrowDownIcon } from "../../assets/arrow_drop_down";
import { ArrowUpIcon } from "../../assets/arrow_drop_up";
import { ModalIcon } from "../../assets/modal";
import { CancelIcon } from "../../assets/cancel_icon";
import { SearchIcon } from "../../assets/search_icon";

const getColors = (isDisable, isError) => {
   if (isDisable) {
      return {
         textLabelColor: ["text-onSurface/38", "text-onSurface/38", "text-onSurface/38", "group-hover/text:text-onSurface/38"],
         outlineColor: ["outline-onSurface/12", "outline-onSurface/12", "group-hover/text:outline-onSurface/12"],
         svgFill: "fill-onSurface/38",
         supportiveColor: "text-onSurface/38"
      };
   } else if (isError) {
      return {
         textLabelColor: ["text-error", "text-error", "text-error", "group-hover/text:text-on-error-container"],
         outlineColor: ["outline-error", "outline-error", "group-hover/text:outline-on-error-container"],
         svgFill: "fill-onSurface-variant",
         supportiveColor: "text-error"
      };
   } else {
      return {
         textLabelColor: ["text-primary", "text-onSurface", "text-onSurface-variant", "group-hover/text:text-onSurface"],
         outlineColor: ["outline-outline", "outline-primary", "group-hover/text:outline-onSurface"],
         svgFill: "fill-onSurface-variant",
         supportiveColor: "text-onSurface-variant"
      };
   }
};

export const TextField = ({
   label,
   type = TextFieldTypes.DEFAULT,
   inputType = InputTypes.TEXT,
   supportiveText = "",
   isError = false,
   isDisable = false,
   valueRef,
   functionToUpdate,
   menuParameters,
   modalParameters
}) => {

   const [isClicked, setIsClicked] = useState(false);
   const [value, setValue] = useState("");
   const [isChange, setIsChange] = useState(false);
   const [isShowMenu, setIsShowMenu] = useState(false);
   const textFieldId = useId();
   
   const handleClickOutside = () => {
      setIsClicked(false);
      setIsChange(!isChange);
      setIsShowMenu(false);
   };

   const ref = useOutsideClick(handleClickOutside);
   const dialogRef = useRef();
   
   const showModal = () => {
      dialogRef.current?.showModal?.();
   };
   
   const onClear = () => setValue("");

   const notMenu = type !== TextFieldTypes.MENU;
   const notModal = type !== TextFieldTypes.MODAL;
   let isReadOnly = (!notModal || !notMenu) ? true : false;


   const svgContainer = "bg-transparent flex justify-center items-center w-6 h-6 mr-3";
   const { textLabelColor, outlineColor, svgFill, supportiveColor } = getColors(isDisable, isError);

   useEffect(() => {
      functionToUpdate?.();
   }, [isChange]);
   
   return (
      <div ref={ref} className="inline-flex flex-col w-full group/text">
         <label htmlFor={textFieldId} className={`bg-white w-fit block absolute origin-top-left z-10 font-sans font-normal text-base cursor-text
         ${isClicked ? `label--position--click ${textLabelColor[0]}` : `label--position--base ${textLabelColor[3]} ${(type === TextFieldTypes.SEARCH && !value) && "ml-6"}`}
         ${(value.length > 0) ? `label--position--click ${textLabelColor[1]}` : `${textLabelColor[2]}`}`}>
            {label}
         </label>
            
         <div className={`inline-flex relative items-center rounded outline font-sans font-normal text-base cursor-text 
         ${isError ? "caret-error" : "caret-primary"}
         ${isClicked ? `outline-2 ${outlineColor[1]}` : `outline-1 ${outlineColor[0]} ${outlineColor[2]}`}`}>

            {type === TextFieldTypes.SEARCH && <SearchIcon fillClass={"ml-3"} />}

            <input 
               id={textFieldId}
               value={value}
               className={`w-full h-14 p-4 bg-transparent outline-none text-onSurface disabled:text-onSurface/38`}
               type={inputType.description}
               ref={valueRef}
               autoComplete="off"
               required
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
                     setIsChange(!isChange);
                     setValue(value);
                     showModal();
                     if (!notMenu) {
                        setIsShowMenu(true);
                     }
                  } 
                  if (e.key === "Tab" && (!notModal || !notMenu)) {
                     setIsClicked(false);
                  }
               }}
            />

            {(notMenu && notModal) && <CancelIcon 
               fillClass={`mr-3 ${(isClicked || value) ? `${svgFill} cursor-pointer` : "fill-none"}`} 
               onClick={() => {
                  if (!isDisable) {
                     onClear();
                     setIsChange(!isChange);
                  }
               }}
            />}
            
            {(!notMenu && !isClicked) && <div className={svgContainer}>
               <ArrowDownIcon fillClass={svgFill} />
            </div>}
            {(!notMenu  && isClicked) && <div className={svgContainer}>
               <ArrowUpIcon fillClass={"fill-primary"} />
            </div>}

            {!notModal && <div className={svgContainer}>
               <ModalIcon fillClass={`${isDisable ? "stroke-onSurface/38" : "stroke-onSurface-variant"}`} />
            </div>}
         </div>
         {(supportiveText) && <span 
            id={textFieldId + "-describe"} 
            className={`ml-4 mt-1 text-sm ${supportiveColor}`}
            aria-disabled={isDisable}
         >{supportiveText}</span>}
         
         {(!notMenu && isShowMenu)  && <Menu 
            parameters={menuParameters}
            setValue={setValue}
            handleClickOutside={handleClickOutside}
            setIsClicked={setIsClicked}
            isChange={isChange}
            setIsChange={setIsChange}
            setIsShowMenu={setIsShowMenu}
         />}

         {!notModal && <Modal 
            dialogRef={dialogRef}
            title={label}
            listUtils={{
               parameters: modalParameters,
               setValue,
               isChange,
               setIsChange,
               setIsClicked
            }}
         />}
      </div>
   );
};
