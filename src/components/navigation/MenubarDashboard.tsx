import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";

const MenubarDashboard = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Events</MenubarTrigger>
        <MenubarContent className="w-96">
          <MenubarItem className="bg-secondary m-2 border cursor-pointer">
            <Link href="/dashboard/workspace" className="flex justify-between items-center w-full">
              <span className="md:text-base">Create new event</span>
              <PlusCircle className="font-semibold hover:scale-105" height={20} width={20} />
            </Link>
          </MenubarItem>

          <div className="flex flex-col">
            <div className="flex justify-center">
              <p className="font-semibold">List of events</p>
            </div>
            <div className="px-2">
              <ul>
                <li className="flex gap-4 hover:gap-6 hover:bg-secondary  pl-1 rounded cursor-pointer">
                  <span className="hover:translate-x-1  transition-transform duration-300">Fiesta Lunar</span>
                </li>
                <li className="flex gap-4 hover:gap-6 hover:bg-secondary  pl-1 rounded cursor-pointer">
                  <span className="hover:translate-x-1  transition-transform duration-300">Encuentro Estelar</span>
                </li>
                <li className="flex gap-4 hover:gap-6 hover:bg-secondary  pl-1 rounded cursor-pointer">
                  <span className="hover:translate-x-1  transition-transform duration-300">Festival de Innovación</span>
                </li>
                <li className="flex gap-4 hover:gap-6 hover:bg-secondary  pl-1 rounded cursor-pointer">
                  <span className="hover:translate-x-1  transition-transform duration-300">Noche de Gala Cultural</span>
                </li>
              </ul>
            </div>
          </div>

          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger className="md:text-base">Share events:</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem className="focus:bg-red-400">Email</MenubarItem>
              <MenubarItem className="focus:bg-blue-500">Telegram</MenubarItem>
              <MenubarItem className="focus:bg-green-600">WhatsApp</MenubarItem>
              <MenubarItem>SMS</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem className="md:text-base">
            View all events <MenubarShortcut>⌘AE</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div className="border-r border-muted h-8"></div>
      <MenubarMenu>
        <MenubarTrigger>Resources</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Tutorials</MenubarItem>
          <MenubarItem>Documentation</MenubarItem>
          <MenubarItem>Community</MenubarItem>
          <MenubarItem>Forums</MenubarItem>
          <MenubarItem>Blog</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <div className="border-r border-muted h-8"></div>
      <MenubarMenu>
        <MenubarTrigger>Users</MenubarTrigger>
        <MenubarContent className="w-80">
          <MenubarItem className="bg-secondary m-2 border cursor-pointer">
            <span className="md:text-base">Add user</span>
            <MenubarShortcut>
              <PlusCircle className="font-semibold hover:scale-105" height={20} width={20} />
            </MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <div className="flex flex-col">
            <div className="flex justify-center">
              <p>List of users</p>
            </div>
            <div className="px-2">
              <ul>
                <li className="flex gap-4 hover:gap-6 hover:bg-secondary  pl-1 rounded cursor-pointer">
                  <span className="hover:translate-x-1  transition-transform duration-300">Marta Pérez</span>
                </li>
                <li className="flex gap-4 hover:gap-6 hover:bg-secondary  pl-1 rounded cursor-pointer">
                  <span className="hover:translate-x-1  transition-transform duration-300">Juan Rodríguez</span>
                </li>
                <li className="flex gap-4 hover:gap-6 hover:bg-secondary  pl-1 rounded cursor-pointer">
                  <span className="hover:translate-x-1  transition-transform duration-300">Carla Gómez</span>
                </li>
                <li className="flex gap-4 hover:gap-6 hover:bg-secondary  pl-1 rounded cursor-pointer">
                  <span className="hover:translate-x-1  transition-transform duration-300">Alejandro García</span>
                </li>
              </ul>
            </div>
          </div>
          <MenubarSeparator />
          <MenubarItem className="md:text-base">
            View all users <MenubarShortcut>⌘AU</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MenubarDashboard;
