import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { setFilter, clearAllFilters } from "../../store/userSlice";
import { UserFilters } from "../../types/filtersTypes";
import styles from "./Filters.module.scss";
import Input from "./Input";

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.users.filters as UserFilters);

  const handleFilterChange = (field: keyof UserFilters) => (value: string) => {
    dispatch(setFilter({ field, value }));
  };

  const handleClearFields = () => {
    dispatch(clearAllFilters());
  };

  const isClear = Object.values(filters).some(value => value.length > 0);

  return (
    <div className={styles.filters}>
      <div className={styles.h2_button}>
        <h2>Filter fields</h2>
        {isClear && <button onClick={handleClearFields}>clear</button>}
      </div>
      <div className={styles.fields}>
        <Input placeholder="Name" value={filters.name} onChange={handleFilterChange("name")} />
        <Input placeholder="Username" value={filters.username} onChange={handleFilterChange("username")} />
        <Input placeholder="Email" value={filters.email} onChange={handleFilterChange("email")} />
        <Input placeholder="Phone" value={filters.phone} onChange={handleFilterChange("phone")} />
      </div>
    </div>
  );
};

export default Filters;
