import { useState, useEffect } from 'react';
import { getReciters } from '../services/getQuran';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function ReciterSelector({ selectedReciter, onReciterChange }) {
  const [reciters, setReciters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchReciters() {
      setIsLoading(true);
      try {
        const recitersData = await getReciters();
        const completeReciters = recitersData.filter(reciter => {
          const hafsMoshaf = reciter.moshaf?.find(m => 
            m.moshaf_type === 11 && m.surah_total === 114
          );
          return hafsMoshaf;
        });
        setReciters(completeReciters);
      } catch (error) {
        console.error('Error fetching reciters:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchReciters();
  }, []);

  const filteredReciters = reciters.filter(reciter =>
    reciter.name.includes(searchTerm)
  );

  const handleReciterSelect = (reciter) => {
    const hafsMoshaf = reciter.moshaf.find(m => m.moshaf_type === 11 && m.surah_total === 114);
    if (hafsMoshaf) {
      onReciterChange({
        id: reciter.id,
        name: reciter.name,
        server: hafsMoshaf.server
      });
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  if (isLoading) {
    return (
      <div className="relative">
        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-not-allowed opacity-50">
          <div className="flex items-center gap-3">
            <AiOutlineLoading3Quarters className="w-5 h-5 text-emerald-500 animate-spin" />
            <span className="text-gray-600">جاري تحميل القراء...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-emerald-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-600 font-bold text-sm">🎵</span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              {selectedReciter ? selectedReciter.name : 'اختر القارئ'}
            </p>
            <p className="text-sm text-gray-500">
              {selectedReciter ? 'حفص عن عاصم' : 'اضغط لاختيار القارئ المفضل'}
            </p>
          </div>
        </div>
        {isOpen ? (
          <IoMdArrowDropup className="w-6 h-6 text-gray-400" />
        ) : (
          <IoMdArrowDropdown className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              placeholder="ابحث عن قارئ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-emerald-400"
              autoFocus
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {filteredReciters.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                لا توجد نتائج للبحث
              </div>
            ) : (
              filteredReciters.map((reciter) => (
                <div
                  key={reciter.id}
                  className={`p-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors ${
                    selectedReciter?.id === reciter.id ? 'bg-emerald-100 border-emerald-200' : ''
                  }`}
                  onClick={() => handleReciterSelect(reciter)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedReciter?.id === reciter.id 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className="font-bold text-sm">
                        {reciter.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{reciter.name}</p>
                      <p className="text-sm text-gray-500">حفص عن عاصم - مرتل</p>
                    </div>
                    {selectedReciter?.id === reciter.id && (
                      <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default ReciterSelector;
