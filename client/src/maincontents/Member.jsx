import PropTypes from "prop-types";
import person1 from "../../assets/person1.svg";
import person2 from "../../assets/person2.svg";
import person3 from "../../assets/person3.svg";
import person4 from "../../assets/person4.svg";

const Member = ({ users, width, height, offset, overlap }) => {
  const showUsers = users.length > 4 ? users.slice(0, 4) : users;
  const number = users.length > 4 ? users.length - 4 : 0;

  const usersList = { person1, person2, person3, person4 };
  return (
    <div className="flex">
      {showUsers.map((user, idx) => {
        const styles =
          overlap === "right"
            ? {
                zIndex: 20 - idx,
                marginLeft: offset === "4" ? "-4px" : "-8px",
              }
            : {
                zIndex: 20 + idx,
                marginRight: offset === "4" ? "-4px" : "-8px",
              };
        return (
          <img
            src={usersList[user]}
            alt={user}
            className="border border-white rounded-full"
            width={width}
            height={height}
            style={styles}
            key={user}
          />
        );
      })}
      {number !== 0 && (
        <span
          className="flex justify-center items-center bg-[#F4D7DA] border border-white rounded-full text-red text-[15px] font-medium z-40"
          style={{ width, height }}
        >
          +{number}
        </span>
      )}
    </div>
  );
};

Member.propTypes = {
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  offset: PropTypes.string.isRequired,
  overlap: PropTypes.oneOf(["left", "right"]).isRequired,
};

export default Member;
