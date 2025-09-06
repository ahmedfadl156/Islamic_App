export async function getAdhan(){
  const res = await fetch("https://api.aladhan.com/v1/timingsByAddress?address=Cairo,Egypt&method=5");
  const data = await res.json();
  return data;
}