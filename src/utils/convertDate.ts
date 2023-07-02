export function convertDate(dateStr: string) {
  const date = new Date(dateStr);
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
}
