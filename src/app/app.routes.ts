import type { Routes } from "@angular/router"
import { Home } from "./features/home/home/home";
import { Thresholds } from "./features/thresholds/thresholds";


export const routes: Routes = [
    { path: '', component: Home, },

    { path: 'home', component: Home },
    { path: 'thresholds', component: Thresholds },

    // { path: 'about', component: About },
    // { path: 'contact', component: Contact },

    { path: '**', component: Home }
];

// export const routes: Routes = [
//   {
//     path: "",
//     redirectTo: "/home",
//     pathMatch: "full",
//   },
//   {
//     path: "home",
//     loadComponent: () => import("./features/home/home").then((m) => m.HomeComponent),
//   },
// //   {
// //     path: "thresholds",
// //     loadComponent: () => import("./features/thresholds/thresholds").then((m) => m.Tresholds),
// //   },
//   {
//     path: "**",
//     redirectTo: "/home",
//   },
// ]
