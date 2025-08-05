import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client, Deal, Program } from '../types';

const CLIENTS_KEY = '@clients';
const DEALS_KEY = '@deals';

const PROGRAMS: Program[] = [
  { id: '1', name: 'Курс Python', price: 20000, commission: 10 },
  { id: '2', name: 'Веб-дизайн', price: 15000, commission: 15 },
  { id: '3', name: 'Маркетинг', price: 18000, commission: 12 },
];

export default {
  // Клиенты
  async getClients(managerId: string): Promise<Client[]> {
    const data = await AsyncStorage.getItem(CLIENTS_KEY);
    const allClients = data ? JSON.parse(data) : [];
    return managerId ? allClients.filter((c: Client) => c.managerId === managerId) : allClients;
  },

  async saveClient(client: Client): Promise<Client> {
    const clients = await this.getClients('');
    let updatedClients: Client[];
    
    if (client.id) {
      updatedClients = clients.map((c: Client) => c.id === client.id ? client : c);
    } else {
      const newClient = {
        ...client,
        id: Date.now().toString(),
      };
      updatedClients = [...clients, newClient];
    }
    
    await AsyncStorage.setItem(CLIENTS_KEY, JSON.stringify(updatedClients));
    return client;
  },

  // Сделки
  async getDeals(managerId: string | null): Promise<Deal[]> {
    const data = await AsyncStorage.getItem(DEALS_KEY);
    const allDeals = data ? JSON.parse(data) : [];
    return managerId ? allDeals.filter((d: Deal) => d.managerId === managerId) : allDeals;
  },

  async saveDeal(deal: Deal): Promise<Deal> {
    const deals = await this.getDeals(null);
    const program = PROGRAMS.find(p => p.id === deal.programId);
    
    const newDeal: Deal = {
      ...deal,
      id: deal.id || Date.now().toString(),
      commission: program ? (deal.amount * program.commission) / 100 : 0,
      date: deal.date || new Date().toISOString(),
      status: deal.status || 'Ожидает оплаты'
    };

    const updatedDeals = deal.id
      ? deals.map((d: Deal) => d.id === deal.id ? newDeal : d)
      : [...deals, newDeal];
    
    await AsyncStorage.setItem(DEALS_KEY, JSON.stringify(updatedDeals));
    return newDeal;
  },

  // Программы
  getPrograms(): Program[] {
    return PROGRAMS;
  }
};
