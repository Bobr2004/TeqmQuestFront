
type RatingSectionProps = {
   id: number;
};


function RatingSection({id}: RatingSectionProps) {
   
   return (
      <section>
         <h2 className="font-bold text-lg">Rating: {id}</h2>
      </section>
   );
}

export default RatingSection;
