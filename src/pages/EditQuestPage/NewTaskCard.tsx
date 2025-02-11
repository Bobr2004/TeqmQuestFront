function NewTaskCard() {
   return (
      <div
         className="border border-dashed border-[var(--accent-10)] cursor-pointer h-[126px]
      rounded-[var(--radius-4)] flex flex-col gap-3 
     justify-center items-center text-[var(--accent-10)] hover:border-[var(--accent-11)] hover:text-[var(--accent-11)]"
      >
         <p className="pi pi-plus  text-5xl"></p>
         <p className="font-bold">Add Task</p>
      </div>
   );
}

export default NewTaskCard