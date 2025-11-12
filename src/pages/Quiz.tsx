import { useMemo, useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

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
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [_isTimerActive, setIsTimerActive] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = questions[currentIndex];
  const selected = answers[current?.id] ?? '';

  const canGoPrev = currentIndex > 0;
  const canGoNext = selected && currentIndex < questions.length - 1;
  const isLast = currentIndex === questions.length - 1;

  const handleChoose = (optionId: string) => {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
  };

  // Timer effect
  useEffect(() => {
    // Reset timer when question changes
    setTimeRemaining(20);
    setIsTimerActive(true);

    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Get current question ID for closure
    const currentQuestionId = current?.id;

    // Start new timer only if no answer is selected yet
    if (!selected && currentQuestionId) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            // Auto-select neutral if no answer
            setAnswers((prev) => {
              // Only auto-select if still no answer for this question
              if (!prev[currentQuestionId]) {
                return { ...prev, [currentQuestionId]: 'a3' };
              }
              return prev;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, current?.id, selected]);

  // Auto-advance when time runs out and answer is selected
  useEffect(() => {
    if (timeRemaining === 0 && selected && !isLast) {
      const timeout = setTimeout(() => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setAnimating('next');
        setTimeout(() => {
          setCurrentIndex((idx) => idx + 1);
          setAnimating('none');
          setIsTimerActive(true);
        }, 220);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [timeRemaining, selected, isLast]);

  // Pause timer when answer is selected
  useEffect(() => {
    if (selected) {
      setIsTimerActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [selected]);

  const go = (dir: 'next' | 'prev') => {
    if (dir === 'next' && !selected) return;
    // Clear timer when navigating
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setAnimating(dir);
    window.setTimeout(() => {
      setCurrentIndex((idx) => (dir === 'next' ? idx + 1 : idx - 1));
      setAnimating('none');
      setIsTimerActive(true);
    }, 220);
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
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </div>
              {/* Professional Timer Display - Right of Question */}
              <div className="flex items-center gap-2">
                <div className="relative w-14 h-14">
                  {/* Circular Progress */}
                  <svg className="transform -rotate-90 w-14 h-14">
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      fill="none"
                      className="text-gray-100"
                    />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - timeRemaining / 20)}`}
                      strokeLinecap="round"
                      className={`transition-all duration-1000 ${
                        timeRemaining <= 5
                          ? 'text-red-500'
                          : timeRemaining <= 8
                            ? 'text-orange-500'
                            : 'text-[#1A4B84]'
                      }`}
                    />
                  </svg>
                  {/* Time Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-xs font-bold ${
                        timeRemaining <= 5
                          ? 'text-red-500'
                          : timeRemaining <= 8
                            ? 'text-orange-500'
                            : 'text-[#1A4B84]'
                      }`}
                    >
                      {timeRemaining}
                    </span>
                  </div>
                </div>
                {timeRemaining <= 5 && timeRemaining > 0 && (
                  <div className="flex items-center gap-1 text-red-500 animate-pulse">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">Low time!</span>
                  </div>
                )}
              </div>
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
