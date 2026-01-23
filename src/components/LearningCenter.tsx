import { BookOpen, Video, FileText, Award, Play, Lock, AlertTriangle } from 'lucide-react';

export default function LearningCenter() {
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

  const quizzes = [
    { title: '保险基础知识测试', questions: 10, passed: true, score: 85 },
    { title: '误导话术识别测试', questions: 15, passed: true, score: 92 },
    { title: '维权流程测试', questions: 12, passed: false, score: null },
  ];

  const achievements = [
    { name: '初学者', desc: '完成第一个课程', unlocked: true },
    { name: '知识达人', desc: '完成5个课程', unlocked: true },
    { name: '满分学霸', desc: '测试获得满分', unlocked: false },
    { name: '权益卫士', desc: '学习所有课程', unlocked: false },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
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
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
