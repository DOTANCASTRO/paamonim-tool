import EventPlannerCalculator from '@/components/event-planner/EventPlannerCalculator';
import SectionExplainer from '@/components/shared/SectionExplainer';

export default function EventPlannerPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">תכנון פיננסי לאירועים</h1>
        <p className="text-slate-500 text-sm mt-1">תכנן את החיסכון שלך לפני שהאירוע מגיע</p>
      </div>
      <SectionExplainer>
        <p className="font-semibold mb-2">איך משתמשים?</p>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-medium">← &quot;אני יודע כמה צריך&quot;</span>
            <span className="text-blue-700"> — הזינו עלות האירוע וכמה שנים יש לכם, וגלו כמה לחסוך כל חודש</span>
          </div>
          <div>
            <span className="font-medium">← &quot;אני יודע כמה אוכל לחסוך&quot;</span>
            <span className="text-blue-700"> — הזינו יעד וסכום חודשי, וגלו מתי תגיעו ליעד</span>
          </div>
        </div>
        <p className="mt-2 text-blue-700">💡 שימו לב לחסכון עם ריבית של 3.5% — לרוב תצטרכו לחסוך פחות ממה שחשבתם.</p>
      </SectionExplainer>
      <EventPlannerCalculator />
    </div>
  );
}
