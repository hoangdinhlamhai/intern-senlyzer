import { Inter, Lusitana  } from 'next/font/google'; //primary font used in the application
//thêm font phụ Lusitana 

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});