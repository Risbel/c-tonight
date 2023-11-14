import { IDiscoTicket } from "@/services/getDiscoTicketsByIdDisco";
import Image from "next/image";
import AddTicketsButton from "../buttons/AddTicketsButton";
import clsx from "clsx";
import { ImyPermissions } from "@/services/getMyPermissionsOnDisco";
import useHavePermissions from "@/utils/useHavePermissions";
import EditTicketsForm from "../forms/EditTicketsForm";
import DeleteTicketButton from "../buttons/DeleteTicketButton";
import Link from "next/link";
import { useState } from "react";

export const LogoCategory = ({ category }: { category: string }) => {
  return (
    <div>
      {category === "VIP" && (
        <div className="flex justify-start px-3 py-[2px] bg-gradient-to-r from-yellow-500 to-red-500 rounded-sm mr-1">
          <Image
            className="object-cover"
            src="/vip.png"
            height={35}
            width={35}
            alt="vip icon"
            placeholder="blur"
            blurDataURL={"vip.png"}
          />
        </div>
      )}

      {category === "common" && (
        <Image
          className="object-cover"
          src="/ticket-common.png"
          height={60}
          width={60}
          alt="simple icon"
          placeholder="blur"
          blurDataURL={"ticket-common.png"}
        />
      )}
      {category === "economy" && (
        <Image
          className="object-cover"
          src="/ticket.png"
          height={60}
          width={60}
          alt="simple icon"
          placeholder="blur"
          blurDataURL={"ticket.png"}
        />
      )}
    </div>
  );
};

const DiscoTickets = ({
  name,
  myPermissions,
  discoId,
  discoTickets,
}: {
  name: string;
  myPermissions: ImyPermissions;
  discoId: string;
  discoTickets: IDiscoTicket[];
}) => {
  const [day, setDay] = useState("");

  const { havePermission } = useHavePermissions(myPermissions);

  const dates = discoTickets.map((ticket) => ticket.expDate.slice(0, 10));

  const unicDates = [...new Set(dates)].slice().sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf());

  const diasSemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <>
      {discoTickets?.length !== 0 && (
        <>
          <h1 className="font-extrabold text-4xl text-center text-white mt-10 pb-2">Tickets</h1>
          <div className="flex justify-center pb-4">
            <div className="flex gap-1 overflow-hidden max-w-screen-lg overflow-x-auto border rounded-md p-2 bg-white/10">
              {unicDates.map((date) => (
                <button
                  key={date}
                  className="flex flex-col items-center px-4 py-2 bg-slate-900/80 hover:bg-slate-900/90 leading-none rounded-md hover:-translate-y-[2px] shadow hover:shadow-lg hover:shadow-purple-600/40"
                  onClick={() => setDay(date)}
                >
                  <p className="text-white text-xs">{diasSemana[new Date(date).getDay()].slice(0, 3)}</p>
                  <p className="text-white text-xl">{date.slice(8, 10)}</p>
                  <p className="text-white text-xs">{meses[new Date(date).getMonth()]}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 p-2 rounded-md bg-black/20">
            {discoTickets?.map((ticket) => {
              if (ticket.expDate.slice(0, 10) === day) {
                return (
                  <div key={ticket.id}>
                    <div className="relative">
                      {Number(ticket.countInStock) === 0 && (
                        <div className="absolute z-20 w-full h-full bg-gray-800/80 border border-white rounded-md flex items-center justify-center">
                          <p className="text-slate-200 text-2xl">Sold out</p>
                        </div>
                      )}
                      <Link
                        href={`/disco/${name}/details-ticket/${ticket.id}`}
                        className="flex justify-between gap-2 border-2 bg-gradient-to-r from-black/70 to-slate-900/70 rounded-md p-2 relative shadow-lg hover:shadow-purple-500 hover:-translate-y-0.5"
                      >
                        <div className="text-white w-full">
                          <p className="text-sm">Reserve {ticket.category} tickets</p>
                          <div className="flex gap-3 items-center">
                            <div className="flex items-end -translate-y-1">
                              <div>💳</div>
                              <div className="text-sm"> ${ticket.price} c/u</div>
                            </div>
                            {(ticket.category === "VIP" || ticket.category === "economy") && (
                              <p className="text-xs">🪑 {ticket.countInStock} </p>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-light text-gray-100"> {ticket.shortDescription}</p>
                            <p className="text-xs font-semibold text-center text-gray-400 pt-2">
                              📆 {diasSemana[new Date(ticket.expDate).getDay()]} {ticket.expDate.slice(8, 10)}
                            </p>
                          </div>
                        </div>
                        <div className="flex absolute items-center gap-1 md:gap-2 right-1">
                          <div className=" text-white">{ticket.countInStock}</div>
                          <LogoCategory category={ticket.category} />
                        </div>
                      </Link>
                    </div>

                    <div className="flex gap-4 my-2 ">
                      {havePermission("update", "Tickets") && (
                        <div>
                          <EditTicketsForm
                            id={ticket.id}
                            price={ticket.price}
                            countInStock={ticket.countInStock}
                            shortDescription={ticket.shortDescription}
                          />
                        </div>
                      )}

                      {havePermission("delete", "Tickets") && <DeleteTicketButton id={ticket.id} />}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
      <div className={clsx(!havePermission("create", "Tickets") && "hidden", "my-10")}>
        <AddTicketsButton discoId={discoId} />
      </div>
    </>
  );
};

export default DiscoTickets;
