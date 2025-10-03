import React, { useMemo, useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TasksCompleted from '../components/TasksCompleted';
import PlannerGuide from '../components/PlannerGuide';
import { FcPlanner } from "react-icons/fc";
import { FaFire, FaStar, FaCrown } from "react-icons/fa";
import { IoCheckmarkCircle, IoRadioButtonOff, IoCheckmarkDoneCircle, IoChevronDown, IoClose } from "react-icons/io5";
import { useProfile } from '../services/useProfile';
import { useTasks } from '../services/useTasks';
import { useAddTask } from '../services/useAddTask';
import { useCheckCompeletion } from '../services/useCheckCompeletion';
import { useUpdateProfile } from '../services/useUpdateProfile';
import { useDeleteTask } from '../services/useDeleteTask';
import toast from 'react-hot-toast';

export default function Planner() {
    // حساب اليوم 
    const daysOfWeek = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const dayIndex = new Date().getDay();
    const dayName = daysOfWeek[dayIndex];
    // جلب التاسكات باستخدام فانكشن
    const {tasks , isLoading: tasksLoading , error: tasksError} = useTasks();
    const {addTask , isLoading: addTaskLoading} = useAddTask();
    const {checkTaskCompletion , isLoading: checkTaskCompletionLoading} = useCheckCompeletion();
    const {updateProfile , isLoading: updateProfileLoading} = useUpdateProfile();
    // مجموعة من المهام المقترحة
    const suggestedTasks = [
      { id: 1, title: "صلاة الفجر في وقتها", reward: 25, done: false },
      { id: 2, title: "ورد القرآن (١ صفحة على الأقل)", reward: 20, done: false },
      { id: 3, title: "أذكار الصباح والمساء", reward: 15, done: false },
      { id: 4, title: "الصدقة اليومية ولو باليسير", reward: 30, done: false },
      { id: 5, title: "صلاة الخمس صلوات فى وقتها" , reward: 30 , done: false}
    ];

    // جلب البروفايل الخاص باليوز مثل الاستريك والنقاط وهكذا
    const {profile , isLoading: profileLoading, error: profileError} = useProfile();
    
    // إذا كان هناك خطأ في تحميل البروفايل
    if (profileError) {
        return (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ في تحميل البيانات</h2>
                    <p className="text-gray-600 dark:text-gray-400">{profileError?.message}</p>
                </div>
            </div>
        );
    }

    // فانكشن لحساب نقاط عشوائية للمهمة ما بين 5 : 30

    function calcPoints(){
      const points = Math.ceil(Math.random() * 20) + 10;
      return points;
    }

    // دالة حساب الـ Streak
    function calculateStreak(lastActivityDate, currentStreak) {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (!lastActivityDate) {
        return 1; // أول يوم نشاط
      }
      
      if (lastActivityDate === today) {
        return currentStreak; // نفس اليوم، نفس الـ streak
      }
      
      if (lastActivityDate === yesterday) {
        return currentStreak + 1; // يوم متتالي
      }
      
      return 1; // انقطع الـ streak، نبدأ من جديد
    }

    const [showSuggested, setShowSuggested] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    // const [newPoints, setNewPoints] = useState(10);
    const [newCategory, setNewCategory] = useState("عبادات");
    const [newDescription, setNewDescription] = useState("");
    const [formError, setFormError] = useState("");
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [congratulationsShown, setCongratulationsShown] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const {deleteTask , deleteTaskLoading} = useDeleteTask();
    // حساب النقاط من البروفايل المحفوظ، مش من المهام المكتملة اليوم
    const currentPoints = profile?.points || 0;
    const level = Math.floor(currentPoints / 100) + 1;
    const levelProgress = currentPoints % 100;
    const completedCount = tasks?.filter(t => t.done === true).length;
    const completionPercent = tasks?.length ? Math.round((completedCount / tasks?.length) * 100) : 0;
    
    // حساب النقاط المكتسبة اليوم
    const todayEarnedPoints = tasks?.filter(t => t.done === true).reduce((sum, t) => sum + t.reward_points, 0) || 0;


    async function handleSubmitNewTask(e){
      e.preventDefault();
      setFormError("");
      if(!newTitle.trim()){
        setFormError("يرجى إدخال اسم المهمة");
        return;
      }


      addTask(
        {
          title: newTitle.trim(),
          reward_points: Number(calcPoints()),
          description: newDescription.trim(),
          category: newCategory,
        },
        {
          onSuccess: () => {
            setNewTitle("");
            setNewCategory("عبادات");
            setNewDescription("");
            setShowAddModal(false);
          },
          onError: (err) => {
            setFormError(err?.message || "حدث خطأ أثناء إضافة المهمة");
          },
        }
      );
    }

    function updateProfileFunc(pointsToAdd = 0, isCompleting = true){
      const newPoints = isCompleting ? currentPoints + pointsToAdd : Math.max(0, currentPoints - pointsToAdd);
      const newLevel = Math.floor(newPoints / 100) + 1;
      const today = new Date().toISOString().split('T')[0];
      
      let newStreak = profile?.streak || 0;
      
      if (isCompleting && pointsToAdd > 0) {
        // فقط عند إكمال مهمة جديدة (مش إلغاء إكمال)
        newStreak = calculateStreak(profile?.last_activity_date, profile?.streak || 0);
      }
      
      updateProfile({
        streak: newStreak, 
        level: newLevel, 
        points: newPoints,
        last_activity_date: isCompleting ? today : profile?.last_activity_date,
        longest_streak: profile?.longest_streak || 0
      });
    }

    function handleCheckTaskCompletion(task_id , isCompleted){
      const date = new Date().toISOString();
      const newCompletedState = !isCompleted;
      
      // البحث عن المهمة للحصول على نقاطها
      const task = tasks?.find(t => t.id === task_id);
      const taskPoints = task?.reward_points || 0;
      
      checkTaskCompletion({task_id , isCompleted: newCompletedState , date});
      
      // تحديث النقاط حسب حالة الإكمال
      updateProfileFunc(taskPoints, newCompletedState);
    }

    function addSuggestedTask(task){
      addTask(
        {
          title: task.title,
          reward_points: task.reward,
          description: `مهمة مقترحة: ${task.title}`,
          category: "عبادات",
        },
        {
          onSuccess: () => {
            setShowSuggested(false);
          },
          onError: (err) => {
            console.error("خطأ في إضافة المهمة المقترحة:", err?.message);
          },
        }
      );
    }

    const isAllTasksCompleted = tasks?.every(t => t.done === true);
    
    useEffect(() => {
        if (isAllTasksCompleted && tasks?.length > 0 && !showCongratulations && !congratulationsShown) {
            const timer = setTimeout(() => {
                setShowCongratulations(true);
                setCongratulationsShown(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isAllTasksCompleted, tasks?.length, showCongratulations, congratulationsShown]);

    useEffect(() => {
        if (!isAllTasksCompleted || tasks?.length === 0) {
            setCongratulationsShown(false);
        }
    }, [isAllTasksCompleted, tasks?.length]);

    useEffect(() => {
        if (profile && profile.last_activity_date) {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            
            if (profile.last_activity_date !== today && profile.last_activity_date !== yesterday && profile.streak > 0) {
                updateProfile({
                    streak: 0,
                    level: profile.level,
                    points: profile.points,
                    last_activity_date: profile.last_activity_date,
                    longest_streak: profile.longest_streak || 0
                });
            }
        }
    }, [profile?.last_activity_date, profile?.streak]);



    function handleDeleteTask(task_id){
      if(!task_id){
        return;
      }
      if(tasks?.find(t => t.id === task_id)?.done){
        toast.error("لا يمكن حذف المهمة المكتملة");
        return;
      }
      deleteTask(task_id);
    }

  return (
    <div  className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 min-h-screen">
        <Navbar />
        {/* الهيدر */}
        <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-6xl py-20 px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-gray-200 flex items-center gap-2">
        <FcPlanner className="text-4xl md:text-5xl lg:text-6xl"/>
        المخطط
        </h1>
        <p className="text-xl text-center font-semibold text-emerald-700 dark:text-emerald-300">
          خطتك اليومية لتنظيم الأعمال الصالحة وتتبع الإنجاز — ابدأ رحلتك نحو الاستمرار والبركة ۞
        </p>
        
        {/* زر المساعدة */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowGuide(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-lg">❓</span>
            كيف يعمل المخطط؟
          </button>
        </div>
      </div>
      {/* الكونتينر الرئيسى */}
      <div className="mx-auto max-w-6xl px-8 space-y-6">
        {/* معلومات عن المهام والاستريك ومعلومات اخرى */}
        <div className="header bg-emerald-500/20 dark:bg-gray-800/20 backdrop-blur-md border border-emerald-200/40 dark:border-gray-700/50 shadow-lg rounded-2xl p-6 flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-4">
          <div className="day flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-800 dark:text-emerald-200">مهامي الروحانية</h2>
            <p className="text-sm md:text-lg font-semibold text-gray-700 dark:text-gray-300">{dayName} - {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
               {/* المهام المكتملة */}
            <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 border border-emerald-200/50 dark:border-gray-700/50 rounded-xl px-4 py-2 shadow-sm">
              <span className="text-emerald-600"><IoCheckmarkDoneCircle /></span>
              <div className="flex flex-col">
                <span className="text-sm text-gray-700 dark:text-gray-300">المكتملة</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">{profileLoading ? '...' : isAllTasksCompleted ? "لقد اكتملت جميع المهام" : `${completedCount || 0} من ${tasks?.length || 0}`}</span>
              </div>
              <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${completionPercent}%` }}></div>
              </div>
            </div>
            {/* الاستريك */}
            <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 border border-emerald-200/50 dark:border-gray-700/50 rounded-xl px-4 py-2 shadow-sm">
              <span className="text-emerald-600"><FaFire /></span>
              <span className="text-sm text-gray-700 dark:text-gray-300">الاستريك</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-300">{profileLoading ? '...' : (profile?.streak ?? 0)} أيام</span>
            </div>
            {/* النقاط */}
            <div className="flex items-center gap-2 bg-white/70 dark:bg-gray-800/70 border border-emerald-200/50 dark:border-gray-700/50 rounded-xl px-4 py-2 shadow-sm">
              <span className="text-yellow-500"><FaStar /></span>
              <span className="text-sm text-gray-700 dark:text-gray-300">النقاط</span>
              <span className="font-bold text-yellow-600 dark:text-yellow-400">{profileLoading ? '...' : currentPoints}</span>
            </div>
            {/* المستوى */}
            <div className="flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 border border-emerald-200/50 dark:border-gray-700/50 rounded-xl px-4 py-2 shadow-sm">
              <span className="text-amber-500"><FaCrown /></span>
              <div className="flex flex-col">
                <span className="text-sm text-gray-700 dark:text-gray-300">المستوى</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{profileLoading ? '...' : level}</span>
              </div>
              <div className="w-28 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${levelProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

              {/* الكونتينر المسئول عن عرض المهام واضافة مهام جديدة */}
        <div className="bg-white dark:bg-gray-900/60 border border-emerald-100/60 dark:border-gray-700/60 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-300 mb-5">مهام اليوم</h3>
            <div className="flex flex-col md:flex-row items-center gap-2">
              {/* زر عرض المهام المقترحة */}
              <button
                onClick={() => setShowSuggested(s => !s)}
                className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white/70 dark:bg-gray-800/70 border border-emerald-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800 transition-all"
                aria-expanded={showSuggested}
                aria-controls="suggested-panel"
              >
                <span className="text-emerald-700 dark:text-emerald-300 font-semibold">مهام مُقترحة</span>
                <IoChevronDown className={`transition-transform duration-300 ${showSuggested ? 'rotate-180' : ''} text-emerald-600`} />
              </button>
              <button onClick={() => setShowAddModal(true)} className="text-sm bg-emerald-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-200">أضف مهمة جديدة</button>
            </div>
          </div>
          {/* المهام المقترحة */}
          <div
            id="suggested-panel"
            className={`overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out ${showSuggested ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {suggestedTasks.map(s => {
                const already = tasks?.some(t => t.title === s.title);
                return (
                  <div key={s.id} className="flex items-center justify-between bg-emerald-50/60 dark:bg-gray-800/40 border border-emerald-100/60 dark:border-gray-700/60 rounded-xl px-4 py-3">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{s.title}</p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400">+{s.reward} نقطة</p>
                    </div>
                    <button
                      onClick={() => addSuggestedTask(s)}
                      disabled={already}
                      className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${already ? 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
                    >
                      {already ? 'مضافة' : 'إضافة'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          {/* عرض المهام الخاصة باليوزر من الداتا بيز */}
          <ul className="space-y-3 mt-5">
            {tasks?.map(task => (
              <li key={task.id} className={`flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${task.done ? 'bg-emerald-50/80 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-white/60 border-gray-200 dark:bg-gray-800/40 dark:border-gray-700'}`}>
                <button
                  onClick={() => handleCheckTaskCompletion(task.id, task.done)}
                  className={`flex items-center gap-3 focus:outline-none`}
                  aria-label={task.done ? 'إلغاء إنجاز المهمة' : 'إنجاز المهمة'}
                >
                  <span className={`text-2xl ${task.done ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {task.done ? <IoCheckmarkCircle /> : <IoRadioButtonOff />}
                  </span>
                  <div className="task-info flex flex-col gap-1 text-right">
                  <span className={`font-semibold text-lg ${task.done ? 'text-emerald-700 dark:text-emerald-300 line-through decoration-emerald-400/70' : 'text-gray-800 dark:text-gray-200'}`}>{task.title}</span>
                  <span className="text-md text-gray-600 dark:text-gray-400">{task.description}</span>
                  </div>
                </button>
                <div className='flex items-center gap-2'>
                  <span className={`text-sm font-bold ${task.done ? 'text-emerald-600 dark:text-emerald-400' : 'text-yellow-600 dark:text-yellow-400'}`}>+{task.reward_points} نقطة</span>
                  <button onClick={() => handleDeleteTask(task.id)} className='text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 border border-red-600 dark:border-red-400 rounded-lg px-2 py-1 transition-all duration-200'>حذف</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/*  مودل اضافة مهمة جديدة*/}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !addTaskLoading && setShowAddModal(false)}></div>
          <div className="relative z-10 w-full max-w-lg mx-4">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-emerald-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-3 flex items-center justify-between">
                <h4 className="text-white font-bold">إضافة مهمة جديدة</h4>
                <button
                  onClick={() => !addTaskLoading && setShowAddModal(false)}
                  className="text-white/90 hover:text-white transition"
                  aria-label="إغلاق"
                >
                  <IoClose size={22} />
                </button>
              </div>
              <form onSubmit={handleSubmitNewTask} className="p-5 space-y-4">
                {formError && (
                  <div className="text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2 text-sm">
                    {formError}
                  </div>
                )}
                <div>
                  {/* عنوان المهمة */}
                  <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">عنوان المهمة</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="مثال: صلاة الضحى"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                {/* الكاتجورى */}
                <div className="grid">
                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">التصنيف</label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      <option>عبادات</option>
                      <option>أذكار</option>
                      <option>قرآن</option>
                      <option>صدقة</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                </div>
                {/* وصف المهمة */}
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">الوصف (اختياري)</label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="تفاصيل إضافية تساعدك على الالتزام"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                {/* زر الالغاء وزر الاضافة */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    disabled={addTaskLoading}
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className={`px-5 py-2 rounded-lg text-white font-semibold transition-colors ${addTaskLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                    disabled={addTaskLoading}
                  >
                    {addTaskLoading ? 'جارٍ الإضافة...' : 'إضافة المهمة'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* مودل التهنئة عند إكمال جميع المهام */}
      <TasksCompleted 
        isOpen={showCongratulations}
        onClose={() => setShowCongratulations(false)}
        completedCount={completedCount}
        earnedPoints={todayEarnedPoints}
        currentLevel={level}
        currentStreak={profile?.streak || 0}
      />

      {/* مودل دليل المخطط */}
      <PlannerGuide 
        isOpen={showGuide}
        onClose={() => setShowGuide(false)}
      />

      <Footer />
    </div>
  )
}
