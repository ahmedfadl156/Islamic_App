export async function getAyah(reference){
  const res = await fetch(`https://api.alquran.cloud/v1/ayah/${reference}/editions/ar.alafasy,en.asad`);
  const data = await res.json();
  return data;
}