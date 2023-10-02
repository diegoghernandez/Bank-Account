import { Switch } from ".";

export default {
   title: "Switch",
   component: Switch,
   tags: ['autodocs']
};

export const DefaultFalse = {
   args: {
      label: "Default-false",
      isDisable: false,
      checked: false
   }
};

export const DisabledFalse = {
   args: {
      label: "Disabled-false",
      isDisable: true,
      checked: false
   }
};

export const DefaultTrue = {
   args: {
      label: "Default-true",
      isDisable: false,
      checked: true
   }
};

export const DisabledTrue = {
   args: {
      label: "Disabled-true",
      isDisable: true,
      checked: true
   }
};