import { Draggable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import Member from "./Member";
import Moodboard1 from "../../assets/Moodboard-1.png";
import MobileAppDesign from "../../assets/mobile-app.png";
import MenuIcon from "../../assets/menu.svg";
import CommentsIcon from "../../assets/comments.svg";
import FilesIcon from "../../assets/files.svg";
import Moodboard2 from "../../assets/Moodboard-2.png";
import Onboarding from "../../assets/OnboardingCover.png";

const CardItem = ({ todo, index }) => {
  const pictures = { MobileAppDesign, Moodboard1, Moodboard2, Onboarding };

  return (
    <Draggable draggableId={todo.id.toString()} key={todo.id} index={index}>
      {(provided, snapshot) => (
        <div className="rounded-2xl bg-purple-300">
          <div
            className="p-5 rounded-2xl bg-white"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <header className="flex justify-between items-center mb-1">
              <span
                className={`text-xs font-medium capitalize py-1 px-[6px] rounded-[4px] ${todo.status === "completed"
                    ? "bg-[#d1fae2] bg-opacity-20 text-[#68B266]"
                    : todo.priority === "low"
                      ? "bg-[#ffecdb] bg-opacity-20 text-[#D58D49]"
                      : "bg-[#ffd4d8] bg-opacity-20 text-[#D8727D]"
                  }`}
              >
                {todo.status === "completed" ? todo.status : todo.priority}
              </span>
              <img src={MenuIcon} alt="MenuIcon" />
            </header>
            <main className="flex flex-col gap-[6px] mb-7">
              <h3 className="text-lg font-semibold">{todo.title}</h3>
              {todo.description && (
                <p className="text-xs font-normal text-[#787486]">
                  {todo.description}
                </p>
              )}
              {todo?.image.length !== 0 && (
                <div className="flex flex-wrap justify-center md:justify-around items-center">
                  {todo?.image?.map((picture) => (
                    <img
                      src={pictures[picture]}
                      alt={picture}
                      key={picture}
                      className="w-full md:w-auto m-2 md:mb-0 mr-2"
                    />
                  ))}
                </div>
              )}
            </main>
            <footer className="flex justify-between items-center lg:flex-col lg:items-start lg:gap-2 xl:flex-row xl:items-center">
              <Member
                users={todo.users}
                width="24px"
                height="24px"
                offset="4"
                overlap="right"
              />
              <section className="flex flex-col gap-[14px] sm:flex-row sm:items-center">
                <span className="flex gap-[5px] items-center text-xs font-medium text-[#787486]">
                  <img src={CommentsIcon} alt="CommentsIcon" />
                  {todo.comments + " comments"}
                </span>
                <span className="flex gap-[5px] items-center text-xs font-medium text-[#787486]">
                  <img src={FilesIcon} alt="FilesIcon" />
                  {todo.files + " files"}
                </span>
              </section>
            </footer>
            {provided.placeholder}
          </div>
        </div>
      )}
    </Draggable>
  );
};

CardItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.arrayOf(PropTypes.string),
    priority: PropTypes.oneOf(["high", "low", "completed"]).isRequired,
    status: PropTypes.oneOf(["todo", "on progress", "done"]).isRequired,
    comments: PropTypes.number.isRequired,
    files: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardItem;
