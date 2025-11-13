import { useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertCircle,
  Play,
  Clock,
  FileText,
  CheckCircle2,
  Timer,
} from 'lucide-react';
import { RootState, store } from '@/store/store';
import {
  updateAnswer,
  setAnimating,
  setTimeRemaining,
  setIsTimerActive,
  setTotalTimeElapsed,
  setQuestionTimeElapsed,
  goNext,
  goPrev,
  startQuiz,
} from '@/slices/quizSlice';

type AnswerOption = {
  id: string;
  label: string;
};

type Question = {
  id: string;
  text: string;
  image?: string;
  options: AnswerOption[];
};

export default function Quiz() {
  const questions: Question[] = useMemo(
    () => [
      {
        id: 'q1',
        text: "Mr. X saw a 100 Rs. note falling from a man's pocket and decides to keep it.",
        image:
          'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q2',
        text: "Mr. X saw a 100 Rs. note falling from a man's pocket and decides to keep it.",
        image:
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q5',
        text: "Mr. X feels comfortable with his financial situation and doesn't want to take any risks to improve his business.",
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q7',
        text: "Mr. X forgot to bring the groceries on his way back home from work. He said it's because no one reminded him.",
        image:
          'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q14',
        text: "Mr. X strongly believes in destiny and doesn't stress about the future.",
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q15',
        text: "Mr. X's friend suffers a major loss during floods/landslides. Mr. X asks him to have faith in his destiny but doesn't offer any monetary help.",
        image:
          'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q20',
        text: "Mr. X doesn't prefer to take bank loan. He uses his savings and borrows money from a friend to buy his land.",
        image:
          'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q22',
        text: "Mr. X's son scored well in his exam and believes it happened due to his good luck.",
        image:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q27',
        text: "Sometimes, you think of your needs over others' needs.",
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
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
        image:
          'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q29',
        text: "You have sometimes used excuses to avoid going to some place which you didn't want to go.",
        image:
          'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=400&fit=crop',
        options: [
          { id: 'a1', label: 'Acceptable' },
          { id: 'a2', label: 'Somewhat Acceptable' },
          { id: 'a3', label: 'Somewhat Unacceptable' },
          { id: 'a4', label: 'Unacceptable' },
        ],
      },
      {
        id: 'q30',
        text: "You have never gotten jealous of other people's good fortune.",
        image:
          'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
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
  const {
    currentIndex,
    answers,
    animating,
    timeRemaining,
    quizStarted,
    totalTimeElapsed,
    canGoBack,
  } = useSelector((state: RootState) => state.quiz);
  const totalTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = questions[currentIndex];
  const selected = answers[current?.id] ?? '';

  const canGoNext =
    selected !== '' && timeRemaining > 0 && currentIndex < questions.length - 1;
  const isLast = currentIndex === questions.length - 1;
  const canGoPrev = canGoBack && currentIndex > 0;

  useEffect(() => {
    if (quizStarted) {
      totalTimerRef.current = setInterval(() => {
        const state = store.getState();
        dispatch(setTotalTimeElapsed(state.quiz.totalTimeElapsed + 1));
      }, 1000);

      return () => {
        if (totalTimerRef.current) {
          clearInterval(totalTimerRef.current);
          totalTimerRef.current = null;
        }
      };
    }
  }, [quizStarted, dispatch]);

  const startQuestionTimer = () => {
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }

    dispatch(setQuestionTimeElapsed(0));
    dispatch(setTimeRemaining(60));
    dispatch(setIsTimerActive(true));

    let localTime = 60;
    let questionTime = 0;

    questionTimerRef.current = setInterval(() => {
      questionTime += 1;
      localTime -= 1;

      dispatch(setQuestionTimeElapsed(questionTime));

      if (localTime <= 0) {
        dispatch(setIsTimerActive(false));
        dispatch(setTimeRemaining(0));

        const state = store.getState();
        const currentAnswers = state.quiz.answers;
        if (!currentAnswers[current?.id || '']) {
          dispatch(
            updateAnswer({ questionId: current?.id || '', answerId: 'a3' }),
          );
        }
        if (questionTimerRef.current) {
          clearInterval(questionTimerRef.current);
          questionTimerRef.current = null;
        }
      } else {
        dispatch(setTimeRemaining(localTime));
      }
    }, 1000);
  };

  const handleChoose = (optionId: string) => {
    if (!current) return;
    dispatch(updateAnswer({ questionId: current.id, answerId: optionId }));
  };

  useEffect(() => {
    if (current?.id && quizStarted) {
      startQuestionTimer();
    }

    return () => {
      if (questionTimerRef.current) {
        clearInterval(questionTimerRef.current);
        questionTimerRef.current = null;
      }
    };
  }, [currentIndex, current?.id, quizStarted]);

  useEffect(() => {
    if (timeRemaining === 0 && !isLast) {
      const timeout = setTimeout(() => {
        if (questionTimerRef.current) {
          clearInterval(questionTimerRef.current);
          questionTimerRef.current = null;
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
  }, [timeRemaining, isLast, dispatch]);

  const go = (dir: 'next' | 'prev') => {
    if (dir === 'next' && (timeRemaining === 0 || selected === '')) return;
    if (dir === 'prev' && !canGoPrev) return;
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
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
      a1: 1, // Acceptable
      a2: 2, // Somewhat Acceptable
      a3: 3, // Somewhat Unacceptable
      a4: 4, // Unacceptable
    };
    return Object.entries(answers).reduce(
      (sum, [, v]) => sum + (map[v] ?? 0),
      0,
    );
  }, [answers]);

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <Card className="w-full max-w-2xl bg-gradient-to-br from-[#F6FBFF] via-white to-[#F3F6FA] border border-[#E6EEF7] shadow-xl">
            <CardContent className="p-12">
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#1A4B84] bg-opacity-10 mb-4">
                    <FileText className="h-10 w-10 text-[#1A4B84]" />
                  </div>
                  <h1 className="text-4xl font-bold text-[#0F3057]">
                    Psychometric Assessment
                  </h1>
                  <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    This assessment will help us understand your behavioral
                    patterns and decision-making approach. Please answer
                    honestly for accurate results.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 my-10">
                  <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                      <FileText className="h-6 w-6 text-[#1A4B84]" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {questions.length} Questions
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
                      Comprehensive assessment
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                      <Clock className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Take your time
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
                      for the question
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Instant Results
                    </h3>
                    <p className="text-sm text-gray-500 text-center">
                      Get your score immediately
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-[#1A4B84] mb-2">
                      Instructions:
                    </h3>
                    <ul className="text-left text-sm text-gray-700 space-y-2 list-disc list-inside">
                      <li>Read each scenario carefully</li>
                      <li>Select the option that best reflects your opinion</li>
                      <li>You have 60 seconds per question</li>
                      <li>Answer honestly for accurate results</li>
                      <li>You can change your answer before time runs out</li>
                    </ul>
                  </div>

                  <Button
                    onClick={() => dispatch(startQuiz())}
                    className="bg-[#1A4B84] hover:bg-[#163C6A] text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    size="lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Start Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#0F3057]">
            Psychometric Quiz
          </h2>
          <p className="text-sm text-gray-500">
            Professional and calm experience. Answer honestly to get meaningful
            insights.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#1A4B84] bg-opacity-10 rounded-lg">
          <Clock className="h-5 w-5 text-[#1A4B84]" />
          <span className="text-lg font-semibold text-[#1A4B84]">
            {formatTime(totalTimeElapsed)}
          </span>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-[#F6FBFF] via-white to-[#F3F6FA] border border-[#E6EEF7]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <svg className="transform -rotate-90 w-10 h-10">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      className="text-gray-100"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 16}`}
                      strokeDashoffset={`${2 * Math.PI * 16 * (1 - timeRemaining / 60)}`}
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Timer
                      className={`h-4 w-4 ${
                        timeRemaining <= 5
                          ? 'text-red-500'
                          : timeRemaining <= 8
                            ? 'text-orange-500'
                            : 'text-[#1A4B84]'
                      }`}
                    />
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
              <p className="text-lg font-semibold text-[#143F6B] mb-4">
                {current.text}
              </p>
              {current.image && (
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={current.image}
                    alt="Question illustration"
                    className="w-full h-auto max-h-64 object-cover"
                  />
                </div>
              )}
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
