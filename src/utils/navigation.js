// Navigation utilities for Islamic App

export function navigateToAyah(surahNumber, ayahNumber, navigate) {
  // Navigate to the Quran page with the specific surah
  navigate(`/quran?surah=${surahNumber}&ayah=${ayahNumber}`);
}

export function scrollToAyah(ayahNumber, highlightDuration = 3000) {
  // Wait a bit for the page to load if navigating
  setTimeout(() => {
    const ayahElement = document.querySelector(`[data-ayah-number="${ayahNumber}"]`);
    
    if (ayahElement) {
      // Smooth scroll to the ayah with some offset for better visibility
      ayahElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
      
      // Add highlight effect
      ayahElement.classList.add('highlight-ayah');
      
      // Remove highlight after animation
      setTimeout(() => {
        ayahElement.classList.remove('highlight-ayah');
      }, highlightDuration);
    }
  }, 500); // Small delay to ensure DOM is ready
}

export function navigateAndScrollToAyah(surahNumber, ayahNumber, navigate) {
  // First navigate to the surah
  navigateToAyah(surahNumber, ayahNumber, navigate);
  
  // Then scroll to the specific ayah
  scrollToAyah(ayahNumber);
}
