import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { setFilter } from "../../store/userSlice";
import { UserFilters } from "../../types/filtersTypes";
import styles from "./Filters.module.scss";

const Filters: React.FC = () => {
  const [clear, setClear] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.users.filters as UserFilters);

  const handleFilterChange = (field: keyof UserFilters) => (value: string) => {
    dispatch(setFilter({ field, value }));
    setClear(!!value);
  };

  const handleClearFields = () => {
    dispatch(setFilter({ field: "name", value: "" }));
    dispatch(setFilter({ field: "username", value: "" }));
    dispatch(setFilter({ field: "email", value: "" }));
    dispatch(setFilter({ field: "phone", value: "" }));
    setClear(false);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.h2_button}>
        <h2>Filter fields</h2>
        {clear && <button onClick={handleClearFields}>clear</button>}
      </div>
      <div className={styles.fields}>
        <input
          type="text"
          placeholder="Name"
          value={filters.name}
          onChange={e => handleFilterChange("name")(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={filters.username}
          onChange={e => handleFilterChange("username")(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={filters.email}
          onChange={e => handleFilterChange("email")(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={filters.phone}
          onChange={e => handleFilterChange("phone")(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
