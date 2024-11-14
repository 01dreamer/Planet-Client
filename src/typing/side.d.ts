import { VNode } from "vue";

export declare namespace SideType {
  export type Side = {
    currentActive: string;
    options: Array<SideOption>;
  };

  export type SideOption = {
    key1: string;
    label: string | VNode | (() => VNode);
    icon?: string | VNode | (() => VNode);
    active?: boolean;
    disabled?: boolean;
    actionable?: boolean;
    execute?: (key: string) => void;

    show?: boolean;
    showIcon?: boolean;
    showLabel?: boolean;
    showMask?: boolean;
  };
}
