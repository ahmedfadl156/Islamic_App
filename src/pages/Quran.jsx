import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getQuran, getSurah, getTafsir } from "../services/getQuran";
import Card from "../components/Card";
import ReciterSelector from "../components/ReciterSelector";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { IoStop, IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import { FaBook } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import SkeletonLoader from "../components/SkeletonLoader";
import SurahData from "../components/SurahData";
import TafsirModal from "../components/TafsirModal";
import Footer from "../components/Footer";
import { useStories } from "../services/useStories";
import { scrollToAyah } from "../utils/navigation";

function Quran() {
  const location = useLocation();
  const [quranData, setQuranData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSura, setSelectedSura] = useState(null);
  const [surahData, setSurahData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTafsirModal, setShowTafsirModal] = useState(false);
  const [selectedAyah, setSelectedAyah] = useState(null);
  const [selectedReciter, setSelectedReciter] = useState(null);
  const [isLoadingQuranData, setIsLoadingQuranData] = useState(true);
  const [isLoadingSurah, setIsLoadingSurah] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const [isTafsirModalOpen, setIsTafsirModalOpen] = useState(false);
  const [tafsirData, setTafsirData] = useState(null);
  const [currentAyahNumber, setCurrentAyahNumber] = useState(null);
  const [selectedTafsirId, setSelectedTafsirId] = useState(14);
  const [reciterError, setReciterError] = useState("");

  const cleanupAudio = (audioElement) => {
    if (!audioElement) return;
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.removeAttribute("src");
    audioElement.load();
  };

  function searchSurahs(query) {
    setSearchQuery(query);
    if (!query) {
      setQuranData(originalData);
    } else {
      const filteredSurahs = originalData.filter((sura) => {
        const normalizeArabic = (text) =>
          text.replace(/[\u064B-\u0652]/g, "").trim();
        const normalizedSuraName = normalizeArabic(sura.name);
        const normalizedQuery = normalizeArabic(query);

        return (
          normalizedSuraName.includes(normalizedQuery) ||
          sura.englishName.toLowerCase().includes(query.toLowerCase()) ||
          sura.englishNameTranslation
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          sura.number.toString().includes(query)
        );
      });
      setQuranData(filteredSurahs);
    }
  }

  const playFullSurah = () => {
    if (!selectedSura || !selectedReciter) {
      if (!selectedReciter) {
        setReciterError("يرجى اختيار قارئ أولاً");
        setTimeout(() => {
          setReciterError("");
        }, 5000);
      }
      return;
    }

    if (isPlayingFull && audio) {
      audio.pause();
      setIsPlayingFull(false);
      setIsPlaying(false);
      return;
    }

    if (audio && !isPlayingFull) {
      audio.play();
      setIsPlayingFull(true);
      setIsPlaying(true);
      return;
    }

    setIsLoadingAudio(true);

    const surahNumber = Number(selectedSura.number).toString().padStart(3, "0");
    const audioUrl = `${selectedReciter.server}${surahNumber}.mp3`;

    const newAudio = new Audio(audioUrl);

    newAudio.addEventListener("loadstart", () => {
      setIsLoadingAudio(true);
    });

    newAudio.addEventListener("canplay", () => {
      setIsLoadingAudio(false);
      setIsPlayingFull(true);
      setIsPlaying(true);
    });

    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(newAudio.duration);
    });

    newAudio.addEventListener("timeupdate", () => {
      setCurrentTime(newAudio.currentTime);
    });

    newAudio.addEventListener("ended", () => {
      setIsPlaying(false);
      setIsPlayingFull(false);
      setCurrentTime(0);
    });

    newAudio.addEventListener("error", (e) => {
      if (!newAudio.src) return;
      console.error("Audio error:", e);
      alert("حدث خطأ في تشغيل الصوت. تأكد من اتصال الإنترنت.");
      setIsPlaying(false);
      setIsPlayingFull(false);
      setIsLoadingAudio(false);
    });

    setAudio(newAudio);
    newAudio.play();
  };

  const handleSurahSelection = (sura) => {
    if (audio) {
      cleanupAudio(audio);
      setAudio(null);
    }
    setSelectedSura(sura);
    setIsPlaying(false);
    setIsPlayingFull(false);
    setIsLoadingAudio(false);
    setCurrentTime(0);
    setDuration(0);
    const surahData = document.querySelector('.surah-data');
    if(surahData){
      surahData.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    const url = new URL(window.location);
    url.searchParams.delete('surah');
    url.searchParams.delete('ayah');
    window.history.replaceState({}, '', url.pathname);
    
    setTimeout(() => {
      const surahContentElement = document.querySelector('.right');
      if (surahContentElement) {
        surahContentElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 100);
  };

  const handleReciterChange = (reciter) => {
    if (audio) {
      cleanupAudio(audio);
      setAudio(null);
    }
    setIsPlaying(false);
    setIsPlayingFull(false);
    setIsLoadingAudio(false);
    setCurrentTime(0);
    setDuration(0);
    setSelectedReciter(reciter);
  };

  const togglePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsPlayingFull(false);
    } else {
      audio.play();
      setIsPlaying(true);
      setIsPlayingFull(true);
    }
  };

  const stopAudio = () => {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setAudio(null);
    setIsPlaying(false);
    setIsPlayingFull(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const skipForward = () => {
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
  };

  const skipBackward = () => {
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const handleProgressBarClick = (e) => {
    if (!audio || !duration) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const clickPercentage = clickPosition / progressBarWidth;
    
    audio.currentTime = clickPercentage * duration;
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  async function handleTafsirClick(ayahNumber) {
    setCurrentAyahNumber(ayahNumber);
    setIsTafsirModalOpen(true);
    setTafsirData(null);

    await fetchTafsirData(ayahNumber, selectedTafsirId);
  }

  async function fetchTafsirData(ayahNumber, tafsirId) {
    try {
      const tafsir = await getTafsir(ayahNumber, tafsirId);

      const currentAyah = surahData?.find((ayah) => ayah.number === ayahNumber);

      const formattedTafsir = {
        ayah: currentAyah?.text || "",
        text:
          tafsir?.tafsir?.text ||
          tafsir?.text ||
          "لا يوجد تفسير متاح لهذه الآية حالياً",
        source:
          tafsir?.tafsir?.resource_name ||
          tafsir?.resource_name ||
          "تفسير ابن كثير",
      };

      setTafsirData(formattedTafsir);
    } catch (error) {
      console.error("Error fetching tafsir:", error);
      setTafsirData({
        ayah: surahData?.find((ayah) => ayah.number === ayahNumber)?.text || "",
        text: "حدث خطأ في تحميل التفسير. يرجى المحاولة مرة أخرى.",
        source: "خطأ في التحميل",
      });
    }
  }

  function handleTafsirSourceChange(tafsirId) {
    setSelectedTafsirId(tafsirId);
    if (currentAyahNumber) {
      setTafsirData(null);
      fetchTafsirData(currentAyahNumber, tafsirId);
    }
  }

  function closeTafsirModal() {
    setIsTafsirModalOpen(false);
    setTafsirData(null);
    setCurrentAyahNumber(null);
  }

  useEffect(() => {
    async function fetchSurah() {
      if (selectedSura?.number) {
        setIsLoadingSurah(true);
        setIsPlaying(false);
        setIsPlayingFull(false);
        setIsLoadingAudio(false);

        try {
          const surah = await getSurah(selectedSura?.number);
          setSurahData(surah.data.ayahs);
          setSelectedSura((prev) => ({
            ...prev,
            edition: surah.data.edition,
          }));
        } catch (error) {
          console.error("Error fetching surah:", error);
        } finally {
          setIsLoadingSurah(false);
        }
      }
    }

    fetchSurah();
  }, [selectedSura?.number]);

  useEffect(() => {
    async function fetchQuranData() {
      setIsLoadingQuranData(true);
      try {
        const data = await getQuran();
        setQuranData(data);
        setOriginalData(data);
      } catch (error) {
        console.error("Error fetching Quran data:", error);
      } finally {
        setIsLoadingQuranData(false);
      }
    }
    fetchQuranData();
  }, []);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const surahParam = urlParams.get('surah');
    const ayahParam = urlParams.get('ayah');

    if (surahParam && quranData.length > 0) {
      const surahNumber = parseInt(surahParam);
      const targetSurah = quranData.find(sura => sura.number === surahNumber);
      
      if (targetSurah && (!selectedSura || selectedSura.number !== surahNumber)) {
        if (audio) {
          cleanupAudio(audio);
          setAudio(null);
        }
        setSelectedSura(targetSurah);
        setIsPlaying(false);
        setIsPlayingFull(false);
        setIsLoadingAudio(false);
        setCurrentTime(0);
        setDuration(0);
        
        if (ayahParam) {
          const ayahNumber = parseInt(ayahParam);
          setTimeout(() => {
            scrollToAyah(ayahNumber, 4000); 
          }, 1000);
        }
      }
    }
  }, [location.search, quranData]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-6 mx-auto max-w-6xl py-20 px-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold dark:text-gray-200">
          القرآن الكريم
        </h1>
        <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">
          اقرا و استمع واستمتع بأيات الله
        </p>
      </div>
      <section className="main-section mx-auto flex flex-col lg:flex-row justify-center items-center w-full lg:max-w-6xl gap-4 px-4">
        <div className="left lg:w-[40%] w-full h-full bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg">
          <h1 className="text-2xl font-bold dark:text-gray-200">سور القران كاملة</h1>
          <form>
            <input
              type="text"
              placeholder="ابحث عن سورة"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 rounded-lg w-full px-4 py-2 mt-4 outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              value={searchQuery}
              onChange={(e) => searchSurahs(e.target.value)}
            />
          </form>
          <ul className="mt-4 overflow-scroll h-[80vh] custom-scrollbar">
            {isLoadingQuranData ? (
              <div className="flex flex-col gap-4 p-4">
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className="border-t border-gray-300 p-4 flex justify-between items-center animate-pulse"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-16 rounded-lg mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col text-left gap-1">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                      </div>
                      <div className="bg-gray-200 w-8 h-8 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              quranData.map((sura) => (
                <li
                  onClick={() => handleSurahSelection(sura)}
                  className={`border-t border-gray-300 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
                    selectedSura?.number === sura.number
                      ? "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700"
                      : "bg-white dark:bg-gray-700 dark:border-gray-600"
                  } flex justify-between items-center`}
                  key={sura.number}
                >
                  <div className="flex flex-col gap-2 dark:text-gray-200">
                    {sura.name}
                    <span className="text-gray-500 dark:text-gray-400">
                      {sura.ayahs.length} آيات
                    </span>
                  </div>
                  <div className="flex items-center gap-2 dark:text-gray-200">
                    <div className="flex flex-col text-left">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{sura.englishName}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {sura.englishNameTranslation}
                      </p>
                    </div>
                    <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 w-8 h-8 flex items-center justify-center rounded-full">
                      {sura.number}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="right lg:w-[60%] w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg h-[100vh] overflow-hidden flex flex-col">
          {selectedSura ? (
            <>
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="bg-emerald-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold">
                      {selectedSura.number}
                    </span>
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                        {selectedSura.name}
                      </h1>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {selectedSura.englishName}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {selectedSura.englishNameTranslation}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-500 dark:text-gray-400">
                    <p>{selectedSura.revelationType}</p>
                    <p>{surahData?.length} آيات</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    اختر القارئ:
                  </h3>
                  <ReciterSelector
                    selectedReciter={selectedReciter}
                    onReciterChange={handleReciterChange}
                  />
                  {reciterError && (
                    <p className="text-red-500 mt-4 font-bold text-center">
                      {reciterError}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-center mb-4">
                  <button
                    onClick={playFullSurah}
                    disabled={isLoadingAudio}
                    className={`group flex items-center gap-3 ${
                      isLoadingAudio
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 cursor-not-allowed"
                        : isPlayingFull
                        ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                        : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                    } text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform ${
                      !isLoadingAudio ? "hover:scale-105" : ""
                    } transition-all duration-300`}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        {isLoadingAudio ? (
                          <AiOutlineLoading3Quarters className="w-5 h-5 text-blue-300 animate-spin" />
                        ) : isPlayingFull ? (
                          <IoMdPause className="w-5 text-red-500 group-hover:animate-pulse h-5" />
                        ) : (
                          <IoMdPlay className="w-5 h-5 text-emerald-500 group-hover:animate-pulse" />
                        )}
                      </div>
                      <div
                        className={`absolute -top-1 -right-1 w-3 h-3 ${
                          isLoadingAudio
                            ? "bg-blue-400 animate-pulse"
                            : isPlayingFull
                            ? "bg-red-400 animate-pulse"
                            : "bg-yellow-400 animate-ping"
                        } rounded-full`}
                      ></div>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <span className="font-semibold text-sm md:text-lg">
                        {isLoadingAudio
                          ? "جاري تحميل السورة..."
                          : isPlayingFull
                          ? "إيقاف السورة"
                          : "استمع للسورة كاملة"}
                      </span>
                      <span className="text-sm text-white text-opacity-80">
                        {isLoadingAudio
                          ? "يرجى الانتظار"
                          : selectedReciter
                          ? `بصوت ${selectedReciter.name}`
                          : "اختر قارئ أولاً"}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div
                        className={`w-1 h-4 bg-white bg-opacity-60 rounded-full ${
                          isLoadingAudio
                            ? "animate-pulse"
                            : isPlayingFull
                            ? "animate-bounce"
                            : "animate-pulse"
                        }`}
                      ></div>
                      <div
                        className={`w-1 h-6 bg-white bg-opacity-80 rounded-full ${
                          isLoadingAudio
                            ? "animate-pulse"
                            : isPlayingFull
                            ? "animate-bounce"
                            : "animate-pulse"
                        }`}
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className={`w-1 h-5 bg-white bg-opacity-70 rounded-full ${
                          isLoadingAudio
                            ? "animate-pulse"
                            : isPlayingFull
                            ? "animate-bounce"
                            : "animate-pulse"
                        }`}
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className={`w-1 h-7 bg-white bg-opacity-90 rounded-full ${
                          isLoadingAudio
                            ? "animate-pulse"
                            : isPlayingFull
                            ? "animate-bounce"
                            : "animate-pulse"
                        }`}
                        style={{ animationDelay: "0.3s" }}
                      ></div>
                    </div>
                  </button>

                  {/* عناصر التحكم في الصوت */}
                  {audio && (
                    <div className="mt-4 space-y-3">
                      {/* شريط التقدم */}
                      <div className="flex items-center gap-3 text-white text-sm">
                        <span className="font-mono text-xs opacity-80">{formatTime(currentTime)}</span>
                        <div 
                          className="flex-1 h-2 bg-white bg-opacity-20 rounded-full cursor-pointer overflow-hidden group hover:h-3 transition-all duration-200"
                          onClick={handleProgressBarClick}
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-100 relative group-hover:shadow-lg group-hover:shadow-emerald-500/50"
                            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                        </div>
                        <span className="font-mono text-xs opacity-80">{formatTime(duration)}</span>
                      </div>

                      {/* أزرار التحكم */}
                      <div className="flex items-center justify-center gap-2">
                        {/* زر التقديم للخلف */}
                        <button
                          onClick={skipBackward}
                          className="group relative w-10 h-10 bg-white/10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          title="رجوع 10 ثواني"
                        >
                          <IoPlaySkipBack className="w-5 h-5 text-white group-hover:text-emerald-300 transition-colors" />
                          <span className="absolute -bottom-1 right-1/2 translate-x-1/2 text-[10px] font-bold text-white opacity-70">10</span>
                        </button>

                        {/* زر التشغيل/الإيقاف */}
                        <button
                          onClick={togglePlayPause}
                          className="group relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-emerald-500/50"
                          title={isPlayingFull ? "إيقاف مؤقت" : "تشغيل"}
                        >
                          {isPlayingFull ? (
                            <IoMdPause className="w-7 h-7 text-white" />
                          ) : (
                            <IoMdPlay className="w-7 h-7 text-white mr-1" />
                          )}
                          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </button>

                        {/* زر التقديم للأمام */}
                        <button
                          onClick={skipForward}
                          className="group relative w-10 h-10 bg-white/10 hover:bg-opacity-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          title="تقديم 10 ثواني"
                        >
                          <IoPlaySkipForward className="w-5 h-5 text-white group-hover:text-emerald-300 transition-colors" />
                          <span className="absolute -bottom-1 right-1/2 translate-x-1/2 text-[10px] font-bold text-white opacity-70">10</span>
                        </button>

                        {/* زر الإيقاف التام */}
                        <button
                          onClick={stopAudio}
                          className="group w-10 h-10 bg-white/10 hover:bg-red-500 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                          title="إيقاف"
                        >
                          <IoStop className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                </div>
              </div>

              <div className="surah-data flex-1 overflow-y-auto p-3 lg:p-6 space-y-4 lg:space-y-6 surah-content-scrollbar">
                {isLoadingSurah ? (
                  <SkeletonLoader />
                ) : (
                  <SurahData
                    surahData={surahData}
                    selectedSura={selectedSura}
                    handleTafsirClick={handleTafsirClick}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  اختر سورة للقراءة
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  اضغط على أي سورة من القائمة لعرض آياتها
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <TafsirModal
        isOpen={isTafsirModalOpen}
        onClose={closeTafsirModal}
        tafsirData={tafsirData}
        ayahNumber={currentAyahNumber}
        onTafsirChange={handleTafsirSourceChange}
      />
      <Footer />
    </div>
  );
}

export default Quran;
