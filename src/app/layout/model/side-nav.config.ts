import { TablerIconName } from "../../shared/icon/icons/tabler-icons";

export interface NavigationItem {
  name: string;
  path: string;
  icon: TablerIconName;
  label: string;
};

export const navigationConfig: NavigationItem[] = [
  {
    name: "home",
    path: "/home",
    icon: "home",
    label: "Home",
  }, 
  {
    name: "thresholds",
    path: "/thresholds",
    icon: "settings",
    label: "Grading system",
  },
];
