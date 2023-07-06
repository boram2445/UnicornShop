export function convertDate(dateStr?: string) {
  if (!dateStr) return;
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
}
