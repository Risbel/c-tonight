import { Link } from "lucide-react";
import AboutPreview from "./AboutPreview";
import BannerPreview from "./BannerPreview";
import ExperiencesPreview from "./ExperiencesPreview";
import NavbarPreview from "./NavbarPreview";
import TicketsPreview from "./TicketsPreview";
import Image from "next/image";
import FormContact from "@/pages/components/FormContact";
import { AddDiscoSchema } from "@/pages/dashboard/workspace/components/AddDiscos";

const Preview = ({ values }: { values: AddDiscoSchema }) => {
  return (
    <div className="relative">
      <NavbarPreview values={values} />
      <BannerPreview values={values} />
      <AboutPreview values={values} />
      <ExperiencesPreview values={values} />
      <TicketsPreview values={values} />
      <div className="relative bg-foreground">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="flex flex-wrap px-6 md:p-12 gap-8 md:w-1/2 lg:w-3/4">
            <div>
              <h3 className="text-white text-2xl font-semibold">Company Info:</h3>
              <ol>
                <li className="text-primary-foreground/60">MyAiPeople</li>
                <li className="text-primary-foreground/60">123 Street, Cityville, State, ZIP</li>
                <li className="text-primary-foreground/60">© 2024 Your Company.</li>
              </ol>
              <div>
                <h3 className="text-white text-2xl font-semibold mt-6">Social:</h3>
                <div className="flex gap-4 items-center py-2">
                  <Link href={"/#"} className="hover:scale-105">
                    <Image src={"/facebook-icon.svg"} height={30} width={30} alt="facebook icon" />
                  </Link>

                  <Link href={"/#"} className="hover:scale-105">
                    <Image src={"/instagram-icon.svg"} height={30} width={30} alt="instagram icon" />
                  </Link>

                  <Link href={"/#"} className="hover:scale-105">
                    <Image src={"/twitter-icon.svg"} height={30} width={30} alt="twitter icon" />
                  </Link>

                  <Link href={"/#"} className="hover:scale-105">
                    <Image src={"/youtube-icon.svg"} height={30} width={30} alt="youtube icon" />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold">Quick Links:</h3>
              <ul>
                <li className="text-primary-foreground/60">Terms of Service</li>
                <li className="text-primary-foreground/60">Privacy Policy</li>
                <li className="text-primary-foreground/60">FAQ</li>
                <li className="text-primary-foreground/60">Careers</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-2xl font-semibold">Contacts:</h3>
              <ol>
                <li className="text-primary-foreground/60">Email: info@example.com</li>
                <li className="text-primary-foreground/60">Phone: +1 (555) 123-4567</li>
              </ol>
            </div>
          </div>

          <div className="relative p-8 bg-foreground w-full md:w-1/2">
            <FormContact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
