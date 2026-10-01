export const todoReducer = (todos, action) => {
    switch (action.type) {
        case "ADD":
            return [...todos, action.payload];
        case "EDIT":
            return todos.map((todo) => {
                return todo.sno === action.payload.sno ?
                    {
                        ...todo,
                        title: action.payload.title,
                        desc: action.payload.desc,
                        schedule: action.payload.schedule,
                        notified: false
                    }
                    : todo
            })

        case "DELETE":
            return todos.filter((todo) => { return todo.sno !== action.payload });

        case "STATUS":
            return todos.map((todo) =>
                todo.sno === action.payload ?
                    { ...todo, completed: !todo.completed }
                    : todo
            )
        case "NOTIFY":
            return todos.map((todo) =>
                todo.sno === action.payload ?
                    {
                        ...todo,
                        notified: true
                    } :
                    todo)

        default:
            return todos;
    }

}