function QuestRating({ rating }: { rating: number }) {
   return (
      <div className="flex gap-1 justify-end items-center">
         <p>{rating || "Not rated"}</p>
         <p className="pi pi-star-fill"></p>
      </div>
   );
}

export default QuestRating;
