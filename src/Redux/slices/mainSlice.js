import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        id: 0,
        deleteModalVisible: false,
        tmpTodo: {},
        filter: 'all'
    },
    reducers: {
        addTodo: (state, action) => {
            state.id += 1;
            const newTodo = {
                id: state.id,
                title: action.payload.title,
                description: action.payload.description,
                done: false
            }
            state.todos.push(newTodo);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== state.tmpTodo.id);
        },
        finishTodo: (state, action) => {
            state.todos.map((todo) => {
                if (todo.id === action.payload) {
                    todo.done = true;
                }
                return todo;
            })
        },
        showHideDeleteModal: (state, action) => {
            state.deleteModalVisible = !state.deleteModalVisible
        },
        setTmpTodo: (state, action) => {
            state.tmpTodo = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { 
    addTodo, 
    deleteTodo, 
    finishTodo, 
    showHideDeleteModal, 
    setTmpTodo,
    setFilter,
} = slice.actions;

export default slice;