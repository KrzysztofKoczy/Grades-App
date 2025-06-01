export interface NavigationItem {
  name: string;
  path: string;
  icon: string;
//   icon: IconName;
  label: string;
}

// TODO handle icons
export const navigationConfig: NavigationItem[] = [
  {
    name: "home",
    path: "/home",
    icon: "home.svg",
    label: "Home",
  }, 
  {
    name: "thresholds",
    path: "/thresholds",
    icon: "thresholds.svg",
    label: "Grading system",
  },
]
