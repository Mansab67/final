import { useState, useEffect } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import CardList from "./CardList";
import Header from "../Header";

const Kanban = () => {
  const [allTodos, setAllTodos] = useState([]);
  const [notStartedTodos, setNotStartedTodos] = useState([]);
  const [startedTodos, setStartedTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://creative-backend-7c3k.onrender.com/tasks/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        // Transform _id to id for compatibility
        const transformedData = data.map(todo => ({
          ...todo,
          id: todo._id
        }));
        setAllTodos(transformedData);
        applyFilters(transformedData, priorityFilter, dateFilter);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTaskAdded = (newTask) => {
    setAllTodos(prev => [...prev, { ...newTask, id: newTask._id }]);
    applyFilters([...allTodos, { ...newTask, id: newTask._id }], priorityFilter, dateFilter);
  };

  const applyFilters = (todos, priority, date) => {
    let filteredTodos = [...todos];

    if (priority) {
      if (priority === "completed") {
        filteredTodos = filteredTodos.filter(todo => todo.status === "completed");
      } else {
        filteredTodos = filteredTodos.filter(todo => todo.priority === priority);
      }
    }

    if (date) {
      filteredTodos = filteredTodos.filter(todo => {
        if (todo.createdAt) {
          return new Date(todo.createdAt).toISOString().split('T')[0] === date;
        }
        return false;
      });
    }

    setNotStartedTodos(filteredTodos.filter(todo => todo.status === "not started"));
    setStartedTodos(filteredTodos.filter(todo => todo.status === "in progress"));
    setCompletedTodos(filteredTodos.filter(todo => todo.status === "completed"));
  };

  const handleFilterChange = (priority) => {
    setPriorityFilter(priority);
    applyFilters(allTodos, priority, dateFilter);
  };

  const handleDateChange = (date) => {
    setDateFilter(date);
    applyFilters(allTodos, priorityFilter, date);
  };

  const findTodoById = (id, array) => {
    return array.find((todo) => todo.id === id);
  };

  const removeTodoById = (id, array) => {
    return array.filter((todo) => todo.id !== id);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let updatedNotStartedTodos = [...notStartedTodos];
    let updatedStartedTodos = [...startedTodos];
    let updatedCompletedTodos = [...completedTodos];

    const todo = findTodoById(draggableId, [
      ...notStartedTodos,
      ...startedTodos,
      ...completedTodos,
    ]);

    if (!todo) return;

    const newStatus = 
      destination.droppableId === "1" ? "not started" :
      destination.droppableId === "2" ? "in progress" : "completed";

    try {
      // Update the status in the backend
      const response = await fetch(`https://creative-backend-7c3k.onrender.com/tasks/${draggableId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task status');
      }

      // Update local state if backend update was successful
      if (source.droppableId === "1") {
        updatedNotStartedTodos = removeTodoById(draggableId, updatedNotStartedTodos);
      } else if (source.droppableId === "2") {
        updatedStartedTodos = removeTodoById(draggableId, updatedStartedTodos);
      } else {
        updatedCompletedTodos = removeTodoById(draggableId, updatedCompletedTodos);
      }

      const updatedTodo = { ...todo, status: newStatus };

      if (destination.droppableId === "1") {
        updatedNotStartedTodos.splice(destination.index, 0, updatedTodo);
      } else if (destination.droppableId === "2") {
        updatedStartedTodos.splice(destination.index, 0, updatedTodo);
      } else {
        updatedCompletedTodos.splice(destination.index, 0, updatedTodo);
      }

      setNotStartedTodos(updatedNotStartedTodos);
      setStartedTodos(updatedStartedTodos);
      setCompletedTodos(updatedCompletedTodos);

      const updatedAllTodos = allTodos.map(t => 
        t.id === todo.id ? { ...t, status: newStatus } : t
      );
      setAllTodos(updatedAllTodos);

    } catch (error) {
      console.error('Error updating task status:', error);
      // Revert to original state if update fails
      applyFilters(allTodos, priorityFilter, dateFilter);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      <Header onFilterChange={handleFilterChange} onDateChange={handleDateChange} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mt-10 grid grid-flow-row auto-cols-fr lg:grid-flow-col gap-[15px]">
        <CardList todoList={notStartedTodos} type="not-started" id="1" onTaskAdded={handleTaskAdded} />
          <CardList todoList={startedTodos} type="started" id="2" />
          <CardList todoList={completedTodos} type="completed" id="3" />
        </div>
      </DragDropContext>
    </>
  );
};

export default Kanban;