
export const getKey = () => {
  const chars = [..."abcdefghijklmnopqrstuvwxyz"];
  const key = [...Array(11)].map(i => chars[Math.random() * chars.length | 0]).join``;
  return key;
}
