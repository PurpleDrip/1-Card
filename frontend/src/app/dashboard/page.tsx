import { DashboardStatsGrid } from '@/components/dashboard/DashboardStatsGrid'
import TitleBar from '@/components/dashboard/TitleBar'
import { AddedDocumentsCard } from '@/components/dashboard/AddedDocumentsCard';
import { ConsiderAddingCard } from '@/components/dashboard/ConsiderAddingCard';
import { InstallExtensionCard } from '@/components/dashboard/InstallExtensionCard';
import { RecentActivitiesCard } from '@/components/dashboard/RecentActivitiesCard';
import { VerificationCountCard } from '@/components/dashboard/VerificationCountCard';
import { OverallStatusCard } from '@/components/dashboard/OverallStatusCard';
import { SecuritySettingsCard } from '@/components/dashboard/SecuritySettingsCard';
import { UserCountCard } from '@/components/dashboard/UserCountCard';

const page = () => {
  const getUserData=()=>{
    
  }
  return (
    <div className='flex min-h-screen w-full flex-col bg-black dark'>
      <TitleBar/>
      <main className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8">
        <DashboardStatsGrid/>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Main Row / Larger Cards */}
          <div className="lg:col-span-2 xl:col-span-2"> {/* Spans 2 columns on lg, 2 on xl */}
            <AddedDocumentsCard />
          </div>
          {/* VerificationCountCard now takes the spot previously shared */}
          <div className="lg:col-span-1 xl:col-span-2 flex flex-col justify-between gap-4 md:py-4 xl:py-4"> 
             <VerificationCountCard />
             <UserCountCard />
          </div>

          {/* Second Row */}
          <div className="lg:col-span-1 xl:col-span-1"> {/* Spans 2 columns on lg, 2 on xl */}
             <RecentActivitiesCard />
          </div>
           <div className="lg:col-span-2 xl:col-span-2">
            <ConsiderAddingCard />
          </div>
          <div className="lg:col-span-1 xl:col-span-1">
            <InstallExtensionCard />
          </div>
          
          {/* Third Row / Additional Cards */}
          <div className="lg:col-span-2 xl:col-span-2">
            <OverallStatusCard />
          </div>
          <div className="lg:col-span-1 xl:col-span-2"> {/* Spans 1 on lg, 2 on xl */}
            <SecuritySettingsCard />
          </div>
        </div>
      </main>
    </div>
  )
}

export default page