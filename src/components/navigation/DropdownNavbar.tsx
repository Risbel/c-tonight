import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "../ui/avatar";
import Link from "next/link";

import { Session } from "next-auth";
import Logout from "../buttons/Logout";
import SuperAdminSettings from "./SuperAdminSettings";

const DropdownNavbar = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {!session.user?.image ? (
            <div className="bg-zinc-200 rounded-full flex justify-center items-center w-full relative z-20">
              <span className="text-md font-bold">{session.user?.name && session.user.name[0]}</span>
            </div>
          ) : (
            <div className="rounded-full overflow-hidden h-full w-full bg-slate-300 relative z-20">
              <AvatarImage src={session.user.image} />
            </div>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="backdrop-blur-sm bg-black/50 text-white rounded-r-none ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SuperAdminSettings />
        <Link href={"/profile"}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href={"/reservations"}>
          <DropdownMenuItem>Reservations</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavbar;
