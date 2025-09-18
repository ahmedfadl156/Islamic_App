export function navigateToAyah(surahNumber, ayahNumber, navigate) {
  navigate(`/quran?surah=${surahNumber}&ayah=${ayahNumber}`);
}

export function scrollToAyah(ayahNumber, highlightDuration = 3000) {
  setTimeout(() => {
    const ayahElement = document.querySelector(`[data-ayah-number="${ayahNumber}"]`);
    
    if (ayahElement) {
      ayahElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
      
      ayahElement.classList.add('highlight-ayah');
      
      setTimeout(() => {
        ayahElement.classList.remove('highlight-ayah');
      }, highlightDuration);
    }
  }, 500);
}

export function navigateAndScrollToAyah(surahNumber, ayahNumber, navigate) {
  navigateToAyah(surahNumber, ayahNumber, navigate);
  
  scrollToAyah(ayahNumber);
}
