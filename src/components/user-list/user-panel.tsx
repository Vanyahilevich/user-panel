import React, { useEffect, useState } from "react";
import "./style.css";
import { requestUsers, requestUsersWithError, User } from "../../api";
import UserPagination from "./ui/user-pagination/user-pagination";
import UserList from "./ui/user-list/user-list";
import UserSearchPanel from "./ui/user-search-panel/user-search-panel";
import { useDebounce } from "../../hooks/useDebounce";

export const UserPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [nameFilter, setNameFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const debouncedNameFilter = useDebounce(nameFilter, 500);
  const debouncedAgeFilter = useDebounce(ageFilter, 500);
  const fetchUsers = async () => {
    console.log("das");
    setLoading(true);
    setError(null);
    try {
      const offset = (page - 1) * limit;
      const response = await requestUsers({
        name: debouncedNameFilter,
        age: debouncedAgeFilter,
        limit,
        offset,
      });
      if (response.length === 0) {
        setUsers([]);
        setError("Users not found");
      } else {
        setUsers(response);
      }
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [debouncedNameFilter, debouncedAgeFilter, page, limit]);

  const handleNameChange = (value: string) => {
    setNameFilter(value);
  };

  const handleAgeChange = (value: string) => {
    setAgeFilter(value);
  };

  const handleLimitChange = React.useCallback((value: string) => {
    setLimit(Number(value));
  }, []);

  const handlePrevPage = React.useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const handleNextPage = React.useCallback(() => {
    setPage(page + 1);
  }, [page]);

  return (
    <div className="container">
      <UserSearchPanel
        handleNameChange={handleNameChange}
        handleAgeChange={handleAgeChange}
      />
      <UserList users={users} loading={loading} error={error} />
      <UserPagination
        limit={limit}
        page={page}
        handleLimitChange={handleLimitChange}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
      />
    </div>
  );
};
