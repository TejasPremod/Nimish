import { ReactNode } from "react";
import { motion } from "motion/react";

interface DirectoryLayoutProps {
  title: string;
  subtitle: string;
  filters: ReactNode;
  children: ReactNode;
  resultsCount: number;
}

export const DirectoryLayout = ({ title, subtitle, filters, children, resultsCount }: DirectoryLayoutProps) => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto mb-10">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-brand-burgundy mb-2"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* Filters Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full lg:w-72 flex-shrink-0 bg-white border border-neutral-200 rounded-sm shadow-sm lg:sticky lg:top-28 relative z-20"
        >
          <div className="p-5 border-b border-neutral-100">
            <h2 className="text-lg font-bold text-neutral-800">Filters</h2>
          </div>
          <div className="p-5 flex flex-col gap-8 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
            {filters}
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex-grow w-full">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between items-center mb-6"
          >
            <h2 className="font-medium text-brand-burgundy">{title} ({resultsCount} results)</h2>
          </motion.div>
          
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
