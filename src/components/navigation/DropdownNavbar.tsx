import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

import { Session } from "next-auth";
import Logout from "../buttons/Logout";
import SuperAdminSettings from "./SuperAdminSettings";
import Image from "next/image";

const DropdownNavbar = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar>
          {!session.user?.image ? (
            <Image
              className="hover:scale-110 transition-transform"
              src={"/avatar-icon.svg"}
              alt="avatar icon"
              width={25}
              height={25}
            />
          ) : (
            <div className="flex items-center rounded-full overflow-hidden relative z-20">
              <AvatarImage className="h-10 w-10" src={session.user.image} />
              <AvatarFallback className="h-10 w-10" />
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
