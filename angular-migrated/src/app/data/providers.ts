export interface Provider {
  id: string;
  name: string;
  phone: string;
  rating: number;
}

export const POTENTIAL_PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Gruas Rapidas Medellin',
    phone: '312 445 6677',
    rating: 9.8,
  },
  {
    id: 'p2',
    name: 'Asistencias Pro-Vial',
    phone: '300 889 1122',
    rating: 8.5,
  },
  {
    id: 'p3',
    name: 'Transportes Express ABC',
    phone: '315 223 3344',
    rating: 9.2,
  },
  {
    id: 'p4',
    name: 'Servicios de Rescate 24/7',
    phone: '320 556 7788',
    rating: 7.2,
  },
].sort((a, b) => b.rating - a.rating);
