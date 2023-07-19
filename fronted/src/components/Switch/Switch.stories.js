import { Switch } from "./Switch";

export default {
   title: "Switch",
   component: Switch,
   tags: ['autodocs']
};

export const DefaultFalse = {
   args: {
      label: "Default-false",
      status: "default",
      selected: false
   }
}

export const DisabledFalse = {
   args: {
      label: "Disabled-false",
      status: "disabled",
      selected: false
   }
}

export const DefaultTrue = {
   args: {
      label: "Default-true",
      status: "default",
      selected: true
   }
}

export const DisabledTrue = {
   args: {
      label: "Disabled-true",
      status: "disabled",
      selected: true
   }
}