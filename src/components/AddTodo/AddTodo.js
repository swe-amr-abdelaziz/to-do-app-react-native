import { useState } from "react";
import { Keyboard } from 'react-native';
import { useDispatch } from "react-redux";

import Button from "../SharedUI/Button/Button";
import InputField from "../SharedUI/inputField/InputField";
import { addTodo } from "../../Redux/slices/mainSlice";

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const AddToDo = () => {
        if (title && description) {
            const newTodo = { title, description };
            dispatch(addTodo(newTodo));
            setTitle('');
            setDescription('');
            Keyboard.dismiss();
        }
    };
    
    return (
        <>
            <InputField placeholder={"title"} value={title} setValue={setTitle} />
            <InputField placeholder={"description"} value={description} setValue={setDescription} />
            <Button style="active" text="add" method={AddToDo} />
        </>
    );
}

export default AddTodo;