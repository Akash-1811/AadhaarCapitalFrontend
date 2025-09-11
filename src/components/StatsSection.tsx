const StatsSection = () => {
  const stats = [
    {
      number: "₹100+",
      label: "Cr",
      sublabel: "Assets under Management"
    },
    {
      number: "2K+",
      label: "Active",
      sublabel: "Investors"
    },
    {
      number: "50+",
      label: "Digital",
      sublabel: "Branches across 200 cities"
    },
    {
      number: "200+",
      label: "Expert",
      sublabel: "Financial Advisors"
    }
  ];

  return (
    <section className="py-16 bg-gradient-primary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-2">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-3xl lg:text-4xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-sm opacity-90">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;