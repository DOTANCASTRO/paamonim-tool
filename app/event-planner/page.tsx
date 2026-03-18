import EventPlannerCalculator from '@/components/event-planner/EventPlannerCalculator';

export default function EventPlannerPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">תכנון פיננסי לאירועים</h1>
        <p className="text-slate-500 text-sm mt-1">תכנן את החיסכון שלך לפני שהאירוע מגיע</p>
      </div>
      <EventPlannerCalculator />
    </div>
  );
}
