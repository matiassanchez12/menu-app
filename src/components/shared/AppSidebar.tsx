'use server'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { NavUser } from "./NavUser";
import { getServerAuthSession } from "~/server/auth";
import { NavMain } from "./NavMain";
import { MenuSwitcher } from "./MenuSwitcher";

export async function AppSidebar() {
  const session = await getServerAuthSession();
  
  return (
    <Sidebar>
       <SidebarHeader>
        <MenuSwitcher menus={[]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
