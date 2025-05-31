import type { Routes } from "@angular/router"
import { Home } from "./features/home/home/home";
import { Thresholds } from "./features/thresholds/thresholds";

export const routes: Routes = [
    { path: '', component: Home, },

    { path: 'home', component: Home },

    { path: 'thresholds', component: Thresholds },

    { path: '**', component: Home }
];
