import type { Routes } from "@angular/router"
import { Home } from "./features/home/home";
import { User } from "./features/user/user";
import { Thresholds } from "./features/thresholds/thresholds";

export const routes: Routes = [
    { path: '', component: Home, },

    { path: 'home', component: Home },

    { path: 'user', component: User },

    { path: 'thresholds', component: Thresholds },

    { path: '**', component: Home }
];
