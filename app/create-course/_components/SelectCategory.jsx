import { UserInputContext } from "@/app/_context/UserInputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import { useContext } from "react";

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (name) => {
    console.log("handleCategoryChange/", name);
    setUserCourseInput((prev) => ({
      ...prev,
      category: name,
    }));
  };

  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5">Select the course Category</h2>
      <div className="grid grid-cols-3 gap-10">
        {CategoryList.map((item) => (
          <div key={item.id} onClick={() => handleCategoryChange(item.name)}>
            <div
              className={`flex flex-col p-5 border items-center rounded-xl hover:primary hover:bg-blue-200 cursor-pointer ${
                item.name === userCourseInput?.category && "border-primary"
              }`}
            >
              <Image src={item.icon} alt={item.name} width={50} height={50} />
              <h2>{item.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
