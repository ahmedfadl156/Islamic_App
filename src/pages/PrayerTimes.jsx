import { useEffect, useState, useCallback } from "react"
import Navbar from "../components/Navbar"
import { getAdhan } from "../services/AlAdhan"
import { IoLocationOutline } from "react-icons/io5";
import { getLocation } from "../services/getLocation";
import { reverseGeocode } from "../services/reverseGeocode";
import { FaClock, FaMosque } from "react-icons/fa";
import Footer from "../components/Footer";

function PrayerTimes() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const [cityInfo, setCityInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPray, setNextPray] = useState(null);
  const [timeUntilNext, setTimeUntilNext] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const convertTo12Hour = (time24) => {
    if (!time24) return '--:--';
    
    const [time, period] = time24.split(' ');
    const [hours, minutes] = time.split(':');
    let hour12 = parseInt(hours);
    let ampm = 'ص'; 
    
    if (hour12 === 0) {
      hour12 = 12;
      ampm = 'ص';
    } else if (hour12 === 12) {
      ampm = 'م';
    } else if (hour12 > 12) {
      hour12 = hour12 - 12;
      ampm = 'م';
    }
    
    return `${hour12}:${minutes} ${ampm}`;
  };

  const timeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [time] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const calculateNextPrayer = useCallback(() => {
    if (!data?.timings) return;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: 'الفجر', nameEn: 'Fajr', time: data.timings.Fajr },
      { name: 'الشروق', nameEn: 'Sunrise', time: data.timings.Sunrise },
      { name: 'الظهر', nameEn: 'Dhuhr', time: data.timings.Dhuhr },
      { name: 'العصر', nameEn: 'Asr', time: data.timings.Asr },
      { name: 'المغرب', nameEn: 'Maghrib', time: data.timings.Maghrib },
      { name: 'العشاء', nameEn: 'Isha', time: data.timings.Isha }
    ];

    // البحث عن الصلاة القادمة
    let nextPrayer = null;
    let minDiff = Infinity;

    prayers.forEach(prayer => {
      const prayerMinutes = timeToMinutes(prayer.time);
      let diff = prayerMinutes - currentMinutes;
      
      if (diff < 0) {
        diff += 24 * 60;
      }
      
      if (diff < minDiff && diff > 0) {
        minDiff = diff;
        nextPrayer = {
          ...prayer,
          minutesUntil: diff
        };
      }
    });

    setNextPray(nextPrayer);
    setTimeUntilNext(nextPrayer?.minutesUntil || 0);
  }, [data]);

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      calculateNextPrayer();
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateNextPrayer]);

  useEffect(() => {
    calculateNextPrayer();
  }, [calculateNextPrayer]);

  // دالة لجلب الموقع
  const handleGetLocation = async () => {
    try {
      setLoading(true);
      const coords = await getLocation();
      setLocation(coords);
      
      // Get city name from coordinates
      const cityData = await reverseGeocode(coords.latitude, coords.longitude);
      setCityInfo(cityData);
    } catch (error) {
      console.error('Error getting location:', error);
      // في حالة فشل الحصول على الموقع، استخدم البيانات الافتراضية
      const {data} = await getAdhan();
      setData(data);
      setLoading(false);
    }
  };

  // جلب مواقيت الصلاة بناءً على المدينة
  useEffect(() => {
    if (cityInfo) {
      async function getPrayerTimes() {
        try {
          const address = `${cityInfo.city},${cityInfo.country}`;
          const res = await fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${encodeURIComponent(address)}&method=5`);
          const {data} = await res.json();
          setData(data);
        } catch (error) {
          console.error('Error fetching prayer times:', error);
        } finally {
          setLoading(false);
        }
      }
      getPrayerTimes();
    }
  }, [cityInfo]);

  useEffect(() => {
    async function fetchDefaultData() {
      try {
        const {data} = await getAdhan();
        setData(data);
      } catch (error) {
        console.error('Error fetching default prayer times:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDefaultData();
  }, [])


  if (loading) {
    return (
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-6xl py-20 px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">مواقيت الصلاة</h1>
          <p className="text-xl font-semibold">جاري تحميل التوقيتات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-6xl py-20 px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">مواقيت الصلاة</h1>
        <p className="text-xl font-semibold">توقيتات دقيقة للصلاة حسب موقعك الحالى</p>
      </div>
      <div className="prayer-times-container bg-white w-full max-w-6xl mx-auto p-8 rounded-lg shadow-lg">
        <div className="header flex justify-between items-center mb-8">
          <div className="right flex flex-col gap-2">
            <h1 className="font-bold text-2xl">{data?.date?.hijri?.weekday?.ar || 'غير متاح'}, {data?.date?.gregorian?.date}</h1>
            <span className="font-semibold text-xl text-gray-600">{data?.meta?.timezone}</span>
          </div>
          <div className="left flex items-center gap-2">
            <button onClick={handleGetLocation} className="bg-[#059669] hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
              حدد موقعك الحالى
              <IoLocationOutline className="text-2xl" />
            </button>
          </div>
        </div>
        
        {/* Prayer Times Grid */}
        <div className="prayer-times-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* الفجر */}
          <div className="prayer-card bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-blue-800 mb-1">الفجر</h3>
                <p className="text-blue-600 text-sm">Fajr</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-900">{convertTo12Hour(data?.timings?.Fajr)}</p>
              </div>
            </div>
          </div>

          {/* الشروق */}
          <div className="prayer-card bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl border border-yellow-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-orange-800 mb-1">الشروق</h3>
                <p className="text-orange-600 text-sm">Sunrise</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-orange-900">{convertTo12Hour(data?.timings?.Sunrise)}</p>
              </div>
            </div>
          </div>

          {/* الظهر */}
          <div className="prayer-card bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-xl border border-emerald-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-emerald-800 mb-1">الظهر</h3>
                <p className="text-emerald-600 text-sm">Dhuhr</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-emerald-900">{convertTo12Hour(data?.timings?.Dhuhr)}</p>
              </div>
            </div>
          </div>

          {/* العصر */}
          <div className="prayer-card bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-amber-800 mb-1">العصر</h3>
                <p className="text-amber-600 text-sm">Asr</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-amber-900">{convertTo12Hour(data?.timings?.Asr)}</p>
              </div>
            </div>
          </div>

          {/* المغرب */}
          <div className="prayer-card bg-gradient-to-br from-rose-50 to-pink-100 p-6 rounded-xl border border-rose-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-rose-800 mb-1">المغرب</h3>
                <p className="text-rose-600 text-sm">Maghrib</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-rose-900">{convertTo12Hour(data?.timings?.Maghrib)}</p>
              </div>
            </div>
          </div>

          {/* العشاء */}
          <div className="prayer-card bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-purple-800 mb-1">العشاء</h3>
                <p className="text-purple-600 text-sm">Isha</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-purple-900">{convertTo12Hour(data?.timings?.Isha)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* معلومات اضافية */}
        <div className="additional-info mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="info-item">
              <h4 className="font-semibold text-gray-700 mb-1">التاريخ الهجري</h4>
              <p className="text-gray-600">{data?.date?.hijri?.date || 'غير متاح'}</p>
            </div>
            <div className="info-item">
              <h4 className="font-semibold text-gray-700 mb-1">الطريقة المستخدمة</h4>
              <p className="text-gray-600">{data?.meta?.method?.name || 'غير متاح'}</p>
            </div>
            <div className="info-item">
              <h4 className="font-semibold text-gray-700 mb-1">المدينة</h4>
              <p className="text-gray-600">
                {cityInfo ? 
                  `${cityInfo.city}, ${cityInfo.country}` : 
                  'القاهرة، مصر'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      {nextPray && (
        <div className="next-prayer-card mt-8 mx-auto max-w-6xl px-4 py-6">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">
                <FaMosque />
              </div>
              <div className="absolute bottom-4 left-4 text-4xl">
                <FaClock />
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-3">
                  <FaClock className="text-yellow-300" />
                  الصلاة القادمة
                </h2>
                <div className="w-24 h-1 bg-yellow-300 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="text-center md:text-right">
                  <h3 className="text-4xl md:text-5xl font-bold mb-2">{nextPray.name}</h3>
                  <p className="text-xl opacity-90">{nextPray.nameEn}</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                    <div className="text-3xl md:text-4xl font-bold mb-2">
                      {Math.floor(timeUntilNext / 60)}:{String(timeUntilNext % 60).padStart(2, '0')}
                    </div>
                    <p className="text-lg opacity-90">دقيقة : ساعة</p>
                    <div className="mt-3 text-sm opacity-80">
                      باقي {timeUntilNext} دقيقة
                    </div>
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <p className="text-sm opacity-80 mb-1">موعد الصلاة القادمة</p>
                    <div className="text-2xl md:text-3xl font-bold">
                      {convertTo12Hour(nextPray.time)}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* شريط التقدم */}
              <div className="mt-8">
                <div className="flex justify-between text-sm opacity-80 mb-2">
                  <span>الوقت الحالي</span>
                  <span>وقت الصلاة</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-yellow-300 to-orange-300 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${Math.max(5, 100 - (timeUntilNext / (6 * 60)) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>
              
              {/* الوقت الحالي */}
              <div className="mt-6 text-center">
                <p className="text-sm opacity-80 mb-1">الوقت الحالي</p>
                <div className="text-xl font-semibold">
                  {currentTime.toLocaleTimeString('ar-EG', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    <Footer />
    </div>
  )
}

export default PrayerTimes
