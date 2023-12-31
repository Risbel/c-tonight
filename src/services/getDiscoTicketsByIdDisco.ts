import httpService from "@/config/axios.config";

export const getDiscoTicketsByIdDisco = async (discoId: string): Promise<IDiscoTicket[]> => {
  const resp = await httpService.get(`/discoTicket/disco/${discoId}`);
  return resp.data;
};

export interface IDiscoTicket {
  id: string;
  price: string;
  shortDescription: string;
  largeDescription: string;
  category: string;
  countInStock: string;
  createdAt: string;
  updatedAt: string;
  discoId: string;
  expDate: string;
  ticketsReservations: [
    {
      id: string;
      quantity: string;
    }
  ];
}
