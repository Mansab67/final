import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import PropTypes from "prop-types";
import CreateIcon from "../../assets/create.svg";
import CardItem from "./CardItem";
import AddTaskModal from "./AddTaskModal";

const CardList = ({ todoList, type, id, onTaskAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const borderColor =
    type === "not-started"
      ? "border-b-[#5030E5]"
      : type === "started"
      ? "border-b-[#FFA500]"
      : "border-b-[#8BC48A]";

  const dotColor =
    type === "not-started"
      ? "bg-[#5030E5]"
      : type === "started"
      ? "bg-[#FFA500]"
      : "bg-[#76A5EA]";

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskCreated = (newTask) => {
    onTaskAdded(newTask);
  };

  return (
    <div className="relative bg-[#d2e8f7] rounded-2xl p-5 flex flex-col gap-5">
      <header
        className={`flex items-center gap-2 text-base font-medium text-black mb-2 pb-[22px] border-b-[3px] ${borderColor}`}
      >
        <div className={`w-[8px] h-[8px] rounded-full ${dotColor}`}></div>
        <span className="text-base font-medium text-[#0D062D]">
          {type === "not-started"
            ? "To Do"
            : type === "started"
            ? "On Progress"
            : "Done"}
        </span>
        <span className="w-5 h-5 rounded-full bg-[#E0E0E0] flex justify-center items-center text-xs font-medium text-dusky-black mx-1">
          {todoList.length}
        </span>
        {type === "not-started" && (
          <button 
            className="absolute top-[22px] right-[22px] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={CreateIcon} alt="CreateIcon" />
          </button>
        )}
      </header>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="flex flex-col gap-5"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todoList.map((todo, index) => (
              <CardItem
                key={todo.id}
                id={todo.id.toString()}
                todo={todo}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <AddTaskModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTaskAdded={handleTaskCreated}
      />
    </div>
  );
};

CardList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.arrayOf(PropTypes.string),
      priority: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      comments: PropTypes.number.isRequired,
      files: PropTypes.number.isRequired,
      users: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf(["not-started", "started", "done"]).isRequired,
  id: PropTypes.string.isRequired,
  onTaskAdded: PropTypes.func.isRequired,
};

export default CardList;