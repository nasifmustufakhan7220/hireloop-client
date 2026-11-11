"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
  Bookmark,
  Briefcase,
  Building2,
  FileText,
  LayoutDashboard,
  Users,
  Wallet,
  Settings,
  type LucideIcon,
  PlusCircle,
  Home,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Role = "seeker" | "recruiter" | "admin"

type MenuType = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const pathname = usePathname()
  const role = session?.user?.role || "seeker"
  if (isPending) {
    return (
      <aside className="min-h-screen w-72 bg-[#171717] px-5 py-10">
        <div className="flex animate-pulse flex-col gap-5">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Icon Skeleton */}
              <div className="h-5 w-5 rounded-md bg-gray-700" />

              {/* Text Skeleton */}
              <div
                className={`h-4 rounded-md bg-gray-700 ${
                  index === 0
                    ? "w-12"
                    : index === 1
                      ? "w-20"
                      : index === 2
                        ? "w-24"
                        : index === 3
                          ? "w-24"
                          : index === 4
                            ? "w-16"
                            : index === 5
                              ? "w-24"
                              : "w-16"
                }`}
              />
            </div>
          ))}
        </div>
      </aside>
    )
  }
  const sideMenuItems: Record<Role, MenuType[]> = {
    seeker: [
      { id: "home", name: "Home", url: "/", icon: Home },
      {
        id: "dashboard",
        name: "Dashboard",
        url: "/dashboard/seeker",
        icon: LayoutDashboard,
      },
      {
        id: "jobs",
        name: "Jobs",
        url: "/dashboard/seeker/jobs",
        icon: Briefcase,
      },
      {
        id: "saved-jobs",
        name: "Saved Jobs",
        url: "/dashboard/seeker/saved-jobs",
        icon: Bookmark,
      },
      {
        id: "applications",
        name: "Applications",
        url: "/dashboard/seeker/applications",
        icon: FileText,
      },
      {
        id: "billing",
        name: "Billing",
        url: "/dashboard/seeker/billing",
        icon: Wallet,
      },
      {
        id: "settings",
        name: "Settings",
        url: "/dashboard/seeker/settings",
        icon: Settings,
      },
    ],
    recruiter: [
      { id: "home", name: "Home", url: "/", icon: Home },
      {
        id: "dashboard",
        name: "Dashboard",
        url: "/dashboard/recruiter",
        icon: LayoutDashboard,
      },
      {
        id: "my-company",
        name: "My Company",
        url: "/dashboard/recruiter/my-company",
        icon: Building2,
      },
      {
        id: "manage-jobs",
        name: "Manage Jobs",
        url: "/dashboard/recruiter/jobs",
        icon: Briefcase,
      },
      {
        id: "add-job",
        name: "Add Job",
        url: "/dashboard/recruiter/jobs/new",
        icon: PlusCircle,
      },
      {
        id: "applications",
        name: "Applications",
        url: "/dashboard/recruiter/applications",
        icon: FileText,
      },
      {
        id: "settings",
        name: "Settings",
        url: "/dashboard/recruiter/settings",
        icon: Settings,
      },
    ],
    admin: [
      { id: "home", name: "Home", url: "/", icon: Home },
      {
        id: "dashboard",
        name: "Dashboard",
        url: "/dashboard/admin",
        icon: LayoutDashboard,
      },
      {
        id: "users",
        name: "Users",
        url: "/dashboard/admin/users",
        icon: Users,
      },
      {
        id: "companies",
        name: "Companies",
        url: "/dashboard/admin/companies",
        icon: Building2,
      },
      {
        id: "jobs",
        name: "Jobs",
        url: "/dashboard/admin/jobs",
        icon: Briefcase,
      },
      {
        id: "payments",
        name: "Payments",
        url: "/dashboard/admin/payments",
        icon: Wallet,
      },
      {
        id: "settings",
        name: "Settings",
        url: "/dashboard/admin/settings",
        icon: Settings,
      },
    ],
  }
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {sideMenuItems[role].map((menu) => (
              <SidebarMenuItem key={menu.id}>
                <SidebarMenuButton
                  render={
                    <Link
                      href={menu.url}
                      className={`${
                        pathname === menu.url ||
                        (menu.url === "/dashboard/recruiter/jobs" &&
                          pathname.startsWith("/dashboard/recruiter/jobs/") &&
                          pathname !== "/dashboard/recruiter/jobs/new")
                          ? "bg-violet-500/10 text-violet-400"
                          : "hover:bg-input/50"
                      }`}
                    />
                  }
                >
                  <menu.icon />
                  <span>{menu.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
