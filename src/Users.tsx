import { useEffect, useMemo, useState } from "react";
import { DomainsDropdown } from "./DomainsDropdown";
import { SearchInput } from "./SearchInput";
import { User } from "./User";

export const Users = ({ getUsers }: any) => {
  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState(users);
  const [searchValue, setSearchValue] = useState("");
  const [domains, setDomains] = useState([]);
  const [domain, setDomain] = useState("");

  const loadUsers = useMemo(
    () => async () => {
      try {
        const users = await getUsers();
        setUsers(users);
        const dom = getDomains(users) as [];
        setDomains(dom);
      } catch (e) {
        console.log(e);
      }
    },
    [getUsers]
  );

  const getDomains = (users: any) => {
    const domainsArr = users.map((user: any) => {
      const arr = user.website.split(".");
      return arr[arr.length - 1].toLowerCase();
    });
    const array = Array.from(new Set(domainsArr));

    return ["", ...array];
  };

  const filterByDomain = useMemo(
    () => (selectedDomain: string) => {
      if (!selectedDomain.length) {
        return users;
      }
      return users.filter((user: any) => {
        const websiteArray = user.website.toLowerCase().split(".");
        const domain = websiteArray[websiteArray.length - 1];
        return domain === selectedDomain;
      });
    },
    [users]
  );

  const searchUsers = useMemo(
    () => (searchValue: string) => {
      if (!searchValue) {
        return users;
      }
      return users.filter((user: any) => {
        return (
          user.name.toLowerCase().includes(searchValue.toLowerCase().trim()) ||
          user.email.toLowerCase().includes(searchValue.toLowerCase().trim())
        );
      });
    },
    [users]
  );

  useEffect(() => {
    setVisibleUsers(searchUsers(searchValue));
  }, [searchValue, searchUsers]);

  useEffect(() => {
    setVisibleUsers(filterByDomain(domain));
  }, [domain, filterByDomain]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <>
      <SearchInput value={searchValue} setSearchValue={setSearchValue} />
      <DomainsDropdown
        domains={domains}
        domain={domain}
        setDomain={setDomain}
      />
      <table>
        <thead>
          <tr className="header">
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers.map((user: any) => (
            <User user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </>
  );
};
