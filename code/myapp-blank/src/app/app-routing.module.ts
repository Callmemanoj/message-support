import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
  },

  {
    path: "",
    loadChildren: "./tabs/tabs.module#TabsPageModule",
  },

  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.module").then((m) => m.ContactPageModule),
  },
  {
    path: "chat",
    loadChildren: () =>
      import("./chat/chat.module").then((m) => m.ChatPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
