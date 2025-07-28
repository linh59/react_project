// import TimeBasedGreeting from '@/components/TimeBasedGreeting';
// import QuickActionsMenu from '@/components/QuickActionsMenu';

import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* TimeBasedGreeting Component */}
        {/* <TimeBasedGreeting /> */}
        
        {/* Stats Section - Moved to be right after TimeBasedGreeting */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="clay-card p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-baloo font-bold text-primary mb-2">7</div>
            <div className="text-sm sm:text-base text-gray-600 font-poppins">Day Streak {t('home.streak')}</div>
          </div>
          <div className="clay-card p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-baloo font-bold text-primary mb-2">142</div>
            <div className="text-sm sm:text-base text-gray-600 font-poppins">Words Learned</div>
          </div>
          <div className="clay-card p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-baloo font-bold text-primary mb-2">23</div>
            <div className="text-sm sm:text-base text-gray-600 font-poppins">Lessons Completed</div>
          </div>
        </div>
        
        {/* QuickActionsMenu Component - Now comes after the Stats Section */}
        {/* <div className="mt-4 sm:mt-6">
          <QuickActionsMenu />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
