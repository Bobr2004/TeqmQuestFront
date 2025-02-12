function minutesToHHMMSS(minutes: number): string {
   // Calculate hours, minutes, and seconds
   const hours = Math.floor(minutes / 60);
   const remainingMinutes = Math.floor(minutes % 60);
   const seconds = Math.floor((minutes * 60) % 60);

   // Format into HH:MM:SS
   const pad = (num: number) => String(num).padStart(2, "0");
   return `${pad(hours)}:${pad(remainingMinutes)}:${pad(seconds)}`;
}
export { minutesToHHMMSS };
