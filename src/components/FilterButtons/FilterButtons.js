import { View } from "react-native";
import Button from "../SharedUI/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../Redux/slices/mainSlice";

const FilterButtons = ({ array, activeButton, setActiveButton }) => {
    const dispatch = useDispatch();
    const { filter } = useSelector(state => state.todos);

    return (
        <View style={{ flexDirection: 'row' }}>
            {array.map((item, index) => {
                return (
                    <Button
                        key={index}
                        style={filter === item ? "active" : "disactive"}
                        text={item}
                        method={() => dispatch(setFilter(item))}
                    />
                )
            })}
        </View>
    )
}

export default FilterButtons;