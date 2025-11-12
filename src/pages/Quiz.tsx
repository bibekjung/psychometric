import { useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { RootState } from '@/store/store';
import {
  updateAnswer,
  setAnimating,
  setTimeRemaining,
  setIsTimerActive,
  goNext,
  goPrev,
} from '@/slices/quizSlice';

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
        text: 'Mr. X saw a 100 Rs. note falling from a man’s pocket and decides to keep it.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q2',
        text: 'Mr. X saw a 100 Rs. note falling from a man’s pocket and decides to keep it.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q3',
        text: 'Mr. X is often late for meetings/ appointments as he gets delayed due to traffic or other important work.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q4',
        text: 'Mr. X has a work trip to a nearby town next week. He prefers to pack on the day of leaving.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q5',
        text: 'Mr. X feels comfortable with his financial situation and doesn’t want to take any risks to improve his business.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q6',
        text: 'Mr. X damages work equipment and says it broke due to poor quality.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q7',
        text: 'Mr. X forgot to bring the groceries on his way back home from work. He said it’s because no one reminded him.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q8',
        text: 'Mr. X faces difficulty while doing a task. He prefers to not waste his time and moves to the next task.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q9',
        text: 'Mr. X does not believe in learning new business/work methods because the old methods are working well.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q10',
        text: 'Mr. X often forgets to put things back in their proper place.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q11',
        text: 'Mr. X damaged a work equipment and kept quiet when no one noticed it.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q12',
        text: 'Mr. X always prefers to purchase quality items even if it costs more money.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q13',
        text: 'When Mr. X is asked to do something, he prefers to do it as per his convenience.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q14',
        text: 'Mr. X strongly believes in destiny and doesn’t stress about the future.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q15',
        text: 'Mr. X’s friend suffers a major loss during floods/landslides. Mr. X asks him to have faith in his destiny but doesn’t offer any monetary help.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q16',
        text: 'Mr. X spills water on the floor. When asked to clean up, he says it will dry on its own soon.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q17',
        text: 'Mr. X chooses to invest all his savings in gold as soon as an opportunity arises.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q18',
        text: 'Mr. X believed he was having trouble working under a young supervisor so he requested to work under an elder supervisor.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q19',
        text: 'Mr. X thought his documents went missing because someone must have moved them.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q20',
        text: 'Mr. X doesn’t prefer to take bank loan. He uses his savings and borrows money from a friend to buy his land.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q21',
        text: 'It is a matter of fate whether or not a person is able to save some money for their old age.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q22',
        text: 'Mr. X’s son scored well in his exam and believes it happened due to his good luck.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q23',
        text: 'Mr. X is offered a business plan in which the more he invests the more money he will earn later. So, X decides to invest all his money.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q24',
        text: 'Mr. X chooses to spend all his money on family because he hopes one of his sons will take care of him.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q25',
        text: 'Mr. X believes men should not participate in most of the housework.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q26',
        text: 'Mr. X prefers to spend his money now than save it for the future.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q27',
        text: 'Sometimes, you think of your needs over others’ needs.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q28',
        text: 'You sometimes ignore people who are rude to you.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q29',
        text: 'You have sometimes used excuses to avoid going to some place which you didn’t want to go.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q30',
        text: 'You have never gotten jealous of other people’s good fortune.',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
    ],
    [],
  );

  const dispatch = useDispatch();
  const { currentIndex, answers, animating, timeRemaining } = useSelector(
    (state: RootState) => state.quiz,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = questions[currentIndex];
  const selected = answers[current?.id] ?? '';

  const canGoPrev = currentIndex > 0;
  const canGoNext = selected && currentIndex < questions.length - 1;
  const isLast = currentIndex === questions.length - 1;

  const handleChoose = (optionId: string) => {
    if (!current) return;
    dispatch(updateAnswer({ questionId: current.id, answerId: optionId }));
  };

  // Timer effect
  useEffect(() => {
    // Reset timer when question changes
    dispatch(setTimeRemaining(20));
    dispatch(setIsTimerActive(true));

    // Clear existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Get current question ID for closure
    const currentQuestionId = current?.id;

    // Start new timer only if no answer is selected yet
    if (!selected && currentQuestionId) {
      let localTime = 20;
      timerRef.current = setInterval(() => {
        localTime -= 1;
        if (localTime <= 0) {
          dispatch(setIsTimerActive(false));
          dispatch(setTimeRemaining(0));
          // Auto-select neutral if no answer
          dispatch(
            updateAnswer({ questionId: currentQuestionId, answerId: 'a3' }),
          );
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
        } else {
          dispatch(setTimeRemaining(localTime));
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIndex, current?.id, selected, dispatch]);

  // Auto-advance when time runs out and answer is selected
  useEffect(() => {
    if (timeRemaining === 0 && selected && !isLast) {
      const timeout = setTimeout(() => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        dispatch(setAnimating('next'));
        setTimeout(() => {
          dispatch(goNext());
          dispatch(setAnimating('none'));
          dispatch(setIsTimerActive(true));
        }, 220);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [timeRemaining, selected, isLast, dispatch]);

  // Pause timer when answer is selected
  useEffect(() => {
    if (selected) {
      dispatch(setIsTimerActive(false));
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [selected, dispatch]);

  const go = (dir: 'next' | 'prev') => {
    if (dir === 'next' && !selected) return;
    // Clear timer when navigating
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    dispatch(setAnimating(dir));
    window.setTimeout(() => {
      if (dir === 'next') {
        dispatch(goNext());
      } else {
        dispatch(goPrev());
      }
      dispatch(setAnimating('none'));
      dispatch(setIsTimerActive(true));
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
