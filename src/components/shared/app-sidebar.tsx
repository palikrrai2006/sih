"use client"

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Trophy,
  Users,
  LineChart,
  Languages,
  Cog,
  FlaskConical,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { users } from "@/lib/data"
import type { Role } from "@/lib/types"

const studentNav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/lessons", icon: BookOpen, label: "Lessons" },
  { href: "/quizzes", icon: HelpCircle, label: "Quizzes" },
  { href: "/rewards", icon: Trophy, label: "Rewards" },
]

const teacherNav = [
  { href: "/dashboard", icon: LineChart, label: "Analytics" },
  { href: "/lessons", icon: BookOpen, label: "Lessons" },
  { href: "/quizzes", icon: HelpCircle, label: "Quizzes" },
  { href: "/analytics", icon: Users, label: "Manage Students" },
]

const adminNav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/translator", icon: Languages, label: "Translator" },
  { href: "/lessons", icon: Cog, label: "Content" },
]

export default function AppSidebar() {
  const searchParams = useSearchParams()
  const role: Role = (searchParams.get("role") as Role) || "student"

  const getNavItems = () => {
    switch (role) {
      case "teacher":
        return teacherNav
      case "admin":
        return adminNav
      case "student":
      default:
        return studentNav
    }
  }

  const navItems = getNavItems()
  const currentUser =
    users.find((u) => u.role === role) || users.find((u) => u.role === "student")!

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <FlaskConical className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold font-headline text-primary group-data-[collapsible=icon]:hidden">
            STEM Quest
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={`${item.href}?role=${role}`} legacyBehavior passHref>
                <SidebarMenuButton tooltip={item.label}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">{currentUser.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{currentUser.role}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
