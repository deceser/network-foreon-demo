import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { OrderProvider } from '@/contexts/order';

const HomePage: React.FC = () => {
  return (
    <OrderProvider>
      <Header />
      <div className="container mx-auto min-h-screen px-4 pb-24 lg:px-12">
        <Outlet />
      </div>
      <Footer />
    </OrderProvider>
  );
};

export default HomePage;
