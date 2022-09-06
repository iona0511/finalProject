import "./FilterButton.scss";

const Filterbutton = ({ id, name, setFoodFilter }) => {
    return (
        <div
            className="filterButton"
            onClick={() => {
                setFoodFilter(id);
            }}
        >
            {name}
        </div>
    );
};

export default Filterbutton;
