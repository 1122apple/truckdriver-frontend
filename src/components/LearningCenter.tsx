import { useState, useEffect } from 'react';
import { saveTestResult, getTestResults } from '../utils/api';
import { BookOpen, Video, FileText, Award, Play, Lock, AlertTriangle, Check, X } from 'lucide-react';

export default function LearningCenter() {
  const [currentQuiz, setCurrentQuiz] = useState<string | null>(null);
  const [quizProgress, setQuizProgress] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizResults, setQuizResults] = useState<{
    score: number;
    total: number;
    passed: boolean;
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [quizzes, setQuizzes] = useState([
    { title: '保险基础知识测试', questions: 10, passed: true, score: 85 },
    { title: '误导话术识别测试', questions: 15, passed: true, score: 92 },
    { title: '维权流程测试', questions: 12, passed: false, score: null },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 在组件加载时获取测试结果
  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getTestResults();
        
        if (response.success && response.results.length > 0) {
          // 更新quizzes状态
          const updatedQuizzes = quizzes.map(quiz => {
            if (quiz.title === '维权流程测试') {
              const rightsProtectionResult = response.results.find(r => r.testType === 'rightsProtection');
              if (rightsProtectionResult) {
                return {
                  ...quiz,
                  passed: rightsProtectionResult.passed,
                  score: rightsProtectionResult.score
                };
              }
            }
            return quiz;
          });
          setQuizzes(updatedQuizzes);
        }
      } catch (err) {
        console.error('获取测试结果失败:', err);
        setError('获取测试结果失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, []);

  const courses = [
    {
      id: 1,
      title: '识别保险误导话术',
      type: 'video',
      duration: '15分钟',
      completed: true,
      progress: 100,
      thumbnail: 'bg-gradient-to-br from-blue-400 to-blue-600',
    },
    {
      id: 2,
      title: '正规保险 vs 统筹产品',
      type: 'video',
      duration: '12分钟',
      completed: true,
      progress: 100,
      thumbnail: 'bg-gradient-to-br from-purple-400 to-purple-600',
    },
    {
      id: 3,
      title: '保险维权完全指南',
      type: 'video',
      duration: '20分钟',
      completed: false,
      progress: 45,
      thumbnail: 'bg-gradient-to-br from-green-400 to-green-600',
    },
    {
      id: 4,
      title: '货车司机必备保险知识',
      type: 'video',
      duration: '18分钟',
      completed: false,
      progress: 0,
      thumbnail: 'bg-gradient-to-br from-orange-400 to-orange-600',
      locked: true,
    },
  ];

  const handbook = [
    {
      title: '常见误导话术合集',
      desc: '20种最常见的保险误导话术及识别方法',
      pages: 25,
      icon: AlertTriangle,
    },
    {
      title: '保险合同阅读指南',
      desc: '教您如何看懂保险合同中的关键条款',
      pages: 18,
      icon: FileText,
    },
    {
      title: '维权案例精选',
      desc: '10个成功维权的真实案例分析',
      pages: 30,
      icon: BookOpen,
    },
  ];



  // 维权流程测试题目
  const rightsProtectionQuizQuestions = [
    {
      id: 1,
      question: '当您发现自己被误导投保后，第一步应该怎么做？',
      options: [
        '立即联系销售方要求退款',
        '收集并保存相关证据',
        '直接向法院起诉',
        '向银保监会投诉'
      ],
      answer: '收集并保存相关证据',
      explanation: '维权的第一步是收集证据，包括聊天记录、录音、合同等，这是后续维权的基础。'
    },
    {
      id: 2,
      question: '以下哪种证据对误导投保维权最有利？',
      options: [
        '销售方的口头承诺',
        '与销售方的聊天记录',
        '其他投保人的证言',
        '自己的回忆'
      ],
      answer: '与销售方的聊天记录',
      explanation: '书面证据（如聊天记录）比口头证据更有法律效力，能更有力地证明销售方的误导行为。'
    },
    {
      id: 3,
      question: '如果销售方拒绝退款，您应该向哪个监管机构投诉？',
      options: [
        '消费者协会',
        '银保监会及其派出机构',
        '市场监督管理局',
        '公安局'
      ],
      answer: '银保监会及其派出机构',
      explanation: '银保监会是保险行业的监管机构，负责处理保险相关的投诉和纠纷。'
    },
    {
      id: 4,
      question: '投诉后，监管机构通常会在多少个工作日内受理？',
      options: [
        '1个工作日',
        '3个工作日',
        '5个工作日',
        '10个工作日'
      ],
      answer: '5个工作日',
      explanation: '根据相关规定，监管机构应当在收到投诉后5个工作日内作出是否受理的决定。'
    },
    {
      id: 5,
      question: '如果对监管机构的处理结果不满意，您可以？',
      options: [
        '再次向同一机构投诉',
        '向法院提起诉讼',
        '向媒体曝光',
        '放弃维权'
      ],
      answer: '向法院提起诉讼',
      explanation: '如果对监管机构的处理结果不满意，您可以通过法律途径维护自己的权益，向法院提起诉讼。'
    },
    {
      id: 6,
      question: '误导投保纠纷的诉讼时效是多久？',
      options: [
        '1年',
        '2年',
        '3年',
        '5年'
      ],
      answer: '3年',
      explanation: '根据《民法典》，普通民事纠纷的诉讼时效为3年，从知道或应当知道权利被侵害之日起计算。'
    },
    {
      id: 7,
      question: '以下哪种情况不属于误导投保？',
      options: [
        '销售方夸大保险责任',
        '销售方隐瞒免责条款',
        '销售方如实告知保险条款',
        '销售方以"统筹"冒充保险'
      ],
      answer: '销售方如实告知保险条款',
      explanation: '误导投保是指销售方通过虚假陈述、隐瞒真相或其他不正当手段，诱导投保人签订保险合同的行为。'
    },
    {
      id: 8,
      question: '维权过程中，您应该保持什么态度？',
      options: [
        '急躁冲动，威胁销售方',
        '理性冷静，依法维权',
        '消极等待，听天由命',
        '四处上访，扩大影响'
      ],
      answer: '理性冷静，依法维权',
      explanation: '理性维权是最有效的方式，通过合法途径解决纠纷，避免因过激行为给自己带来不必要的麻烦。'
    },
    {
      id: 9,
      question: '在维权过程中，您应该如何保存证据？',
      options: [
        '只保存电子证据',
        '只保存纸质证据',
        '同时保存电子和纸质证据，并有多个备份',
        '不需要保存证据，相信监管机构会调查'
      ],
      answer: '同时保存电子和纸质证据，并有多个备份',
      explanation: '多种形式的证据相互印证能大大提高维权成功率，多个备份能防止证据丢失。'
    },
    {
      id: 10,
      question: '以下哪种销售行为属于违法行为？',
      options: [
        '如实介绍保险产品',
        '夸大保险责任',
        '明确说明免责条款',
        '提供专业建议'
      ],
      answer: '夸大保险责任',
      explanation: '夸大保险责任属于虚假宣传，违反《保险法》和《广告法》的相关规定。'
    },
    {
      id: 11,
      question: '如果您发现销售方没有保险从业资格，您应该？',
      options: [
        '继续购买产品',
        '向银保监会投诉',
        '无所谓，只要产品好就行',
        '推荐给朋友'
      ],
      answer: '向银保监会投诉',
      explanation: '销售保险产品必须取得相应的从业资格，无资格销售属于违法行为，应向监管机构投诉。'
    },
    {
      id: 12,
      question: '维权成功后，您应该？',
      options: [
        '忘记此次经历',
        '分享维权经验，帮助其他司机',
        '到处炫耀',
        '不再相信任何保险产品'
      ],
      answer: '分享维权经验，帮助其他司机',
      explanation: '分享维权经验能帮助更多司机识别误导行为，提高整个行业的透明度和规范性。'
    }
  ];

  const achievements = [
    { name: '初学者', desc: '完成第一个课程', unlocked: true },
    { name: '知识达人', desc: '完成5个课程', unlocked: true },
    { name: '满分学霸', desc: '测试获得满分', unlocked: false },
    { name: '权益卫士', desc: '学习所有课程', unlocked: false },
  ];

  // 开始测试
  const startQuiz = (quizTitle: string) => {
    setCurrentQuiz(quizTitle);
    setQuizProgress(0);
    setQuizAnswers({});
    setQuizResults(null);
    setCurrentQuestionIndex(0);
  };

  // 提交答案
  const submitAnswer = (questionId: number, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // 完成测试
  const completeQuiz = async () => {
    let correctCount = 0;
    const total = rightsProtectionQuizQuestions.length;
    
    rightsProtectionQuizQuestions.forEach(question => {
      if (quizAnswers[question.id] === question.answer) {
        correctCount++;
      }
    });
    
    // 计算百分制得分
    const score = Math.round((correctCount / total) * 100);
    const passed = score >= 60;
    setQuizResults({ score, total: 100, passed });
    
    // 更新quizzes数组中的对应测试状态
    const updatedQuizzes = quizzes.map(quiz => {
      if (quiz.title === '维权流程测试') {
        return {
          ...quiz,
          passed: passed,
          score: score
        };
      }
      return quiz;
    });
    
    // 使用setState更新quizzes
    setQuizzes(updatedQuizzes);

    // 保存测试结果到后端
    try {
      setLoading(true);
      setError(null);
      await saveTestResult({
        testType: 'rightsProtection',
        score: score,
        passed: passed,
        answers: quizAnswers
      });
      console.log('测试结果保存成功');
    } catch (err) {
      console.error('保存测试结果失败:', err);
      setError('保存测试结果失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 退出测试
  const exitQuiz = () => {
    setCurrentQuiz(null);
    setQuizProgress(0);
    setQuizAnswers({});
    setQuizResults(null);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 测试界面 */}
      {currentQuiz === '维权流程测试' && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto pb-32" style={{WebkitOverflowScrolling: 'touch', overflowX: 'hidden'}}>
          <div className="max-w-md mx-auto">
            {/* 测试头部 */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-gray-900 text-lg">维权流程测试</h2>
              <button 
                onClick={exitQuiz}
                className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                退出
              </button>
            </div>

            {/* 测试进度 */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 text-sm">进度</span>
                <span className="text-gray-900 text-sm">{currentQuestionIndex + 1}/{rightsProtectionQuizQuestions.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / rightsProtectionQuizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 测试结果 */}
            {quizResults ? (
              <div className="mb-6">
                <div className={`p-4 rounded-lg ${quizResults.passed ? 'bg-green-50 border border-green-300' : 'bg-red-50 border border-red-300'}`}>
                  <div className="flex flex-col items-center gap-3">
                    {quizResults.passed ? (
                      <Check className="w-12 h-12 text-green-600" />
                    ) : (
                      <X className="w-12 h-12 text-red-600" />
                    )}
                    <h3 className={`text-lg font-semibold ${quizResults.passed ? 'text-green-700' : 'text-red-700'}`}>
                      {quizResults.passed ? '测试通过！' : '测试未通过'}
                    </h3>
                    <p className="text-gray-700">
                      得分：{quizResults.score}/{quizResults.total} ({Math.round((quizResults.score / quizResults.total) * 100)}%)
                    </p>
                    <p className="text-sm text-gray-600 text-center">
                      {quizResults.passed 
                        ? '恭喜您掌握了维权流程的关键知识！' 
                        : '建议您重新学习维权流程相关课程后再次测试。'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* 测试题目 - 一页一道题 */
              <div className="mb-8">
                {rightsProtectionQuizQuestions.length > 0 && currentQuestionIndex < rightsProtectionQuizQuestions.length && (
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="mb-4">
                      <p className="text-gray-900 mb-1">{currentQuestionIndex + 1}. {rightsProtectionQuizQuestions[currentQuestionIndex].question}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                      {rightsProtectionQuizQuestions[currentQuestionIndex].options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => submitAnswer(rightsProtectionQuizQuestions[currentQuestionIndex].id, option)}
                          className={`p-3 border rounded-lg text-left transition-colors ${
                            quizAnswers[rightsProtectionQuizQuestions[currentQuestionIndex].id] === option
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 测试底部按钮 */}
            <div className="mt-6 space-y-3">
              {!quizResults ? (
                <div className="space-y-3">
                  {/* 导航按钮 */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                      disabled={currentQuestionIndex === 0}
                    >
                      上一题
                    </button>
                    {currentQuestionIndex < rightsProtectionQuizQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex(prev => Math.min(rightsProtectionQuizQuestions.length - 1, prev + 1))}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        下一题
                      </button>
                    ) : (
                      <button
                        onClick={completeQuiz}
                        className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={!quizAnswers[rightsProtectionQuizQuestions[currentQuestionIndex]?.id]}
                      >
                        提交答案
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={exitQuiz}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    返回学习中心
                  </button>
                  <button
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizResults(null);
                      setCurrentQuestionIndex(0);
                    }}
                    className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    重新测试
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 页面标题 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-gray-900">学习培训中心</h1>
        <p className="text-gray-500">提升权益保护意识</p>
      </div>

      {/* 学习进度 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="mb-1">学习进度</h2>
            <p className="text-blue-100 text-sm">继续加油！</p>
          </div>
          <Award className="w-10 h-10 text-yellow-300" />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <p className="text-3xl mb-1">2</p>
            <p className="text-blue-100 text-sm">已完成</p>
          </div>
          <div className="text-center">
            <p className="text-3xl mb-1">4</p>
            <p className="text-blue-100 text-sm">总课程</p>
          </div>
          <div className="text-center">
            <p className="text-3xl mb-1">50%</p>
            <p className="text-blue-100 text-sm">完成率</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div className="bg-white h-2 rounded-full" style={{ width: '50%' }}></div>
        </div>
      </div>

      {/* 视频课程 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-blue-600" />
            <h2 className="text-gray-900">视频课程</h2>
          </div>
          <button className="text-blue-600 text-sm">查看全部</button>
        </div>
        <div className="flex flex-col gap-3">
          {courses.map((course) => (
            <div key={course.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
              <div className="flex gap-3">
                {/* 缩略图 */}
                <div className={`relative w-32 h-24 ${course.thumbnail} flex items-center justify-center`}>
                  {course.locked ? (
                    <Lock className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white" />
                  )}
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                    {course.duration}
                  </span>
                </div>
                
                {/* 信息 */}
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-900 mb-1">{course.title}</p>
                    {course.completed ? (
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded">已完成</span>
                    ) : course.progress > 0 ? (
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">学习中</span>
                    ) : course.locked ? (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">未解锁</span>
                    ) : (
                      <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded">未开始</span>
                    )}
                  </div>
                  {!course.locked && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 学习手册 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">学习手册</h2>
        </div>
        <div className="flex flex-col gap-3">
          {handbook.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 mb-1">{item.title}</p>
                <p className="text-gray-500 text-sm">{item.desc}</p>
                <p className="text-gray-400 text-xs mt-1">{item.pages} 页</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 知识测试 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">知识测试</h2>
        </div>
        <div className="flex flex-col gap-3">
          {quizzes.map((quiz, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{quiz.title}</p>
                  <p className="text-gray-500 text-sm">{quiz.questions} 道题目</p>
                </div>
                {quiz.passed ? (
                  <div className="text-right">
                    <span className="px-3 py-1 bg-green-100 text-green-600 text-sm rounded">已通过</span>
                    <p className="text-green-600 text-sm mt-1">得分：{quiz.score}分</p>
                  </div>
                ) : (
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => startQuiz(quiz.title)}
                  >
                    开始测试
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 成就系统 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-blue-600" />
          <h2 className="text-gray-900">我的成就</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400'
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                achievement.unlocked ? 'bg-yellow-400' : 'bg-gray-300'
              }`}>
                <Award className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`} />
              </div>
              <p className={`text-center text-sm ${achievement.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>
                {achievement.name}
              </p>
              <p className="text-center text-xs text-gray-500">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 推荐内容 */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h3 className="text-gray-900 mb-3">推荐学习路径</h3>
        <div className="flex flex-col gap-2 text-sm text-gray-600">
          <p>1. 先学习基础课程了解保险知识</p>
          <p>2. 掌握误导话术识别技巧</p>
          <p>3. 学习维权流程和方法</p>
          <p>4. 通过测试巩固所学知识</p>
        </div>
      </div>
    </div>
  );
}
