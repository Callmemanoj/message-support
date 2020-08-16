import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "info",
        children: [
          {
            path: "",
            loadChildren: "../info/info.module#InfoPageModule",
          },
        ],
      },
      {
        path: "support",
        children: [
          {
            path: "",
            loadChildren: "../support/support.module#SupportPageModule",
          },
        ],
      },
      {
        path: "logout",
        children: [
          {
            path: "",
            loadChildren: "../logout/logout.module#LogoutPageModule",
          },
        ],
      },
      {
        path: "",
        redirectTo: "tabs/info",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
