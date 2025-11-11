import KPI from '@/components/analytics/KPI';
import LineChart from '@/components/analytics/LineChart';
import BarChart from '@/components/analytics/BarChart';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const kpi = [
    { label: 'Completed Assessments', value: 246, subtitle: '+18 this week' },
    { label: 'Average Score', value: '72/100', subtitle: '+3 vs last week' },
    { label: 'Active Assessments', value: 19, subtitle: 'Ongoing right now' },
  ];

  const lineData = [58, 62, 66, 69, 71, 70, 73, 76, 74, 77, 79, 82];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const barData = [18, 24, 20, 27, 22, 15, 12];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Psychometric Overview</h2>
          <p className="text-sm text-gray-500">
            Track assessment progress, scores and personality distribution.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => navigate('/users')}>
            Manage Users
          </Button>
          <Button
            className="bg-[#1A4B84] hover:bg-[#163C6A]"
            onClick={() => navigate('/quiz')}
          >
            Start New Quiz
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {kpi.map((x) => (
          <KPI
            key={x.label}
            label={x.label}
            value={x.value}
            subtitle={x.subtitle}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChart
          title="Avg Score by Month"
          points={lineData}
          labels={months}
        />
        <BarChart title="Assessments by Day" values={barData} labels={days} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-3">Personality Distribution</h3>
          <div className="space-y-3">
            {[
              { trait: 'Openness', value: 68 },
              { trait: 'Conscientiousness', value: 74 },
              { trait: 'Extraversion', value: 55 },
              { trait: 'Agreeableness', value: 71 },
              { trait: 'Neuroticism', value: 42 },
            ].map((t) => (
              <div key={t.trait}>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{t.trait}</span>
                  <span>{t.value}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1A4B84]"
                    style={{ width: `${t.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold mb-3">Recent Assessments</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-center justify-between border-b pb-2">
              <span>Bibek Thapa • Completed</span>
              <span className="text-gray-500">Score: 76</span>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span>Sita Sharma • Completed</span>
              <span className="text-gray-500">Score: 81</span>
            </li>
            <li className="flex items-center justify-between border-b pb-2">
              <span>Ramesh KC • In progress</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/quiz')}
              >
                Continue
              </Button>
            </li>
            <li className="flex items-center justify-between">
              <span>New Assessment</span>
              <Button
                size="sm"
                className="bg-[#1A4B84] hover:bg-[#163C6A]"
                onClick={() => navigate('/quiz')}
              >
                Start
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
