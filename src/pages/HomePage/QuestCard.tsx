import { Card } from "@radix-ui/themes";
import { Link } from "react-router";
import { routes } from "../routes";

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

function QuestCard() {
   return (
      <article>
         <Card asChild>
            <Link to={routes.home} className="w-full">
               <h3>MeggaQuest</h3>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Distinctio unde eveniet velit minima, quia, illo praesentium
                  facere soluta tenetur aperiam libero tempore dolores eligendi
                  similique impedit aliquam quis beatae est!
               </p>
               <p>Author: MeggaNigger</p>
            </Link>
         </Card>
      </article>
   );
}

// type submitQuest =
//    {
//         questId: string;
//         task: {
//            taskId: string;
//            openAnswer: string || optionId: string;

//         }[];
//      }

export default QuestCard;
