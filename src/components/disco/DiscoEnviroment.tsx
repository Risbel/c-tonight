import useGetDisco from "@/hooks/useGetDisco";
import Image from "next/image";
import { useSession } from "next-auth/react";

import FooterDisco from "./FooterDisco";
import Head from "./Head";
import SubscribeNow from "./SubscribeNow";
import AboutUs from "./AboutUs";
import Experiencies from "./Experiencies";
import { SkeletonAboutUs, SkeletonExperiences, SkeletonHead } from "./Skeleton";
import Navbar from "../navigation/Navbar";
import useGetMyPermissions from "@/hooks/useGetMyPermissions";
import { useGetDiscoTicketsByIdDisco } from "@/hooks/useGetDiscoTicketsByIdDisco";
import DiscoTickets from "./DiscoTickets";
import Link from "next/link";
import { Button } from "../ui/button";

const DiscoEnviroment = ({ name }: { name: string }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: discoData, isLoading: loadingDisco, isError: isErrordisco, error } = useGetDisco({ name, userId });
  const discoId = discoData?.disco?.id;

  const { data: myPermissions } = useGetMyPermissions(userId, discoId);

  const { data: discotickets } = useGetDiscoTicketsByIdDisco(discoId);

  if (isErrordisco) {
    return (
      <div className="flex gap-4 w-full h-screen justify-center items-center bg-black">
        <span className="text-white text-5xl font-semibold">{error?.response?.status}</span>
        <span className="text-white text-xl">{error?.response?.data?.message}</span>

        <Link href={"/"}>
          <Button>Back to home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-black">
      <style>
        {`
          ::-webkit-scrollbar {
            width: 0.1rem;
          }
          ::-webkit-scrollbar-button {
            display: none;
          }
        `}
      </style>
      <Navbar />
      {loadingDisco || !discoData ? (
        <div className="flex flex-col gap-4 md:gap-8 h-full w-screen bg-black overscroll-none pt-20 px-8">
          <SkeletonHead />
          <SkeletonAboutUs />
          <SkeletonExperiences />
        </div>
      ) : (
        <Image
          className="absolute h-full object-cover"
          src={discoData?.disco?.discoDetail?.bgImage}
          width={1800}
          height={800}
          alt="Picture of the author"
          placeholder="blur"
          blurDataURL={discoData?.disco?.discoDetail?.bgImage}
        />
      )}

      <div className="pt-24 px-4 md:px-8 relative z-10">
        <div>
          <div className="flex flex-col gap-4 md:gap-8">
            {loadingDisco ? null : <Head disco={discoData?.disco} />}

            {loadingDisco
              ? null
              : discoData &&
                discoId &&
                userId &&
                !discoData?.subscription && <SubscribeNow userId={userId} discoId={discoId} />}

            <>
              {loadingDisco
                ? null
                : discoData && <AboutUs largeDescription={discoData?.disco.discoDetail.largeDescription} />}
            </>
            {loadingDisco
              ? null
              : discoData && <Experiencies myPermissions={myPermissions} discoDetail={discoData?.disco.discoDetail} />}
          </div>
        </div>
        <div>
          {loadingDisco ? null : (
            <DiscoTickets name={name} myPermissions={myPermissions} discoId={discoId} discoTickets={discotickets} />
          )}
        </div>
      </div>
      {loadingDisco ? null : discoData && <FooterDisco phone={discoData?.disco.discoDetail.phone} />}
    </div>
  );
};

export default DiscoEnviroment;
