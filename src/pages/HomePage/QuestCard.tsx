import { Card, ScrollArea } from "@radix-ui/themes";
import { Link } from "react-router";
import { routes } from "../../configs/routes";

// {
//    "id": 1,
//    "title": "Python Basics",
//    "description": "Learn the fundamentals of Python programming",
//    "image": "python.jpg",
//    "taskCount": 5,
//    "timeLimit": "00:30:00",
//    "userDTO": {
//        "id": 1,
//        "email": "john.doe@example.com",
//        "username": "john_doe",
//        "image": "john.jpg",
//        "role": "USER",
//        "usersRated": 15,
//        "rating": 4.7
//    },
//    "usersRated": 100,
//    "rating": 4.5
// },

export type QuestCardProps = {
   id: number;
   title: string;
   description: string;
   timeLimit: string;
   userId: number;
   image?: string;
   rating: number;
};

function QuestCard({
   id,
   title,
   description,
   timeLimit,
   rating
}: QuestCardProps) {
   return (
      <article>
         <Card asChild>
            <Link to={routes.toQuest(String(id))} className="w-full">
               <div className="flex justify-between gap-2">
                  <h3 className="font-bold text-xl">{title}</h3>
                  <p>{timeLimit}</p>
               </div>

               <ScrollArea className="!h-[50px]">
                  <p className="text-[var(--gray-11)]">{description}</p>
               </ScrollArea>
               <QuestRating rating={rating} />
            </Link>
         </Card>
      </article>
   );
}

function QuestRating({ rating }: { rating: number }) {
   return (
      <div className="flex gap-1 justify-end items-center">
         <p>{rating || "Not rated"}</p>
         <p className="pi pi-star-fill"></p>
      </div>
   );
}

export default QuestCard;
