export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Clients: undefined;
  NewDeal: undefined;
  ClientDetail: undefined;
  Deals: undefined;
};

export type Client = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  managerId: string;
};

export type Deal = {
  id: string;
  clientId: string;
  clientName: string;
  programId: string;
  programName: string;
  amount: number;
  commission: number;
  date: string;
  status: string;
};

export type Program = {
  id: string;
  name: string;
  price: number;
  commission: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  city: string;
};
