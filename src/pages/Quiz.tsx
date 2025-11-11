import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type AnswerOption = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  text: string;
  options: AnswerOption[];
};

export default function Quiz() {
  const questions: Question[] = useMemo(
    () => [
      {
        id: 'q1',
        text: 'I remain calm under pressure.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q2',
        text: 'I enjoy solving complex problems.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q3',
        text: 'I prefer planning ahead rather than being spontaneous.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q4',
        text: 'I adapt quickly when plans change unexpectedly.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q5',
        text: 'I communicate my ideas clearly to others.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q6',
        text: 'I actively seek feedback to improve.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q7',
        text: 'I prefer working in a team rather than alone.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q8',
        text: 'I stay motivated even when tasks are repetitive.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q9',
        text: 'I make decisions based on data rather than intuition.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
      {
        id: 'q10',
        text: 'I handle constructive criticism without feeling discouraged.',
        options: [
          { id: 'a1', label: 'Strongly disagree' },
          { id: 'a2', label: 'Disagree' },
          { id: 'a3', label: 'Neutral' },
          { id: 'a4', label: 'Agree' },
          { id: 'a5', label: 'Strongly agree' },
        ],
      },
    ],
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [animating, setAnimating] = useState<'none' | 'next' | 'prev'>('none');

  const current = questions[currentIndex];
  const selected = answers[current?.id] ?? '';

  const canGoPrev = currentIndex > 0;
  const canGoNext = selected && currentIndex < questions.length - 1;
  const isLast = currentIndex === questions.length - 1;

  const go = (dir: 'next' | 'prev') => {
    if (dir === 'next' && !selected) return;
    setAnimating(dir);
    window.setTimeout(() => {
      setCurrentIndex((idx) => (dir === 'next' ? idx + 1 : idx - 1));
      setAnimating('none');
    }, 220);
  };

  const handleChoose = (optionId: string) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
  };

  const score = useMemo(() => {
    const map: Record<string, number> = {
      a1: 1,
      a2: 2,
      a3: 3,
      a4: 4,
      a5: 5,
    };
    return Object.entries(answers).reduce(
      (sum, [, v]) => sum + (map[v] ?? 0),
      0,
    );
  }, [answers]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0F3057]">Psychometric Quiz</h2>
        <p className="text-sm text-gray-500">
          Professional and calm experience. Answer honestly to get meaningful
          insights.
        </p>
      </div>

      <Card className="bg-gradient-to-br from-[#F6FBFF] via-white to-[#F3F6FA] border border-[#E6EEF7]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div className="h-2 w-40 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1A4B84] transition-all duration-300"
                style={{
                  width: `${((currentIndex + (selected ? 1 : 0)) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className={[
              'relative min-h-[180px]',
              'transition-all duration-200',
              animating === 'next' ? 'opacity-0 translate-x-4' : '',
              animating === 'prev' ? 'opacity-0 -translate-x-4' : '',
            ].join(' ')}
          >
            <div className="mb-6">
              <p className="text-lg font-semibold text-[#143F6B]">
                {current.text}
              </p>
            </div>
            <div className="grid gap-3">
              {current.options.map((opt) => {
                const isActive = selected === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={[
                      'flex items-center justify-between rounded-lg border px-4 py-3 cursor-pointer',
                      'transition-all duration-200',
                      isActive
                        ? 'border-[#1A4B84] bg-[#EAF3FF]'
                        : 'border-gray-200 hover:border-[#9EC9FF] hover:bg-[#F7FAFF]',
                    ].join(' ')}
                  >
                    <span className="text-gray-800">{opt.label}</span>
                    <input
                      type="radio"
                      name={`q-${current.id}`}
                      className="h-4 w-4 accent-[#1A4B84]"
                      checked={isActive}
                      onChange={() => handleChoose(opt.id)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => go('prev')}
              disabled={!canGoPrev}
              className="disabled:opacity-40"
            >
              Back
            </Button>

            {!isLast && (
              <Button
                onClick={() => go('next')}
                disabled={!canGoNext}
                className="bg-[#1A4B84] hover:bg-[#163C6A] disabled:opacity-40"
              >
                Next
              </Button>
            )}

            {isLast && (
              <div className="text-right ml-auto">
                <div className="text-sm text-gray-500">
                  Your provisional score
                </div>
                <div className="text-2xl font-bold text-[#1A4B84]">{score}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
