export const DomainsDropdown = ({ domains, setDomain, domain }: any) => {
  return (
    <>
      <p>Select website domain</p>
      <select
        id="myList"
        onChange={(e) => setDomain(e.target.value)}
        value={domain}
      >
        {domains.map((domain: string) => (
          <option key={domain}>{domain}</option>
        ))}
      </select>
    </>
  );
};
