// Reverse geocoding service to get city name from coordinates
export async function reverseGeocode(latitude, longitude) {
  try {
    // Primary service: BigDataCloud (free, no API key required)
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ar`
    );
    
    if (!response.ok) {
      throw new Error('BigDataCloud geocoding request failed');
    }
    
    const data = await response.json();
    
    if (data) {
      // Extract city and country information
      const city = data.city || data.locality || data.principalSubdivision || 
                   data.countryName || 'مدينة غير معروفة';
      const country = data.countryName || 'دولة غير معروفة';
      
      return {
        city,
        country,
        formatted: `${city}, ${country}`
      };
    }
    
    throw new Error('No results found from BigDataCloud');
  } catch (error) {
    console.error('BigDataCloud geocoding error:', error);
    
    // Fallback to Nominatim
    try {
      const fallbackResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ar`
      );
      
      if (!fallbackResponse.ok) {
        throw new Error('Nominatim geocoding failed');
      }
      
      const fallbackData = await fallbackResponse.json();
      
      if (fallbackData && fallbackData.address) {
        const address = fallbackData.address;
        const city = address.city || address.town || address.village || 
                     address.county || address.state || 'مدينة غير معروفة';
        const country = address.country || 'دولة غير معروفة';
        
        return {
          city,
          country,
          formatted: fallbackData.display_name || `${city}, ${country}`
        };
      }
    } catch (fallbackError) {
      console.error('Nominatim geocoding error:', fallbackError);
    }
    
    // Final fallback
    return {
      city: 'مدينة غير معروفة',
      country: 'دولة غير معروفة',
      formatted: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
    };
  }
}
